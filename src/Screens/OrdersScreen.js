import React, { useEffect, useState } from 'react'
import BounceLoader from "react-spinners/BounceLoader";
import OrderSuccess from '../assets/order-success.gif'
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../Redux/Feature/UserSlice';
import { loadorders } from '../Redux/Feature/OrdersSlice'
import { loadCart } from '../Redux/Feature/CartSlice'

function OrdersScreen() {

    const [loading, setLoading] = useState(false)
    const [next, setNext] = useState(false)

    const location = useLocation();

    const userData = useSelector(getUser);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const MESSAGE = (username, item, price, address, paymentType) => {
        return `
        <div style="border:1px solid black;width : 380px;background: #293243;padding: 10px; border-radius: 5px;">
        <div style="text-align: center;">
            <img src="https://wild-pear-cocoon-wig.cyclic.app/Images/logo.png"
                alt="logo" />
        </div>
        <div style="color: #fff;padding: 10px;">
            <p>Hi <b>${username}</b></p>
            <p style="margin-bottom: 50px;">Thank You for Ordering <b>${item}</b>. You Order will deliver Soon.</p>
            <p>Product Name: <b>${item}</b></p>
            <p>Product Price: <b>${price}</b></p>
            <p>Payment Type: <b>${paymentType}</b></p>
            <p>Address: <b>${address}</b></p>
        </div>
        <div style="color: #fff; margin-bottom: 30px;">
            <span>Thanks and Regards</span><br>
            <b>
                Smart Shop
            </b>
        </div>
    </div>
        `
    }

    useEffect(() => {

        if (loading === true) {
            Axios.post('https://wild-pear-cocoon-wig.cyclic.app/ss/post-orders', {
                ProductId: location.state.productId,
                UserId: userData[0]._id,
                Address: location.state.address
            }).then((res) => {
                if (res.data.isSuccess) {
                    Axios.post('https://wild-pear-cocoon-wig.cyclic.app/mail/send-mail-html', {
                        toMail: userData[0].email,
                        toSubject: "Smart Shop - Order Details",
                        toMessage: MESSAGE(userData[0].username, location.state.productName, location.state.productPrice, location.state.address, location.state.paymentType)
                    }).then((res) => {
                        if (res.data.isSuccess) {
                            setLoading(false)
                            setNext(true)
                        }
                    })
                    if (location.state.goBack === 'cart') {
                        Axios.post('https://wild-pear-cocoon-wig.cyclic.app/ss/remove-cart-item', {
                            CartId: location.state.cartId
                        })
                    }

                    setTimeout(() => {
                        Axios.post('https://wild-pear-cocoon-wig.cyclic.app/ss/get-cart-items', {
                            Id: userData[0]._id
                        }).then((cartData) => {
                            dispatch(loadCart(cartData.data.CartItems))
                        })
                        Axios.post('https://wild-pear-cocoon-wig.cyclic.app/ss/get-orders', {
                            Id: userData[0]._id
                        }).then((ordersResult) => {
                            dispatch(loadorders(ordersResult.data.Orders))
                        })
                    }, 3000)

                }
            })
        }

        if (next === false) {
            setLoading(true)
        }

    }, [userData, next, loading, location.state.productName, location.state.productPrice, location.state.address, location.state.paymentType, location.state.goBack, location.state.cartId, location.state.productId, dispatch])

    return (
        <>
            <div className='px-10 py-5'>
                <div className='border shadow-lg w-full h-96 flex justify-center items-center'>
                    <div className='flex flex-col justify-center items-center w-full text-center'>
                        <img
                            src={OrderSuccess}
                            alt='order-success'
                        />
                        <p className='text-2xl font-bold mt-2'>Your Order {location.state.productName} is Successfully Placed...</p>
                        <button
                            className='hover:text-blue-500'
                            onClick={() => navigate('/profile')}
                        >Go Back</button>
                    </div>
                </div>
            </div>

            {/* Loading Screen */}
            <div className={loading ? 'fixed top-0 left-0 w-full h-full bg-[#293243] flex flex-col justify-center items-center' : 'hidden'}>
                <BounceLoader
                    color={"#fff"}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                <p className='text-center text-5xl text-white ml-5 mt-3'>Loading...</p>
            </div>
        </>
    )
}

export default OrdersScreen
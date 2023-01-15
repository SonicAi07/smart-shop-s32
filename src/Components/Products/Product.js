import React from 'react'
import { MdStar } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../../Redux/Feature/UserSlice'
import Axios from 'axios'
import { loadCart } from '../../Redux/Feature/CartSlice'
import { useNavigate } from 'react-router-dom'

function Product(props) {

    const user = useSelector(getUser)

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleCart = () => {
        Axios.post('https://wild-pear-cocoon-wig.cyclic.app/ss/post-cart-item', {
            ProductId: props.productId,
            FKUserId: user[0]._id
        }).then((res) => {
            if (res.data.isSuccess) {
                alert(res.data.message)
                Axios.post('https://wild-pear-cocoon-wig.cyclic.app/ss/get-cart-items', {
                    Id: user[0]._id
                }).then((result) => {
                    dispatch(loadCart(result.data.CartItems))
                })
            }
            else {
                alert(res.data.message)
            }
        })
    }

    return (
        <div className='border-2 shadow-md rounded-md w-64 mt-3'>
            <div className='relative'>
                <img
                    src={props.productImage}
                    alt={props.productName}
                    className='w-64 rounded-t-md'
                />
                <div className='absolute bottom-2 left-2 flex items-center bg-black px-2 py-1 rounded-md bg-opacity-70 text-white'>
                    <MdStar color='#03A685' />
                    <span className='mr-1'> {props.productRating} </span>
                    <span> | {props.productReview}</span>
                </div>
            </div>
            <div className='py-4 px-1'>
                <p className='truncate'>{props.productName}</p>
                <p>Rs. <span className='font-bold'>{props.productPrice}</span>/-</p>
                {
                    user === null ?
                        <></>
                        :
                        <div className='mt-5 mx-3'>
                            <button
                                className='border rounded-md p-2 bg-[#293243] text-white mr-3 hover:scale-105'
                                onClick={handleCart}
                            >Add to Cart</button>
                            <button
                                className='border rounded-md p-2 bg-[#293243] text-white hover:scale-105'
                                onClick={() => navigate('/payment', {
                                    state: {
                                        goBack: "",
                                        productName: props.productName,
                                        productPrice: props.productPrice,
                                        productId: props.productId,
                                        cartId: "null"
                                    }
                                })}
                            >Buy Now</button>
                        </div>
                }

            </div>
        </div>
    )
}

export default Product
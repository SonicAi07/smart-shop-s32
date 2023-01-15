import React, { useEffect, useState } from 'react'
import CartProduct from '../Components/CartProduct/CartProduct'
import { useSelector } from 'react-redux'
import { getCart } from '../Redux/Feature/CartSlice'
import Empty from '../assets/Empty-Data.jpg'

function CartScreen() {

    const cartItems = useSelector(getCart)

    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {

        if (cartItems !== null) {
            let value = 0;
            cartItems.cart.forEach((item) => {
                value = value + Number.parseInt(item.products[0].productPrice)
            })

            setTotalPrice(value)
        }
        else {
            setTotalPrice(0)
        }

    }, [cartItems])

    return (
        <div className='my-6 laptop:mx-10'>
            <div className='border-2 w-full laptop:px-4 px-1 py-6 flex laptop:flex-row flex-col items-start'>
                <div className='border-2 flex-1 mr-10 py-6 px-2 w-full'>
                    <div className='flex flex-row justify-between items-center px-5 border-b-2 pb-2'>
                        <span className='text-3xl font-bold'>Cart</span>
                        {
                            cartItems !== null ?
                                <span>Total Items : <span className='font-bold'>{cartItems.cart?.length}</span></span>
                                :
                                <span>Total Items : <span className='font-bold'>0</span></span>
                        }
                    </div>
                    <div className='laptop:py-4 laptop:px-10 px-12 laptop:block flex flex-col justify-center items-start'>
                        {
                            cartItems !== null ?
                                <>
                                    {
                                        cartItems.cart.length !== 0 ?
                                            <>
                                                {
                                                    cartItems.cart.map((item, index) => {
                                                        return <CartProduct
                                                            key={index}
                                                            cartId={item._id}
                                                            productId={item.products[0]._id}
                                                            productName={item.products[0].productName}
                                                            productImage={item.products[0].productImage}
                                                            productRating={item.products[0].productRating}
                                                            productPrice={item.products[0].productPrice}
                                                            productReview={item.products[0].productReview}
                                                        />
                                                    })
                                                }
                                            </>
                                            :
                                            <div className='flex flex-col justify-center items-center'>
                                                <img
                                                    alt='Empty-Data'
                                                    src={Empty}
                                                    className={"w-56"}
                                                />
                                                <h2 className='text-center text-3xl'>No Data Found..!</h2>
                                            </div>
                                    }
                                </>
                                :
                                <div className='flex flex-col justify-center items-center'>
                                    <img
                                        alt='Empty-Data'
                                        src={Empty}
                                        className={"w-56"}
                                    />
                                    <h2 className='text-center text-3xl'>No Data Found..!</h2>
                                </div>
                        }

                    </div>
                </div>
                <div className='w-full laptop:w-96 border py-5 px-3 shadow-lg'>
                    <p className='text-center text-2xl font-bold'>Total Billing</p>
                    <div>
                        {/* header */}
                        <div className='border-b-2 flex flex-row justify-between items-center p-2'>
                            <span className='font-bold flex-1'>Product Names</span>
                            <span className='w-24 text-center font-bold'>Price</span>
                        </div>
                        {/* body */}
                        {
                            cartItems !== null ?
                                <>
                                    {
                                        cartItems.cart.map((item, index) => {
                                            return (
                                                <div className='flex flex-row justify-between items-center p-2'
                                                    key={index}
                                                >
                                                    <span className='flex-1 truncate'>{item.products[0].productName}</span>
                                                    <span className='w-24 text-center'>{item.products[0].productPrice}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </>
                                :
                                <></>
                        }
                        {/* result */}
                        <div className='border-b-2 border-t-2 flex flex-row justify-between items-center p-2 font-bold'>
                            <span className='flex-1'>Total Price</span>
                            <span className='w-24'>Rs.{totalPrice} /-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartScreen
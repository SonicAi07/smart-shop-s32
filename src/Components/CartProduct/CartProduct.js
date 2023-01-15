import React from 'react'
import { MdClose, MdStar } from 'react-icons/md'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { filterCart } from '../../Redux/Feature/CartSlice'
import { useNavigate } from 'react-router-dom'

function CartProduct(props) {

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const handleRemove = () => {

        Axios.post('https://wild-pear-cocoon-wig.cyclic.app/ss/remove-cart-item', {
            CartId: props.cartId
        }).then((res) => {
            if (res.data.isSuccess) {
                dispatch(filterCart(props.cartId))
                alert(res.data.message)
            }
        })

    }

    return (
        <div className='laptop:flex border shadow-md rounded-md mt-5 relative laptop:w-full w-64'>
            <div className='laptop:mr-5'>
                <img
                    src={props.productImage}
                    alt="product"
                    className='w-full laptop:w-36 laptop:rounded-l-md rounded-t-md'
                />
            </div>
            <div className='space-y-2'>
                <p className='mt-4 text-lg font-bold'>{props.productName}</p>
                <p>Rs. {props.productPrice} /-</p>
                <div className='flex flex-row items-center space-x-1'>
                    <MdStar />
                    <span>{props.productRating} </span>
                    <span> ⁌ {props.productReview}</span>
                </div>
                <div className='space-x-5 py-6'>
                    <button
                        className='border ml-3 px-4 py-2 rounded-md bg-[#293243] text-white'
                        onClick={handleRemove}
                    >Remove</button>
                    <button
                        className='border px-4 py-2 rounded-md bg-[#293243] text-white'
                        onClick={() => navigate('/payment', {
                            state: {
                                goBack: "cart",
                                productName: props.productName,
                                productPrice: props.productPrice,
                                productId: props.productId,
                                cartId: props.cartId
                            }
                        })}
                    >Buy Now</button>
                </div>
                <MdClose
                    fontSize={"40px"}
                    className='absolute top-0 right-2 hover:scale-125 rounded-full p-1 cursor-pointer laptop:block hidden'
                    onClick={handleRemove}
                />
            </div>
        </div>
    )
}

export default CartProduct
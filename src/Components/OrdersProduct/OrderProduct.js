import React from 'react'
import { MdStar } from 'react-icons/md'

function OrderProduct(props) {
    return (
        <div className='border shadow-md laptop:flex flex-row space-x-5 rounded-lg mt-5 w-64 laptop:w-full'>
            <div className='laptop:w-40'>
                <img
                    src={props.productImage}
                    alt="product"
                    className='laptop:rounded-l-md rounded-t-md'
                />
            </div>
            <div className='space-y-3 py-3'>
                <p className='text-lg font-bold mt-3'>{props.productName}</p>
                <p className='font-bold'>Rs. {props.productPrice}/-</p>
                <div className='flex flex-row space-x-2 items-center'>
                    <MdStar />
                    <span>{props.productRating} </span>
                    <span> | {props.productReview}</span>
                </div>
                <p className='text-green-600'>Order Scucessfull | {props.orderDate}</p>
            </div>
        </div>
    )
}

export default OrderProduct
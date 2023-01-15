import React, { useState } from 'react'
import Axios from 'axios'

function ProductsScreen() {

    const [prdName, setPrdName] = useState('')
    const [prdImage, setPrdImage] = useState('')
    const [prdType, setPrdType] = useState('')
    const [rating, setRating] = useState('')
    const [review, setReview] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    const handleImage = (e) => {

        const rd = new FileReader()
        let img = ''
        rd.addEventListener('load', (e) => {
            img = e.target.result
            setPrdImage(img)
        })

        rd.readAsDataURL(e.target.files[0])

    }

    const handleSubmit = async () => {

        let result = await Axios.post('https://wild-pear-cocoon-wig.cyclic.app//ss/post-product', {
            ProductName: prdName,
            ProductImage: prdImage,
            ProductType: prdType,
            ProductRating: rating,
            ProductReview: review,
            ProductPrice: price,
            ProductDescription: description === '' ? `Added ${prdName}` : description
        })

        if (result.data.isSuccess) {
            alert(result.data.message)
            handleClear()
        }

    }

    const handleClear = () => {

        setPrdName('')
        setPrdImage('')
        setPrdType('')
        setRating('')
        setReview('')
        setPrice('')
        setDescription('')
    }

    return (
        <div className='my-6 laptop:mx-10'>
            <div className='border-2 w-full px-4 py-6 '>

                {/* Products Header */}
                <div className='border-b-2 py-2'>
                    <span className='font-bold text-4xl'>Products</span>
                </div>

                {/* Product Details */}
                <div className='laptop:mt-5 px-4 py-2'>

                    {/* Product Name */}
                    <div className='laptop:flex laptop:flex-row'>
                        <div className='flex-1'>
                            <div className='mt-8'>
                                <span className='mr-5 font-bold'>Product Name</span>
                                <input
                                    type={'text'}
                                    placeholder="Enter Product Name"
                                    className='border-2 shadow-md rounded-md w-full laptop:w-1/2 h-10 px-2 focus:border-1 focus:outline-none'
                                    value={prdName}
                                    onChange={(e) => setPrdName(e.target.value)}
                                />
                            </div>

                            {/* product Image */}
                            <div className='mt-8'>
                                <span className='mr-5 font-bold'>Product Image</span>
                                <input
                                    type={'file'}
                                    className='laptop:w-1/2 w-full border p-2 shadow-md rounded-md'
                                    onChange={handleImage}
                                    accept='image/*'
                                />
                            </div>
                        </div>

                        <div className='mr-10 laptop:block hidden'>
                            {
                                prdImage === '' ?
                                    <div className='w-56 border h-44 flex justify-center items-center shadow-md rounded-md'>
                                        <span>No Image Found</span>
                                    </div>
                                    :
                                    <img
                                        src={prdImage}
                                        alt="product"
                                        className='w-56 shadow-md rounded-md'
                                    />

                            }
                        </div>
                    </div>

                    {/* product Type, review and rating */}
                    <div className='laptop:flex flex-row mt-8'>
                        <div className='w-full laptop:w-1/2'>
                            <span className='mr-5 font-bold'>Product Type</span>
                            <select
                                className='border-2 shadow-md rounded-md w-full laptop:w-1/2 h-10 px-2 focus:border-1 focus:outline-none'
                                value={prdType}
                                onChange={(e) => setPrdType(e.target.value)}
                            >
                                <option value={''}>Choose...</option>
                                <option value={"Shoes"}>Shoes</option>
                                <option value={"Sweatshirt"}>Sweatshirt</option>
                                <option value={"Kurtis for Women"}>Kurtis for Women</option>
                            </select>
                        </div>
                        <div className='w-full mt-4 laptop:w-1/2'>
                            <span className='mr-5 font-bold'>Product Rating</span>
                            <input
                                type={'text'}
                                placeholder="Enter Product Ratings"
                                className='border-2 shadow-md rounded-md w-full laptop:w-1/2 h-10 px-2 focus:border-1 focus:outline-none'
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                            />
                        </div>
                        <div className='w-full mt-4 laptop:w-1/2'>
                            <span className='mr-5 font-bold'>Product Reviews</span>
                            <input
                                type={'text'}
                                placeholder="Enter Product Reviews"
                                className='border-2 shadow-md rounded-md w-full laptop:w-1/2 h-10 px-2 focus:border-1 focus:outline-none'
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* product price */}
                    <div className='mt-8'>
                        <span className='mr-5 font-bold'>Product Price</span>
                        <input
                            type={'text'}
                            placeholder="Enter Product Price"
                            className='border-2 shadow-md rounded-md w-full laptop:w-1/2 h-10 px-2 focus:border-1 focus:outline-none'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    {/* description */}
                    <div className='mt-8 laptop:flex flex-row items-start hidden'>
                        <span className='mr-5 font-bold'>Description</span>
                        <textarea
                            className='border-2 shadow-md rounded-md focus:border-1 focus:outline-none px-1 py-2'
                            cols={80}
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* button */}
                    <div className='mt-10 pb-7'>
                        <button
                            className='bg-[#293243] text-white float-right w-44 h-12 rounded-md hover:bg-[#2b8ef0] hover:scale-105'
                            onClick={handleSubmit}
                        >Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsScreen
import React from 'react'
import Product from './Product'

function ProductsTemplate(props) {
    return (
        <div className='mt-5'>
            <div className='border-b-2 pb-3'>
                <span className='laptop:text-2xl text-xl font-bold'>{props.productType}</span>
            </div>

            <div className='laptop:my-6 laptop:mx-3 flex flex-row justify-evenly items-start flex-wrap'>
                {
                    props.products.map((prd, index) => {
                        return <Product
                            key={index}
                            productId={prd._id}
                            productName={prd.productName}
                            productImage={prd.productImage}
                            productType={prd.productType}
                            productPrice={prd.productPrice}
                            productRating={prd.productRating}
                            productReview={prd.productReview}
                        />
                    })
                }
            </div>

        </div>
    )
}

export default ProductsTemplate
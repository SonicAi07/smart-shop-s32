import React, { useLayoutEffect, useState } from 'react'
import ProductsTemplate from '../Components/Products/ProductsTemplate'
import Axios from 'axios'
import LOGO from '../assets/logo-2.png'


function HomeScreen() {

    const [products, setProducts] = useState([])

    const [loading, setLoading] = useState(false)

    useLayoutEffect(() => {
        setLoading(true)
        Axios.get('https://wild-pear-cocoon-wig.cyclic.app//ss/get-products').then((res) => {
            if (res.data.isSuccess) {
                setProducts(res.data.Products)
                setLoading(false)
            }
        })

    }, [])

    return (
        <>
            <div className='my-6 laptop:mx-10 sm:mx-2'>
                <div className='border-2 w-full px-4 py-6'>

                    <div className='laptop:mb-10 laptop:block hidden'>
                        <img
                            src={"https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/9be788ff-39a4-4214-99d0-fc97505aae5a1658752545685-USPA_Desk_Banner.jpg"}
                            alt="banner"
                        />
                    </div>
                    {/* product Display Model */}

                    <ProductsTemplate
                        productType={"Weekly Sales | Kurtis For Women"}
                        products={products.filter(item => item.productType === 'Kurtis for Women')}
                    />
                    <ProductsTemplate
                        productType={"Special Offer"}
                        products={products.filter(item => item.productType === 'Shoes')}
                    />
                    <ProductsTemplate
                        productType={"Mens Sweatshirts | 40% Off"}
                        products={products.filter(item => item.productType === 'Sweatshirt')}
                    />

                </div>
            </div>

            <div className={loading ? 'w-full h-full bg-[#293243] fixed top-0 left-0 z-30 flex flex-col justify-center items-center' : 'hidden'}>
                <img
                    src={LOGO}
                    alt="Logo_smart_shop"
                    className='w-96 shadow-xl rounded-lg'
                />
                <p className='text-white text-3xl mt-4'>Loading...</p>
            </div>
        </>
    )
}

export default HomeScreen
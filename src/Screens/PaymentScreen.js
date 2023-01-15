import React, { useState } from 'react'
import { MdArrowBack } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'

function PaymentScreen() {

    const [hno, setHno] = useState('')
    const [street, setStreet] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [paymentType, setPaymentType] = useState('')

    const location = useLocation()

    const navigate = useNavigate()

    const handleSubmit = () => {

        if (hno !== '' || street !== '' || state !== '' || country !== '' || paymentType !== '') {
            let address =
                `
H.No: ${hno},
Street: ${street},
State: ${state},
Country: ${country}
            `

            navigate('/orders', {
                state: {
                    productId: location.state.productId,
                    productName: location.state.productName,
                    productPrice: location.state.productPrice,
                    address: address,
                    paymentType: paymentType,
                    goBack: location.state.goBack,
                    cartId: location.state.cartId
                }
            })
            handleClear()
        }
        else {
            alert("Please Provide the Details...!")
        }
    }

    const handleClear = () => {
        setHno('')
        setStreet('')
        setState('')
        setCountry('')
        setPaymentType('')
    }

    return (
        <div className='laptop:px-24 laptop:py-10'>
            <div className='border shadow-md px-5 py-8'>
                {/* header */}
                <div className='border shadow-md mb-3 px-5 py-3'>
                    <span className='text-2xl font-bold'>Payment</span>
                </div>
                <div className='border shadow-md px-10 py-3 flex items-center justify-between' onClick={() => navigate(`/${location.state.goBack}`)}>
                    {/* back */}
                    <div className='items-center hover:bg-[#293243] hover:text-white px-2 py-1 cursor-pointer hover:rounded-md laptop:flex hidden'>
                        <MdArrowBack
                            fontSize={"30px"}
                        />
                        <span>Go Back</span>
                    </div>

                    {/* product name */}
                    <div className='font-bold'>
                        <p>{location.state.productName}</p>
                    </div>
                </div>

                {/* payment */}
                <div className='laptop:flex justify-evenly mt-5'>
                    {/* address */}
                    <div className='border shadow-md px-5 py-3 laptop:w-1/2'>

                        {/* Address */}
                        <div className='py-2 border-b-2'>
                            <span className='text-2xl font-bold'>Address</span>
                        </div>

                        {/* H.No */}
                        <div className='mt-5 '>
                            <input
                                type={'text'}
                                placeholder="Enter H.NO"
                                className='w-full border shadow-md h-10 pl-2 focus:border focus:outline-none'
                                value={hno}
                                onChange={e => setHno(e.target.value)}
                            />
                        </div>

                        {/* Street */}
                        <div className='mt-5'>
                            <input
                                type={'text'}
                                placeholder="Enter Street"
                                className='w-full border shadow-md h-10 pl-2 focus:border focus:outline-none'
                                value={street}
                                onChange={e => setStreet(e.target.value)}
                            />
                        </div>

                        {/* State */}
                        <div className='mt-5'>
                            <input
                                type={'text'}
                                placeholder="Enter State"
                                className='w-full border shadow-md h-10 pl-2 focus:border focus:outline-none'
                                value={state}
                                onChange={e => setState(e.target.value)}
                            />
                        </div>

                        {/* Country */}
                        <div className='mt-5 mb-5'>
                            <input
                                type={'text'}
                                placeholder="Enter Country"
                                className='w-full border shadow-md h-10 pl-2 focus:border focus:outline-none'
                                value={country}
                                onChange={e => setCountry(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* payment method */}
                    <div className='laptop:w-1/3'>
                        <div className='border shadow-md'>
                            <div className='px-5 py-2 border-b-2'>
                                <span className='text-xl font-bold'>Select Payment</span>
                            </div>
                            <div className='px-5 py-2 flex items-center'>
                                <input
                                    type={'radio'}
                                    name="paymentMethod"
                                    className='cursor-pointer'
                                    id='upi'
                                    value={paymentType}
                                    onChange={() => setPaymentType('UPI')}
                                />
                                <label className='ml-2' htmlFor='upi'>UPI Payment</label>
                            </div>
                            <div className='px-5 py-2 flex items-center'>
                                <input
                                    type={'radio'}
                                    name="paymentMethod"
                                    className='cursor-pointer'
                                    id='cdCard'
                                    value={paymentType}
                                    onChange={() => setPaymentType('Debit Card')}
                                />
                                <label className='ml-2' htmlFor='cdCard'>Credit / Debit Card</label>
                            </div>
                            <div className='px-5 py-2 flex items-center'>
                                <input
                                    type={'radio'}
                                    name="paymentMethod"
                                    className='cursor-pointer'
                                    id='cod'
                                    value={paymentType}
                                    onChange={() => setPaymentType('Cash On Delivery')}
                                />
                                <label className='ml-2' htmlFor='cod'>Cash on Delivery</label>
                            </div>
                        </div>
                        <div className='laptop:float-right laptop:p-10 p-5'>
                            <button
                                className='border px-4 py-2 rounded-md bg-[#293243] text-white hover:scale-110'
                                onClick={handleSubmit}
                            >Order</button>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentScreen
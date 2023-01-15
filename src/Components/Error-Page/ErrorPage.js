import React from 'react'
import Error from '../../assets/error.png'

function ErrorPage() {
    return (
        <div className='flex justify-center items-start'>
            <div className='border-2 rounded-md w-96 px-10 py-8 mt-5'>
                <img
                    src={Error}
                    alt='error-404'
                />
                <p className='text-center text-2xl font-bold'>Page Not Found</p>
                <p className='text-center'><a href='/' className='text-[#293243] hover:underline'>Go Home</a></p>
            </div>
        </div>
    )
}

export default ErrorPage
import React, { useEffect, useState } from 'react'
import Login from '../Components/Login/Login'
import Register from '../Components/Register/Register'
import LoginImage from '../assets/login.png'
import { useSelector } from 'react-redux'
import { getUser } from '../Redux/Feature/UserSlice'
import { useNavigate } from 'react-router-dom'

function LoginScreen() {

    const userData = useSelector(getUser)
    const navigate = useNavigate()

    const [isAlert, setIsAlert] = useState(false)

    useEffect(() => {
        if (userData !== null) {
            navigate('/')
        }
        setIsAlert(true)
    }, [navigate, userData])

    return (
        <>
            <div
                className='flex laptop:flex-row 
        laptop:justify-evenly laptop:items-start pt-10
        sm:flex-col-reverse sm:items-center sm:justify-start pb-3
        relative
        '
            >
                <Login />
                <img
                    src={LoginImage}
                    alt="LoginImage"
                    className='w-1/3 hidden laptop:block'
                />
                <Register
                />

            </div>

            <div className={isAlert ? 'fixed left-2 rounded-lg shadow-lg bottom-8 bg-white transition' : "hidden transition"}>
                <div className='border w-96 px-4 py-5'>
                    <p>Please Provide the Valid Email Address</p>
                    <p><b>One Time Password</b> is needed during Registration..!</p>
                    <button className='border px-3 py-1 mt-3' onClick={() => setIsAlert(false)}>Close</button>
                </div>
            </div>
        </>
    )
}

export default LoginScreen
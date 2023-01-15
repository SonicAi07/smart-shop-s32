import React, { useEffect } from 'react'
import Login from '../Components/Login/Login'
import Register from '../Components/Register/Register'
import LoginImage from '../assets/login.png'
import { useSelector } from 'react-redux'
import { getUser } from '../Redux/Feature/UserSlice'
import { useNavigate } from 'react-router-dom'

function LoginScreen() {

    const userData = useSelector(getUser)
    const navigate = useNavigate()

    useEffect(() => {
        if (userData !== null) {
            navigate('/')
        }
    }, [navigate, userData])

    return (
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
    )
}

export default LoginScreen
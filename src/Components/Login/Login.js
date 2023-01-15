import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login, setRole } from '../../Redux/Feature/UserSlice'
import { loadCart } from '../../Redux/Feature/CartSlice'
import { loadorders } from '../../Redux/Feature/OrdersSlice'

function Login() {

    const [username, setUsername] = useState('')

    const [password, setPassword] = useState('')

    const [checkConfirmPassword, setCheckConfirmPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleCheckConfirmPwd = (e) => {

        if (password === e.target.value) {
            setCheckConfirmPassword(false)
        }
        else {
            setCheckConfirmPassword(true)
        }

        if (e.target.value === '') {
            setCheckConfirmPassword(false)
        }

        setConfirmPassword(e.target.value)

    }

    const handleLogIn = async () => {

        if (username === '' || password === '' || confirmPassword === '') {
            alert("Please provide the Details..!")
        }
        else {

            if (checkConfirmPassword === true) {
                alert("Please Enter the correct details..!")
            }
            else {
                let result = await Axios.post('https://wild-pear-cocoon-wig.cyclic.app//ss/login', {
                    Username: username,
                    Password: password
                })

                if (result.data.isSuccess) {
                    alert(result.data.message)
                    Axios.post('https://wild-pear-cocoon-wig.cyclic.app//ss/get-cart-items', {
                        Id: result.data.UserData[0]._id
                    }).then((result2) => {
                        dispatch(loadCart(result2.data.CartItems))
                    })
                    Axios.post('https://wild-pear-cocoon-wig.cyclic.app//ss/get-orders', {
                        Id: result.data.UserData[0]._id
                    }).then((result2) => {
                        dispatch(loadorders(result2.data.Orders))
                    })
                    dispatch(login(result.data.UserData))
                    dispatch(setRole(result.data.role))
                    handleClear()
                    navigate('/')
                }
                else {
                    alert(result.data.message)
                }

            }

        }

    }

    const handleClear = () => {
        setUsername('')
        setPassword('')
        setConfirmPassword('')
    }

    return (
        <div className='border border-gray-300 px-3 sm:w-96 py-8 rounded-lg shadow-md mt-5'>
            <span className='text-3xl font-bold mx-2'>Login</span>
            <p className='w-full h-0.5 bg-gray-200 mt-2'></p>
            <div className='mx-5 my-5'>
                {/* Login details */}
                <div className='mt-4'>
                    <input
                        type={'text'}
                        placeholder='Enter Username'
                        name='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='border w-full pl-2 h-10 rounded-sm focus:outline-[#293243] select-none'
                    />
                </div>

                <div className='mt-4 relative'>
                    <input
                        type={'password'}
                        placeholder='Enter Password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border w-full pl-2 h-10 rounded-sm focus:outline-[#293243] select-none'
                    />
                </div>

                <div className='mt-4'>
                    <input
                        type={'password'}
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleCheckConfirmPwd}
                        className='border w-full pl-2 h-10 rounded-sm focus:outline-[#293243] select-none'
                    />
                    <span className={checkConfirmPassword ? 'text-xs text-red-500 px-3' : "hidden"}>Password is not matched!!</span>
                </div>
                <div className='pt-3 text-sm px-5 hover:text-blue-600 cursor-pointer'>
                    <span onClick={() => navigate('/secure_password')}>Forgot Password..?</span>
                </div>

                <div className='mt-5 float-right'>
                    <button
                        className='bg-[#293243] text-white w-24 mt-5 h-10 rounded-md'
                        onClick={handleLogIn}
                    >Login</button>
                </div>

            </div>
        </div>
    )
}

export default Login


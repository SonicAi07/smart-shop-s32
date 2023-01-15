import React, { useEffect, useState } from 'react'
import { MdInfo } from 'react-icons/md'
import Axios from 'axios'
import GenerateOTP from '../OTP/GenerateOTP'
import BeatLoader from "react-spinners/BeatLoader";

function Register() {

    const [username, setUsername] = useState('')
    const [isCheckUsername, setIsCheckUsername] = useState(false)

    const [email, setEmail] = useState('')

    const [isPassword, setIsPassword] = useState(false)
    const [isInfo, setIsInfo] = useState(false)
    const [password, setPassword] = useState('')

    const [isCheckPassword, setIsCheckPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')

    const [OTP, setOTP] = useState('')
    const [isRegister, setIsRegister] = useState(false)
    const [loading, setLoading] = useState(false)
    const [generatedOTP, setGeneratedOTP] = useState('')

    const [users, setUsers] = useState([])

    useEffect(() => {

        Axios.get('https://wild-pear-cocoon-wig.cyclic.app//ss/get-users').then((res) => setUsers(res.data.UsersData))

    }, [])

    const handleUsername = (e) => {

        users.forEach((user) => {
            if (user.username === e.target.value) {
                setIsCheckUsername(true)
            }
            else {
                setIsCheckUsername(false)
            }
        })

        setUsername(e.target.value)
    }

    const MESSAGE = (otp) => {
        return `
        <div style="border:1px solid black;width : 380px;background: #293243;padding: 10px; border-radius: 5px;">
        <div style="text-align: center;">
            <img src="https://wild-pear-cocoon-wig.cyclic.app//Images/logo.png" alt="logo" />
        </div>
        <div style="color: #fff;padding: 10px;">
            <p>Thanks For Registering to <b>Smart Shop</b>, Here is the One Time Password
                <b style="text-decoration: underline;"> ${otp}</b>, Do
                Not Share
                the One
                Time Password with anyone.
            </p>
            <p><b>NOTE:</b> The One Time Password will expire in 10 minutes...</p>
        </div>
        <div style="color: #fff; margin-bottom: 30px;">
            <span>Thanks and Regards</span><br>
            <b>
                Smart Shop
            </b>
        </div>
    </div>
        `
    }

    const handleRegister = () => {

        if (OTP.toString() === generatedOTP.toString()) {
            Axios.post('https://wild-pear-cocoon-wig.cyclic.app//ss/register-user', {
                Username: username,
                Email: email,
                Password: password
            }).then((res) => {
                if (res.data.isSuccess) {
                    alert(res.data.message)
                    handleClear()
                    setIsRegister(false)
                }
            })
        }
        else {
            alert("One Time Password is Invalid Please Try Again...")
        }

    }

    const handlePassword = (e) => {

        let PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}/

        if (PWD_REGEX.test(e.target.value)) {
            setIsPassword(false)
        }
        else {
            setIsPassword(true)
        }

        if (e.target.value === '') {
            setIsPassword(false)
        }

        setPassword(e.target.value)
    }

    const handleConfirmPassword = (e) => {

        if (password === e.target.value) {
            setIsCheckPassword(false)
        }
        else {
            setIsCheckPassword(true)
        }

        if (e.target.value === '') {
            setIsCheckPassword(false)
        }

        setConfirmPassword(e.target.value)

    }

    const handleClear = () => {
        setUsername('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    const handleOTP = async () => {

        if (username === '' || email === '' || password === '' || confirmPassword === '') {
            alert("Please Provide the Details...!")
        }
        else {
            if (isPassword === false && isCheckPassword === false && isCheckUsername === false) {

                setIsRegister(true)
                setLoading(true)

                let otp = await GenerateOTP();
                setGeneratedOTP(otp)

                let mail = await Axios.post('https://wild-pear-cocoon-wig.cyclic.app//mail/send-mail-html', {

                    toMail: email,
                    toSubject: "One Time Password - Smart Shop",
                    toMessage: MESSAGE(otp)

                })

                if (mail.data.isSuccess) {
                    setLoading(false)
                }

            }
            else {
                alert("Please provide the correct details...!")
            }
        }
    }

    return (
        <>
            <div className='border border-gray-300 px-3 py-8 sm:w-96 rounded-lg shadow-md mt-5'>
                <span className='text-3xl font-bold mx-2'>Register</span>
                <p className='w-full h-0.5 bg-gray-200 mt-2'></p>
                <div className='mx-5 my-5'>
                    {/* Register details */}
                    <div className='mt-4'>
                        <input
                            type={'text'}
                            placeholder='Enter Username'
                            value={username}
                            onChange={handleUsername}
                            className='border w-full pl-2 h-10 rounded-sm focus:outline-[#293243] select-none'
                        />
                    </div>
                    <small className={isCheckUsername ? 'pl-2 text-red-500' : 'hidden'}>Username is already Exists..!</small>
                    <div className='mt-4'>
                        <input
                            type={'text'}
                            placeholder='Enter Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='border w-full pl-2 h-10 rounded-sm focus:outline-[#293243] select-none'
                        />
                    </div>
                    <div className='mt-4 relative'>
                        <input
                            type={'password'}
                            placeholder='Enter Password'
                            value={password}
                            onChange={handlePassword}
                            className='border w-full pl-2 h-10 rounded-sm focus:outline-[#293243] select-none'
                        />
                        <div
                            className='absolute right-2 bottom-2'
                        >
                            <div className='relative cursor-pointer'>
                                <MdInfo
                                    fontSize={'25px'}
                                    onMouseEnter={() => setIsInfo(!isInfo)}
                                    onMouseLeave={() => setIsInfo(!isInfo)}
                                />
                                <p
                                    className={isInfo ? 'absolute w-72 right-0 border-2 text-sm bg-black bg-opacity-80 px-2 py-1 rounded-md text-white' : 'hidden'}
                                >Password should containe a uppercase, lowercase, number and spacial charecter <br /> Spacial Characters Allowed : [ ! @ # $ % ]</p>
                            </div>
                        </div>
                    </div>

                    <p className={isPassword ? 'text-xs px-3 text-red-500 my-2' : "hidden"}>Password is Not valid check requirement...!</p>

                    <div className='mt-4'>
                        <input
                            type={'password'}
                            placeholder='Enter Confirm Password'
                            value={confirmPassword}
                            onChange={handleConfirmPassword}
                            className='border w-full pl-2 h-10 rounded-sm focus:outline-[#293243] select-none'
                        />
                        <span className={isCheckPassword ? 'text-xs text-red-500 px-3' : "hidden"}>Password is not matched!!</span>
                    </div>
                    <div className='mt-5 float-right'>
                        <button
                            className='bg-[#293243] text-white w-24 h-10 rounded-md'
                            onClick={handleOTP}
                        >Register</button>
                    </div>
                </div>
            </div>

            {/* OTP Screen */}
            {
                isRegister ?
                    <div className='absolute top-0 left-0 w-full h-full bg-[#fff] flex justify-center items-start'>
                        <div className='mt-10 px-6 py-5 w-96 shadow-md rounded-md'>
                            <p className='border-b-2 text-xl font-bold'>Verify Email Address</p>
                            <div className='mt-5'>
                                <label htmlFor='otp'>Enter OTP</label>
                                <input
                                    type={'text'}
                                    placeholder="Enter One Time Password"
                                    className='w-full border focus:outline-none shadow-md rounded-md h-10 px-2'
                                    value={OTP}
                                    onChange={e => setOTP(e.target.value)}
                                />
                            </div>
                            <div>
                                {
                                    loading ?
                                        <BeatLoader
                                            color={"#293243"}
                                            size={10}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                            className='ml-3'
                                        />
                                        :
                                        <small className='pl-2'>A OTP is Sent to your Email Address</small>
                                }
                            </div>
                            <div className='mt-5'>
                                <button
                                    className='border w-20 h-10 rounded-md shadow-md bg-[#293243] text-white'
                                    onClick={handleRegister}
                                >Submit</button>
                                <button
                                    className='border w-20 h-10 rounded-md shadow-md bg-[#293243] text-white'
                                    onClick={() => setIsRegister(false)}
                                >Close</button>
                            </div>
                        </div>
                    </div>
                    :
                    <></>
            }
        </>
    )
}

export default Register
import React, { useState } from 'react'
import { MdCheckCircle, MdDangerous, MdInfo } from 'react-icons/md'
import Axios from 'axios'
import GenerateOTP from '../Components/OTP/GenerateOTP'
import BeatLoader from "react-spinners/BeatLoader";
import { useNavigate } from 'react-router-dom'

function ForgotPasswordValidation() {

    const [OTP, setOTP] = useState('')
    const [generateOTP, setGenerateOTP] = useState(false)

    const [providedOTP, setProvidedOTP] = useState('')
    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState('')
    const [isTrue, setIsTrue] = useState(false)
    const [isFalse, setIsFalse] = useState(false)

    const [password, setPassword] = useState('')
    const [isPassword, setIsPassword] = useState(false)
    const [isInfo, setIsInfo] = useState(false)

    const [confirmPassword, setConfirmPassword] = useState('')
    const [isCheckPassword, setIsCheckPassword] = useState(false)

    const navigate = useNavigate()

    const MESSAGE = (otp) => {

        return `
        <div style="border:1px solid black;width : 380px;background: #293243;padding: 10px; border-radius: 5px;">
        <div style="text-align: center;">
            <img src="https://wild-pear-cocoon-wig.cyclic.app/Images/logo.png" alt="logo" />
        </div>
        <div style="color: #fff;padding: 10px;">
            <p>Your Request is Approved for Forgot Password. Here is the One Time Password <b
                    style="text-decoration: underline;"> ${otp}</b>, Do
                Not Share
                the One
                Time Password with anyone. </p>
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

    const handleCheck = async () => {
        setLoading(true)
        let result = await Axios.post('https://wild-pear-cocoon-wig.cyclic.app/ss/check-email', {
            Email: email
        })

        if (result.data.isSuccess) {
            setIsTrue(true)
        }
        else {
            setIsFalse(true)
        }

        let OTP = await GenerateOTP()

        let mail = await Axios.post('https://wild-pear-cocoon-wig.cyclic.app/mail/send-mail-html', {

            toMail: email,
            toSubject: "Smart Shop - Forgot Password Request",
            toMessage: MESSAGE(OTP)

        })

        if (mail.data.isSuccess) {
            setLoading(false)
            setOTP(OTP)
            setIsTrue(true)
            setTimeout(() => {
                setOTP('')
                setIsTrue(false)
            }, 600000)
        }


    }

    const handleCheckOTP = () => {

        if (providedOTP.toString() === OTP.toString()) {
            setGenerateOTP(true)
        }
        else {
            alert("OTP is Not Valid Try Again...!")
        }

    }

    const handleChangePassword = async () => {

        if (password === '' || confirmPassword === '' || email === '') {
            alert("Please Provide the Details Correctly...")
        }
        else {
            if (isPassword === true || isCheckPassword === true) {
                alert("Please Provide the Details Correctly")
            }
            else {
                let result = await Axios.post('https://wild-pear-cocoon-wig.cyclic.app/ss/change-password', {
                    Password: password,
                    Email: email
                })

                if (result.data.isSuccess) {
                    alert("Password Has Been Changed..!")
                    handleClear()
                    navigate('/account')
                }
                else {
                    alert("There were some issue.. Please Try again...")
                    handleClear()
                    navigate('/account')
                }

            }
        }


    }

    const handleClear = () => {

        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setIsCheckPassword(false)
        setIsPassword(false)
        setOTP('')
        setGenerateOTP(false)
        setProvidedOTP('')
        setIsTrue(false)

    }

    return (
        <div className='laptop:px-56 laptop:py-10 px-5'>
            <div className='shadow-md rounded-md laptop:px-20 px-1 py-10'>
                <p className='laptop:text-3xl text-xl font-bold pb-3'>Forgot Password</p>
                <div className='shadow-md rounded-md laptop:px-10 px-1 py-5'>
                    <p className='laptop:text-xl text-lg font-bold w-full border-b-2'>Email Verification</p>

                    {/* Email Verify */}
                    <div className='laptop:px-10'>
                        <div className='mt-4 laptop:w-96'>
                            <label htmlFor='email' className='font-bold'>Registered Email Address</label>
                            <input
                                type='text'
                                placeholder='Enter Email Address'
                                id='email'
                                className='w-full h-10 px-2 border shadow-md rounded-md mt-2 focus:outline-none'
                                autoFocus={true}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='mt-3 flex items-center'>
                            <button className='border rounded-md shadow-md px-5 py-1' onClick={handleCheck}>Check</button>
                            {
                                isTrue ?
                                    <MdCheckCircle
                                        className='text-2xl ml-2 text-green-600'
                                    />
                                    :
                                    <></>
                            }
                            {
                                isFalse ?
                                    <MdDangerous
                                        className='text-2xl ml-2 text-red-600'
                                    />
                                    :
                                    <></>
                            }
                            {
                                loading ? <BeatLoader
                                    color={"#293243"}
                                    size={10}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                    className='ml-3'
                                />
                                    :
                                    <></>
                            }
                        </div>
                    </div>

                    {/* OTP Verify */}
                    <div className='laptop:px-10 py-5'>
                        <div className='mt-4 laptop:w-96'>
                            <label htmlFor='OTP' className='font-bold'>Enter OTP</label>
                            <input
                                type='text'
                                placeholder='One Time Passsword'
                                id='OTP'
                                className='w-full h-10 px-2 border shadow-md rounded-md mt-2 focus:outline-none'
                                disabled={!isTrue}
                                value={providedOTP}
                                onChange={e => setProvidedOTP(e.target.value)}
                            />
                            <button
                                className='border rounded-md shadow-md px-5 py-1 mt-3'
                                disabled={!isTrue}
                                onClick={handleCheckOTP}
                            >Submit</button>
                        </div>
                    </div>
                </div>

                {
                    generateOTP ?
                        <div className='shadow-md rounded-md laptop:px-10 px-1 py-5'>
                            <p className='text-xl font-bold w-full border-b-2'>Change Password</p>
                            <div className='laptop:px-10'>
                                <div className='mt-6 laptop:w-96 relative'>
                                    <label htmlFor='password' className='font-bold'>New Password</label>
                                    <input
                                        type='password'
                                        placeholder='Enter new Password'
                                        id='password'
                                        className='w-full h-10 px-2 border shadow-md rounded-md mt-2 focus:outline-none'
                                        value={password}
                                        onChange={handlePassword}
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
                                <small className={isPassword ? 'text-red-500' : "hidden"}> Password Doesn't Match the Requirement</small>
                                <div className='mt-6 laptop:w-96'>
                                    <label htmlFor='cPassword' className='font-bold'>Confirm Password</label>
                                    <input
                                        type='password'
                                        placeholder='Enter Confirm Password'
                                        id='cPassword'
                                        className='w-full h-10 px-2 border shadow-md rounded-md mt-2 focus:outline-none'
                                        value={confirmPassword}
                                        onChange={handleConfirmPassword}
                                    />
                                </div>
                                <small className={isCheckPassword ? 'text-red-500' : "hidden"}>The Password Doesn't Match</small>
                                <div className='mt-4 laptop:w-96'>
                                    <button className='border rounded-md shadow-md px-5 py-1 w-24 h-10' onClick={handleChangePassword}>Change</button>
                                </div>
                            </div>
                        </div>
                        :
                        <></>
                }
            </div>
        </div>
    )
}

export default ForgotPasswordValidation
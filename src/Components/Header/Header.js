import React, { useState } from 'react'
import { Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, getUser, removeRole, getRole } from '../../Redux/Feature/UserSlice'
import { getCart, unLoadCart } from '../../Redux/Feature/CartSlice'
import Logo from '../../assets/logo.png'
import Axios from 'axios'
import { unLoadorders } from '../../Redux/Feature/OrdersSlice'
import MyImage from '../../assets/my-image.jpg'
import LinkedIN from '../../assets/linked-in.png'
import { MdClose } from 'react-icons/md'

function Header() {

    const [isDropDown, setIsDropDown] = useState(false)

    const [aboutUs, setAboutUs] = useState(false)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const user = useSelector(getUser)
    const Role = useSelector(getRole)
    const cart = useSelector(getCart)

    const handleLogout = () => {

        Axios.post('https://wild-pear-cocoon-wig.cyclic.app//ss/logout').then((res) => {
            if (res.data.isSuccess) {
                alert(res.data.message)
                dispatch(logout(null))
                dispatch(removeRole())
                dispatch(unLoadCart())
                dispatch(unLoadorders())
                navigate('/account')
            }
        })

    }

    return (
        <>
            <div className='bg-[#293243] text-white laptop:py-4 laptop:px-48 sm:py-5 sm:px-2 flex flex-row justify-between items-end shadow-lg'>
                <>
                    <img
                        src={Logo}
                        alt='logo'
                        width={"170px"}
                        onClick={() => navigate('/')}
                        className='cursor-pointer'
                    />
                </>
                <div className='relative'>
                    <button className='cursor-pointer rounded-full shadow-2xl focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-700 relative' onClick={() => setIsDropDown(!isDropDown)} >
                        <img
                            src={"https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?t=st=1672330731~exp=1672331331~hmac=3e5f5bec0c481f47a8309e9dcb872113203314182233f24c6f5f188a46c2093a"} alt="profile"
                            className='w-10 h-10 rounded-full '
                        />

                    </button>
                    {
                        cart !== null ?
                            <span className='bg-red-500 w-5 text-center rounded-full text-white absolute -top-1 -right-1'>{cart.cart?.length}</span>
                            :
                            <></>
                    }
                    <Transition
                        show={isDropDown}
                    >
                        <div
                            className='absolute right-0 z-10 origin-top-right bg-white w-36 rounded-sm shadow-2xl'
                            onClick={() => setIsDropDown(!isDropDown)}
                        >
                            <span
                                className='block px-4 py-2 text-sm text-gray-700 hover:bg-[#293243] hover:text-white cursor-pointer border-b-2'
                                onClick={() => navigate('/')}
                            >Home</span>
                            {
                                Role === 'admin' && user !== null ?
                                    <span
                                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-[#293243] hover:text-white cursor-pointer border-b-2'
                                        onClick={() => navigate('/users')}
                                    >Users</span>
                                    :
                                    <></>
                            }
                            {
                                Role === 'user' || Role === 'guest' || user === null ?
                                    <></>
                                    :
                                    <span
                                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-[#293243] hover:text-white cursor-pointer border-b-2'
                                        onClick={() => navigate('/products')}
                                    >Products</span>
                            }
                            <span
                                className='block px-4 py-2 text-sm text-gray-700 hover:bg-[#293243] hover:text-white cursor-pointer border-b-2'
                                onClick={() => navigate('/profile')}
                            >Profile</span>
                            <span
                                className='px-4 py-2 text-sm text-gray-700 hover:bg-[#293243] hover:text-white cursor-pointer border-b-2 flex flex-row justify-between'
                                onClick={() => navigate('/cart')}
                            >Cart
                                {
                                    cart !== null ?
                                        <>
                                            {
                                                cart.length !== 0 ?
                                                    <span className='bg-red-500 w-5 text-center rounded-full text-white'>{cart.cart?.length}</span>
                                                    :
                                                    <></>
                                            }</>
                                        :
                                        <></>
                                }
                            </span>
                            <span
                                className='block px-4 py-2 text-sm text-gray-700 hover:bg-[#293243] hover:text-white cursor-pointer border-b-2'
                                onClick={() => setAboutUs(true)}
                            >About Us</span>
                            {
                                user !== null ?
                                    <span
                                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-[#293243] hover:text-white cursor-pointer'
                                        onClick={handleLogout}
                                    >Logout</span>
                                    :
                                    <span
                                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-[#293243] hover:text-white cursor-pointer'
                                        onClick={() => navigate('/account')}
                                    >Login</span>

                            }
                        </div>
                    </Transition>
                </div>
            </div>

            {
                aboutUs ?
                    <div className='fixed top-0 left-0 z-40 bg-[#293243] w-full h-full flex justify-center items-start'>
                        <div className='laptop:w-2/4 h-full overflow-y-auto mt-5 bg-[#fff] shadow-lg rounded-md px-10 py-5 relative'>
                            <p className='text-3xl border-b-4'>About Us</p>
                            <div className='mt-5'>
                                <div className='flex flexrow items-start border-b-4 py-5'>
                                    <img src={MyImage} alt="Md Ilyas Hussain" className='w-28 h-28' />
                                    <div className='ml-3'>
                                        <span>Md Ilyas Hussain Taj</span>
                                        <br />
                                        <br />
                                        <a href="https://www.linkedin.com/in/ilyas-hussain-376275202/" target={'blank'}>Check My Profile <img src={LinkedIN} alt="linkedin" className='w-8 h-8 ml-1' /></a>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-5'>
                                <p className='text-2xl py-2 border-b-2'>About Project</p>
                                <div className='my-3'>
                                    <p>Smart Shop is an Application Where You can Login and Order Something. Its a FullStack Application So If You Logged Off and then after sometime Logged In Once again the items you order to Added to cart will be still there...</p>
                                    <h2 className='py-2 font-bold'>Key Features</h2>
                                    <ul className='list-disc px-5'>
                                        <li>Login With Session and Cookies</li>
                                        <li>User Management</li>
                                        <li>Password Encryption with an Pattern</li>
                                        <li>Unique Username</li>
                                        <li>One Time Password While Registration and Forget Password</li>
                                        <li>Email Sending</li>
                                        <li>Responsive Desgin</li>
                                        <li>User Roles and Permissions</li>
                                    </ul>
                                </div>
                            </div>
                            <MdClose
                                className='absolute top-1 right-1 text-5xl cursor-pointer'
                                onClick={() => setAboutUs(false)}
                            />
                        </div>
                    </div>
                    :
                    <></>
            }
        </>
    )
}

export default Header
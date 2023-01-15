import React from 'react'
import OrderProduct from '../Components/OrdersProduct/OrderProduct'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUser, logout, removeRole } from '../Redux/Feature/UserSlice'
import { getorders, unLoadorders } from '../Redux/Feature/OrdersSlice'
import { unLoadCart } from '../Redux/Feature/CartSlice'
import Empty from '../assets/Empty-Data.jpg'

function ProfileScreen() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(getUser)
    const orders = useSelector(getorders)

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
        <div className='my-6 laptop:mx-10'>
            <div className='border-2 w-full laptop:px-4 px-1 py-6 flex laptop:flex-row flex-col items-start'>

                {/* User Profile  */}
                <div className='border-2 mr-10 py-6 px-2 w-96 shadow-lg'>
                    <div className='w-full flex justify-center p-3'>
                        <img
                            src={"https://cdn-icons-png.flaticon.com/512/219/219983.png"}
                            alt="user"
                            className='w-32'
                        />
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <td className='w-36 font-bold p-2'>Username</td>
                                    <td>{user[0].username}</td>
                                </tr>
                                <tr>
                                    <td className='w-36 font-bold p-2'>Email Address</td>
                                    <td>{user[0].email}</td>
                                </tr>
                            </thead>
                        </table>
                        <div className='m-4 mt-10'>
                            <button
                                className='bg-red-500 w-24 h-10 rounded-md text-white hover:scale-110'
                                onClick={handleLogout}
                            >Logout</button>
                        </div>
                    </div>
                </div>

                {/* Orders Page */}
                <div className='border-2 flex-1 mr-10 py-6 w-full px-10'>
                    <div className='border-b-2 py-3'>
                        <span className='text-3xl font-bold'>Orders</span>
                    </div>
                    <div>
                        {
                            orders !== undefined ?
                                <>
                                    {
                                        orders.length !== 0 ?
                                            <>
                                                {
                                                    orders.map((order, index) => {
                                                        return <OrderProduct
                                                            key={index}
                                                            orderId={order._id}
                                                            productId={order.ProductId}
                                                            productName={order.products[0].productName}
                                                            productImage={order.products[0].productImage}
                                                            productPrice={order.products[0].productPrice}
                                                            productRating={order.products[0].productRating}
                                                            productReview={order.products[0].productReview}
                                                            orderAddress={order.address}
                                                            orderDate={order.orderDate}
                                                        />
                                                    })
                                                }
                                            </>
                                            :
                                            <div className='flex flex-col justify-center items-center'>
                                                <img
                                                    alt='Empty-Data'
                                                    src={Empty}
                                                    className={"w-56"}
                                                />
                                                <h2 className='text-center text-3xl'>No Data Found..!</h2>
                                            </div>
                                    }
                                </>
                                :
                                <>
                                    <div className='flex flex-col justify-center items-center'>
                                        <img
                                            alt='Empty-Data'
                                            src={Empty}
                                            className={"w-56"}
                                        />
                                        <h2 className='text-center text-3xl'>No Data Found..!</h2>
                                    </div>
                                </>
                        }

                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProfileScreen
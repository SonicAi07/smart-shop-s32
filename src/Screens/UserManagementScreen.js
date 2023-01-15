import React, { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import EditUser from '../Components/EditUser/EditUser'
import Axios from 'axios'

function UserManagementScreen() {

    const [users, setUsers] = useState([])

    const [isEdit, setIsEdit] = useState(false)
    const [currentUser, setCurrentUser] = useState(0)

    const [isDeleted, setIsDeleted] = useState(false)

    useEffect(() => {
        isEdit ?
            Axios.get('https://wild-pear-cocoon-wig.cyclic.app/ss/get-users').then((res) => {
                if (res.data.isSuccess) {
                    setUsers(res.data.UsersData)
                }
            })
            :
            Axios.get('https://wild-pear-cocoon-wig.cyclic.app/ss/get-users').then((res) => {
                if (res.data.isSuccess) {
                    setUsers(res.data.UsersData)
                }
            })
    }, [isEdit])

    useEffect(() => {
        if (isDeleted) {
            Axios.get('https://wild-pear-cocoon-wig.cyclic.app/ss/get-users').then((res) => {
                if (res.data.isSuccess) {
                    setUsers(res.data.UsersData)
                    setIsDeleted(false)
                }
            })
        }
    }, [isDeleted])

    const handleDelete = (_id) => {

        Axios.post('https://wild-pear-cocoon-wig.cyclic.app/ss/delete-user', {
            Id: _id
        }).then((res) => {
            if (res.data.isSuccess) {
                alert(res.data.message)
                setIsDeleted(true)
            }
        })

    }

    return (
        <>
            <div className='laptop:px-10 py-12'>
                <div className='border-2 shadow-md p-5 h-96 overflow-y-auto'>
                    <div className='border-b-2 pb-2'>
                        <span className='text-2xl font-bold'>User Management</span>
                    </div>
                    <div className='laptop:flex w-full justify-center items-start'>
                        <table className='w-1/3 mt-10'>
                            <thead className='font-bold'>
                                <tr className='border-b-2'>
                                    <td>Username</td>
                                    <td>Email Address</td>
                                    <td className='text-center w-24 '>Options</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users?.map((user, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td className='flex flex-row items-center w-24 justify-evenly p-1'>
                                                    <span
                                                        className='hover:bg-[#d2d2d2] p-2 rounded-full cursor-pointer'
                                                        onClick={() => {
                                                            setCurrentUser(user._id)
                                                            setIsEdit(true)
                                                        }}
                                                    ><MdEdit className='text-3xl' /></span>
                                                    <span
                                                        className='hover:bg-[#d2d2d2] p-2 rounded-full cursor-pointer'
                                                        onClick={() => handleDelete(user._id)}
                                                    ><MdDelete className='text-3xl' /></span>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <EditUser
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
            />
        </>
    )
}

export default UserManagementScreen
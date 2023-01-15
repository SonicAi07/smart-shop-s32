import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function EditUser(props) {

    const [roles, setRoles] = useState([])

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [role, setrole] = useState('')

    useEffect(() => {

        Axios.get('https://wild-pear-cocoon-wig.cyclic.app/ss/get-roles').then((res) => {
            if (res.data.isSuccess) {
                setRoles(res.data.Roles)
            }
        })

        if (props.currentUser !== 0) {
            Axios.post('https://wild-pear-cocoon-wig.cyclic.app/ss/get-by-id', {
                Id: props.currentUser
            }).then((res) => {
                if (res.data.isSuccess) {
                    setUsername(res.data.UserData[0].username)
                    setEmail(res.data.UserData[0].email)
                    setrole(res.data.Role)
                }
            })
        }

    }, [props.currentUser])

    const handleUpdate = () => {
        Axios.post('https://wild-pear-cocoon-wig.cyclic.app/ss/update-user', {

            Id: props.currentUser,
            Username: username,
            Email: email,
            RoleId: role

        }).then((res) => {
            if (res.data.isSuccess) {
                alert(res.data.message)
                props.setIsEdit(false)
                props.setCurrentUser(0)
            }
        })
    }

    return (

        <div className={props.isEdit ? 'absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 flex flex-row justify-center items-start' : 'hidden'}>
            <div className='mt-5 bg-white w-96 rounded-md'>
                <div className='px-5 py-3 border-b-2'>
                    <span className='text-2xl font-bold'>Edit User</span>
                </div>
                <div className='space-y-3'>
                    <div className='px-3 py-3'>
                        <label>Username</label>
                        <input
                            type={'text'}
                            placeholder='Enter Username'
                            className='w-full shadow-md rounded-md h-10 border focus:outline-none focus:border-2 px-2'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='px-3 py-3'>
                        <label>Username</label>
                        <input
                            type={'text'}
                            placeholder='Enter Email Address'
                            className='w-full shadow-md rounded-md h-10 border focus:outline-none focus:border-2 px-2'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='px-3 py-3'>
                        <label>Role</label>
                        <select
                            className='w-full shadow-md rounded-md h-10 border px-2'
                            value={role}
                            onChange={(e) => setrole(e.target.value)}
                        >
                            <option value=''>Choose...</option>
                            {roles.map((role, index) => {
                                return <option key={index} value={role._id}>{role.Role}</option>
                            })}
                        </select>
                    </div>
                    <div className='px-3 py-3 pb-5'>
                        <button
                            className='bg-[#293243] w-24 h-10 text-white rounded-md hover:scale-110'
                            onClick={handleUpdate}
                        >Update</button>
                        <button className='bg-red-500 w-24 h-10 text-white rounded-md hover:scale-110 float-right' onClick={() => {
                            props.setIsEdit(false)
                            props.setCurrentUser(0)
                        }}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditUser
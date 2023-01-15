import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoutes({ isExists }) {

    return (
        isExists ? <Outlet /> : <Navigate to={'/account'} />
    )
}

export default ProtectedRoutes
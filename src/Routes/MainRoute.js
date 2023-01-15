import React, { useEffect } from "react";
import HomeScreen from "../Screens/HomeScreen";
import { Routes, Route } from 'react-router-dom'
import Header from "../Components/Header/Header";
import LoginScreen from "../Screens/LoginScreen";
import ProductsScreen from "../Screens/ProductsScreen";
import CartScreen from "../Screens/CartScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import ProtectedRoutes from "./ProtectedRoutes";
import { useDispatch, useSelector } from "react-redux";
import Axios from 'axios'
import { login, logout, getUser, setRole, removeRole } from "../Redux/Feature/UserSlice";
import ErrorPage from "../Components/Error-Page/ErrorPage";
import UserManagementScreen from "../Screens/UserManagementScreen";
import { loadCart, unLoadCart } from "../Redux/Feature/CartSlice";
import OrdersScreen from "../Screens/OrdersScreen";
import PaymentScreen from "../Screens/PaymentScreen";
import { loadorders } from "../Redux/Feature/OrdersSlice";
import ForgotPasswordValidation from "../Screens/ForgotPasswordValidation";

function MainRoute() {

    Axios.defaults.withCredentials = true

    const dispatch = useDispatch();

    const user = useSelector(getUser)

    useEffect(() => {

        Axios.get('https://wild-pear-cocoon-wig.cyclic.app//ss/login').then((res) => {
            if (res.data.isSuccess) {
                dispatch(login(res.data.UserData))
                dispatch(setRole(res.data.role))
                Axios.post('https://wild-pear-cocoon-wig.cyclic.app//ss/get-cart-items', {
                    Id: res.data.UserData[0]._id
                }).then((cartData) => {
                    dispatch(loadCart(cartData.data.CartItems))
                })
                Axios.post('https://wild-pear-cocoon-wig.cyclic.app//ss/get-orders', {
                    Id: res.data.UserData[0]._id
                }).then((orderData) => {
                    dispatch(loadorders(orderData.data.Orders))
                })
            }
            else {
                dispatch(logout(null))
                dispatch(removeRole())
                dispatch(unLoadCart())
            }
        })

    }, [dispatch])

    return (
        <>
            <Header />
            <Routes>

                <Route
                    path='/'
                    exact
                    element={<HomeScreen />}
                />

                <Route element={<ProtectedRoutes isExists={user === null ? false : true} />}>
                    <Route
                        path='/products'
                        element={<ProductsScreen />}
                    />
                    <Route
                        path='/cart'
                        element={<CartScreen />}
                    />
                    <Route
                        path='/profile'
                        element={<ProfileScreen />}
                    />
                    <Route
                        path='/users'
                        element={<UserManagementScreen />}
                    />

                    <Route
                        path='/orders'
                        element={<OrdersScreen />}
                    />

                    <Route
                        path='/payment'
                        element={<PaymentScreen />}
                    />

                </Route>

                <Route
                    path='/account'
                    element={<LoginScreen />}
                />

                <Route
                    path='/error'
                    element={<ErrorPage />}
                />
                <Route
                    path='/*'
                    element={<ErrorPage />}
                />

                <Route
                    path='/secure_password'
                    element={<ForgotPasswordValidation />}
                />

            </Routes>
        </>
    )
}

export default MainRoute
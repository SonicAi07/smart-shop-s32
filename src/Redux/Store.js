import { configureStore } from '@reduxjs/toolkit'

import UserReducer from './Feature/UserSlice'
import CartReducer from './Feature/CartSlice'
import OrdersReducer from './Feature/OrdersSlice'

export default configureStore({
    reducer: {
        user: UserReducer,
        cart: CartReducer,
        orders: OrdersReducer
    }
})
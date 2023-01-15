import { createSlice } from '@reduxjs/toolkit'

const OrdersSlice = createSlice({
    name: "orders",
    initialState: {
        orders: null
    },
    reducers: {
        loadorders: (state, action) => {
            state.orders = action.payload
        },
        unLoadorders: (state) => {
            state.orders = null
        }
    }
})


export const { loadorders, unLoadorders } = OrdersSlice.actions;

export const getorders = state => state.orders.orders; // state.name.variable

export default OrdersSlice.reducer;
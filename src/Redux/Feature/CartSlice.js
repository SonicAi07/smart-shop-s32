import { createSlice } from '@reduxjs/toolkit'

const CartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: []
    },
    reducers: {
        loadCart: (state, action) => {
            state.cart = { ...state.cart, cart: action.payload }
        },
        unLoadCart: (state) => {
            state.cart = null
        },
        filterCart: (state, action) => {
            let cart = state.cart.cart.filter(item => item._id !== action.payload)
            state.cart.cart = cart
        }
    }
})


export const { loadCart, unLoadCart, filterCart } = CartSlice.actions;

export const getCart = state => state.cart.cart; // state.name.variable

export default CartSlice.reducer;
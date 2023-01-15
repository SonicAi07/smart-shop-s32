import { createSlice } from '@reduxjs/toolkit'


const UserSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        role: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state, action) => {
            state.user = action.payload
        },
        setRole: (state, action) => {
            state.role = action.payload
        },
        removeRole: (state) => {
            state.role = null
        }
    }
})


export const { login, logout, setRole, removeRole } = UserSlice.actions;

export const getUser = state => state.user.user; // state.name.variable

export const getRole = state => state.user.role

export default UserSlice.reducer;
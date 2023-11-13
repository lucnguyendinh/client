import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isFetching: false,
        error: false,
        success: false,
        login: {
            currentUser: null,
            err: '',
        },
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.isFetching = false
            state.login.currentUser = action.payload
            state.error = false
        },
        loginFailed: (state, action) => {
            state.isFetching = false
            state.error = true
            state.login.msg = action.payload
        },
        logOutStart: (state) => {
            state.isFetching = true
        },
        logOutSuccess: (state) => {
            state.login.currentUser = null
            state.isFetching = false
            state.success = true
            state.error = false
            state.login.msg = ''
        },
        logOutFailed: (state) => {
            state.isFetching = false
            state.error = true
            state.success = false
        },
    },
})

export const { loginStart, loginSuccess, loginFailed, logOutStart, logOutSuccess, logOutFailed } = authSlice.actions

export default authSlice.reducer

import axios from 'axios'
import { loginFailed, loginStart, loginSuccess, logOutFailed, logOutStart, logOutSuccess } from '../Slice/authSlice'

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        const res = await axios.post('/auth/login', user)
        dispatch(loginSuccess(res.data))
        navigate('/home1')
    } catch (err) {
        dispatch(loginFailed(err.response.data))
    }
}

export const logOutUser = async (dispatch, navigate, id) => {
    dispatch(logOutStart())
    try {
        await axios.post('/auth/logout', id)
        dispatch(logOutSuccess())
        navigate('/login')
    } catch (err) {
        dispatch(logOutFailed())
    }
}

import axios from 'axios'
import jwtDecode from 'jwt-decode'

const refreshToken = async (user) => {
    try {
        const res = await axios.post('/auth/refresh', user, {
            withCredentials: true,
        })
        return res.data
    } catch (err) {
        console.log(err)
    }
}
//check truoc khi goi den api co jwt
const createAxios = (user, setUser) => {
    const newInstance = axios.create()
    newInstance.interceptors.request.use(
        async (config) => {
            const date = new Date()
            const decodeToken = jwtDecode(user?.accessToken)
            if (decodeToken.exp < date.getTime() / 1000) {
                const data = await refreshToken({ user: user.user._id })
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken,
                }
                setUser(refreshUser)
                config.headers['token'] = 'Bearer ' + data.accessToken
            }
            return config
        },
        (err) => {
            return Promise.reject(err)
        },
    )
    return newInstance
}

export default createAxios

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import '../../styles.css'
import { loginUser } from '../../redux/Api/apiRequest'

const Login = ({ user, setUser }) => {
    const err = useSelector((state) => state.auth.login.msg)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        !!user && navigate('/home1')
    }, [navigate, user])
    const handleSubmit = (e) => {
        e.preventDefault()
        const login = async () => {
            const user = {
                username,
                password,
            }
            loginUser(user, dispatch, navigate)
            // try {
            //     const res = await axios.post('/auth/login', user)
            //     setUser(res.data)
            //     navigate('/home1')
            // } catch (error) {
            //     setErr(error.response)
            // }
        }
        login()
    }
    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="login-input">
                        <input
                            type="text"
                            placeholder="name"
                            onChange={(e) => setUserName(e.target.value)}
                            value={username}
                        />
                        <input
                            type="password"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <button className="login">Login</button>
                </form>
                <button className="register" onClick={() => navigate('/register')}>
                    Register
                </button>
                <h2>{err}</h2>
            </div>
        </div>
    )
}

export default Login

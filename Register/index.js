import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = ({ user }) => {
    const navigate = useNavigate()
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    useEffect(() => {
        !!user && navigate('/login')
    }, [navigate, user])
    const handleSubmit = (e) => {
        e.preventDefault()
        const registerUser = async () => {
                const newUser = {
                    username,
                    email,
                    password,
                const res = await axios.post('/auth/register', newUser)
                console.log(res.data)
                navigate('/login')
        }
        registerUser()
    }
    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="login-input">
                        <input
                            type="text"
                            placeholder="name"
                            onChange={(e) => setUserName(e.target.value)}
                            value={username}
                        />
                        <input
                            type="text"
                            placeholder="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <input
                            type="password"
                            placeholder="password"
                        />
                    </div>
                    <button className="register">Register</button>
                </form>
                <button className="login" onClick={() => navigate('/login')}>
                    Login
                </button>
            </div>
        </div>
    )
}

export default Register

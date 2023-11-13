import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { publicRouter } from './routers'

function App() {
    const user1 = useSelector((state) => state.auth.login.currentUser)
    const [user, setUser] = useState(null)
    useEffect(() => {
        setUser(user1)
    }, [user1])
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {publicRouter.map((route, index) => {
                        const Page = route.component
                        return <Route key={index} path={route.path} element={<Page user={user} setUser={setUser} />} />
                    })}
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App

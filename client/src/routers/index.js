import Home from '../Page/Home'
import Login from '../Page/Login'
import Register from '../Page/Register'
import Detail from '../Page/Detail'
import Addcoffe from '../Page/Addcoffe'
import Editcoffe from '../Page/Editcoffe'
import Home1 from '../Page/Home1'
import HoaDon from '../Page/HoaDon'

export const publicRouter = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/detail/:id', component: Detail },
    { path: '/addcoffe', component: Addcoffe },
    { path: '/editcoffe/:id', component: Editcoffe },
    { path: '/home1', component: Home1 },
    { path: '/hoadon', component: HoaDon },
]

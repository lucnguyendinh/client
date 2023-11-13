import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logOutUser } from '../../redux/Api/apiRequest'
import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import axios from 'axios'

const HoaDon = ({ user, setUser }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [hoadon, setHoadon] = useState(null)
    const getHoaDonAdmin = async () => {
        try {
            const res = await axios.get('/cart/getall')
            setHoadon(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    const getHoaDonUser = async () => {
        try {
            const res = await axios.get(`/cart/gettouser/${user?.user?._id}`)
            setHoadon(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (user?.user?.admin) {
            getHoaDonAdmin()
        } else {
            getHoaDonUser()
        }
    }, [])
    const handleClick = async () => {
        logOutUser(dispatch, navigate, user?.user?._id)
    }
    return (
        <>
            <div id="header">
                <div class="logo">
                    <Link to="/home1">
                        <img
                            src="https://media.istockphoto.com/id/1267680005/vi/vec-to/h%C3%ACnh-minh-h%E1%BB%8Da-thi%E1%BA%BFt-k%E1%BA%BF-vector-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-c%E1%BB%91c-c%C3%A0-ph%C3%AA-vector-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-t%C3%A1ch-c%C3%A0-ph%C3%AA-%C4%91%C6%B0%E1%BB%A3c-c%C3%B4.jpg?s=612x612&w=0&k=20&c=8-isfW0Ix8T1G8bIBfHVmHCg914715Fw_GQDFz9NlDE="
                            alt="Logo"
                        />
                    </Link>
                </div>
                <div class="nav">
                    <ul class="nav-bar">
                        <li>
                            <Link to="/home1">Trang chủ</Link>
                        </li>
                        <li>Blog</li>
                        <li>
                            <a href="#">Quỹ sách công cộng</a>
                        </li>
                        <li>
                            Về chúng tôi
                            <i class="bx bx-chevron-down"></i>
                            <ul class="menu">
                                <li>
                                    <a href="#footer">Về Coffe Shop</a>
                                </li>
                                <li>
                                    <a href="#">Chính sách thẻ thành viên</a>
                                </li>
                                <li>
                                    <a href="#">Bảo hành trọn đời</a>
                                </li>
                                <li>
                                    <a href="#">Chính sách đổi trả</a>
                                </li>
                                <li>
                                    <a href="#">Hệ thống đổi hàng</a>
                                </li>
                                <li>
                                    <a href="#">Q&A</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div class="right-header">
                    <div class="menu-btn">
                        <i class="bx bx-menu"></i>
                    </div>
                    <div class="actions">
                        <i class="bx bxs-shopping-bag cart-header">{user?.user?.username}</i>
                        <i class="bx bxs-user" onClick={handleClick}>
                            Đăng xuất
                        </i>
                    </div>
                </div>
            </div>
            {/* <!-- End Header --> */}
            <div className="content">
                {hoadon?.map((h, i) => {
                    return (
                        <CardGroup className="c-card" key={i}>
                            <Card>
                                <Card.Img variant="top" src={h?.coffe?.img} />
                                <Card.Body>
                                    <Card.Title>Mã đơn: {h?._id}</Card.Title>
                                    <Card.Title>Tên: {h?.coffe?.name}</Card.Title>
                                    <Card.Text>Số lượng: {h?.soluong}</Card.Text>
                                    <Card.Text>Người đặt: {h?.user?.username}</Card.Text>
                                    <Card.Text>Số điện thoại: {h?.sdt}</Card.Text>
                                    <Card.Text>Địa chỉ: {h?.address}</Card.Text>

                                    <Card.Text>Giá: {h?.price}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">{h?.createdAt}</small>
                                </Card.Footer>
                            </Card>
                        </CardGroup>
                    )
                })}
            </div>
        </>
    )
}

export default HoaDon

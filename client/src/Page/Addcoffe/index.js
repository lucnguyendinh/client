import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import createAxios from '../../config/createInstance'
import { logOutUser } from '../../redux/Api/apiRequest'

const Addcoffe = ({ user, setUser }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [img, setImg] = useState('')
    const [quantity, setQuantity] = useState('')
    const [des, setDes] = useState('')
    const [price, setPrice] = useState('')
    const [err, setErr] = useState('')
    const axiosJWT = createAxios(user, setUser)
    useEffect(() => {
        !user && navigate('/login')
    }, [navigate, user])
    const handleSubmit = async (e) => {
        e.preventDefault()
        const newCafe = {
            name,
            category,
            img,
            quantity,
            des,
            price,
        }
        try {
            await axiosJWT.post('/coffe/createcoffe', newCafe, {
                headers: { token: `Bearer ${user.accessToken}` },
            })
            navigate('/home1')
        } catch (error) {
            setErr(error.response.data)
        }
    }
    const handleClick = async () => {
        logOutUser(dispatch, navigate, user?.user?._id)
        // try {
        //     await axios.post('/auth/logout')
        //     setUser(null)
        // } catch (err) {
        //     console.log(err)
        // }
    }
    //handle and convert it in base 64
    const handleImage = (e) => {
        const file = e.target.files[0]
        setFileToBase(file)
    }

    const setFileToBase = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImg(reader.result)
        }
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
            <div style={{ marginTop: '100px' }}>
                <h1>Thêm coffe mới </h1>
                <h2>{err}</h2>
                <>
                    <Form onSubmit={handleSubmit} className="add-book">
                        <Form.Group className="mb-3">
                            <Form.Label>Tên Coffe</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Tên Coffe"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Loại Coffe</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Loại Coffe"
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Số lượng</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Số lượng"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Thông tin thêm</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Thông tin thêm"
                                onChange={(e) => setDes(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Giá</Form.Label>
                            <Form.Control type="text" placeholder="Giá" onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ảnh Coffe</Form.Label>
                            <Form.Control type="file" onChange={handleImage} />
                            <img className="img-fluid" src={img} alt="" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Thêm
                        </Button>
                    </Form>
                </>
            </div>
            <div id="footer">
                <div class="row">
                    <div class="contact-item col-sm-3">
                        <img
                            src="https://media.istockphoto.com/id/1267680005/vi/vec-to/h%C3%ACnh-minh-h%E1%BB%8Da-thi%E1%BA%BFt-k%E1%BA%BF-vector-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-c%E1%BB%91c-c%C3%A0-ph%C3%AA-vector-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-t%C3%A1ch-c%C3%A0-ph%C3%AA-%C4%91%C6%B0%E1%BB%A3c-c%C3%B4.jpg?s=612x612&w=0&k=20&c=8-isfW0Ix8T1G8bIBfHVmHCg914715Fw_GQDFz9NlDE="
                            alt=""
                        />
                        <div class="social">
                            <i class="bx bxl-facebook"></i>
                            <i class="bx bxl-google"></i>
                            <i class="bx bxl-instagram"></i>
                            <i class="bx bxl-tiktok"></i>
                            <i class="bx bxl-youtube"></i>
                        </div>
                    </div>
                    <div class="contact-item col-sm-3">
                        <p>Giới thiệu</p>
                        <ul>
                            <li>
                                <a href="">Về coffe Shop</a>
                            </li>
                            <li>
                                <a href="">Tuyển dụng</a>
                            </li>
                            <li>
                                <a href="">Hệ thống cửa hàng</a>
                            </li>
                        </ul>
                    </div>
                    <div class="contact-item col-sm-3">
                        <p>Dịch vụ khách hàng</p>
                        <ul>
                            <li>
                                <a href="">Chính sách điều khoản</a>
                            </li>
                            <li>
                                <a href="">Hướng dẫn mua hàng</a>
                            </li>
                            <li>
                                <a href="">Chính sách thanh toán</a>
                            </li>
                            <li>
                                <a href="">Chính sách đổi trả</a>
                            </li>
                            <li>
                                <a href="">Chính sách bảo hành</a>
                            </li>
                            <li>
                                <a href="">Chính sách vận chuyển</a>
                            </li>
                        </ul>
                    </div>
                    <div class="contact-item col-sm-3">
                        <p>Liên hệ</p>
                        <ul>
                            <li>
                                <a href="">Hotline</a>
                            </li>
                            <li>
                                <a href="">Email</a>
                            </li>
                            <li>
                                <a href="">Live Chat</a>
                            </li>
                            <li>
                                <a href="">Messenger</a>
                            </li>
                            <li>
                                <a href="">Liên hệ</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addcoffe

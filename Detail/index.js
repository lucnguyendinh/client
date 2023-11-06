import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'
import createAxios from '../../config/createInstance'
import { logOutUser } from '../../redux/Api/apiRequest'
import Form from 'react-bootstrap/Form'

const Detail = ({ user, setUser }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [coffe, setCoffe] = useState(null)
    const [comment, setComment] = useState(null)
    const [text, setText] = useState('')
    const [deleteB, setDeleteB] = useState(false)
    const [soluong, setSoluong] = useState(0)
    const [sdt, setSdt] = useState('')
    const [address, setAddress] = useState('')
    const [size, setSize] = useState('S')
    const [err, setErr] = useState('')
    const { id } = useParams()
    const axiosJWT = createAxios(user, setUser)
    useEffect(() => {
        !user && navigate('/login')
    }, [navigate, user])
    useEffect(() => {
        const getCoffe = async () => {
            try {
                const res = await axiosJWT.get(`/coffe/detail/${id}`, {
                    headers: { token: `Bearer ${user?.accessToken}` },
                })
                setCoffe(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getCoffe()
    }, [id])
    useEffect(() => {
        const getComment = async () => {
            try {
                const res = await axios.get(`/comment/${id}`)
                setComment(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getComment()
    }, [id])

    const handleSumbit = (e) => {
        e.preventDefault()
        const comment = async () => {
            try {
                const newComment = {
                    idCoffe: id,
                    sender: user.user._id,
                    text,
                }

                const res = await axiosJWT.post('/comment/comment', newComment, {
                    headers: { token: `Bearer ${user?.accessToken}` },
                })
                setComment((pre) => [...pre, res.data])
                setText('')
            } catch (error) {
                console.log(error)
            }
        }
        comment()
    }
    const handleDelete = async () => {
        try {
            await axiosJWT.delete(`/coffe/delete/${id}`, {
                headers: { token: `Bearer ${user?.accessToken}` },
            })
            navigate('/home1')
        } catch (error) {
            setErr(error.response.data)
        }
    }
    const addToCard = async () => {
        try {
            const newCart = {
                soluong,
                size,
                price: soluong * coffe?.price,
                sdt,
                address,
                user: user?.user?._id,
                coffe: id,
            }
            await axios.post('/cart/addcart', newCart)
            navigate('/home1')
        } catch (err) {
            console.log(err)
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
                        {user?.user?.admin && (
                            <li>
                                Admin
                                <i class="bx bx-chevron-down"></i>
                                <ul class="menu">
                                    <div class="list-menu">
                                        <div class="item-list-menu">
                                            <h3>
                                                <a href="">Coffe</a>
                                            </h3>
                                            <ul>
                                                <li>
                                                    <Link to="/addcoffe">Thêm coffe mới</Link>
                                                    <Link to={`/editcoffe/${id}`}>Sửa coffe</Link>
                                                    <Link onClick={() => setDeleteB(true)}>Xoá coffe</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </ul>
                            </li>
                        )}
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
            {/* // */}
            
                    <div className="size">
                        <h2>Size</h2>
                        <Form.Select aria-label="Default select example" onChange={(e) => setSize(e.target.value)}>
                            <option value="S">S</option>
                            <option value="M">M 10%</option>
                            <option value="L">L 20%</option>
                        </Form.Select>
                    </div>
                    <div className="sdt">
                        <h2>Số điện thoại</h2>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Số điện thoại"
                                value={sdt}
                                onChange={(e) => setSdt(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="address">
                        <h2>Địa chỉ nhận hàng</h2>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Địa chỉ"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="gia">Thành tiền: {soluong * coffe?.price} VNĐ</div>
                    <Button
                        variant="outline-primary"
                        onClick={() => {
                            if (soluong > 0) {
                                addToCard()
                            }
                        }}
                    >
                        Mua ngay
                    </Button>
                </div>
                <div className="chat">
                    <div className="chat-content">
                        <div className="item-chat">
                            {comment?.map((c, index) => {
                                return (
                                    <p key={index}>
                                        {c?.sender?.username}: {c?.text}
                                    </p>
                                )
                            })}
                        </div>
                    </div>
                    <form onSubmit={handleSumbit} className="send">
                        <input type="text" onChange={(e) => setText(e.target.value)} value={text} />
                        <Button onClick={handleSumbit} variant="primary">
                            Send
                        </Button>
                    </form>
                </div>
            </div>
            {deleteB && (
                <div className="modal show" style={{ display: 'block', position: 'fixed' }}>
                    <Modal.Dialog>
                        <Modal.Header closeButton onClick={() => setDeleteB(false)}>
                            <Modal.Title>Bạn có chắc không ?</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Bạn có thật sự muốn xoá {coffe?.name} không ?.</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setDeleteB(false)}>
                                Close
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Xoá
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            )}
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
                                <a href="">Về Coffe Shop</a>
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

export default Detail

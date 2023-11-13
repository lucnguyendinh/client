import axios from 'axios'
import '../../style.css'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import createAxios from '../../config/createInstance'
import { logOutUser } from '../../redux/Api/apiRequest'
import { useDispatch } from 'react-redux'

const Home1 = ({ user, setUser }) => {
    const dispatch = useDispatch()
    const [coffe, setCoffe] = useState(null)
    const [category, setCategory] = useState(null)
    const [find, setFind] = useState('')
    const [list, setList] = useState(null)
    const navigate = useNavigate()
    let axiosJWT = createAxios(user, setUser)
    useEffect(() => {
        !user && navigate('/login')
    }, [navigate, user])
    useEffect(() => {
        getCoffe()
        getCategory()
    }, [])
    useEffect(() => {
        const findCoffe = async () => {
            try {
                const res = await axios.get(`/coffe/${find}`)
                setList(res.data)
            } catch (error) {
                console.log(console.error)
            }
        }

        find.length > 0 ? findCoffe() : setList(null)
    }, [find])
    const handleClick = async () => {
        logOutUser(dispatch, navigate, user?.user?._id)
        // try {
        //     await axios.post('/auth/logout')
        //     setUser(null)
        // } catch (err) {
        //     console.log(err)
        // }
    }
    const getCoffe = async () => {
        try {
            const res = await axiosJWT.get('/coffe', {
                headers: { token: `Bearer ${user?.accessToken}` },
            })
            setCoffe(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getCategory = async () => {
        try {
            const res = await axios.get('/coffe/category')
            setCategory(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    const getCoffeByCategory = async (c) => {
        try {
            const res = await axios.get(`/coffe/findtocategory/${c}`)
            setCoffe(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div id="main">
            {/* <!-- Header --> */}
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
                    <div class="search">
                        <i class="bx bx-search"></i>
                        <input
                            type="text"
                            onChange={(e) => setFind(e.target.value)}
                            onBlur={() => setFind('')}
                            placeholder="Tìm kiếm sản phẩm?"
                        />
                        {list && (
                            <div class="list-group list-book">
                                {list?.map((l, i) => {
                                    return (
                                        <Link
                                            key={i}
                                            to={`/detail/${l._id}`}
                                            class="list-group-item list-group-item-action search-item"
                                        >
                                            <div class="d-flex w-100 justify-content-between">
                                                <h5 class="mb-1">{l.name}</h5>
                                                <small>{l.author}</small>
                                            </div>
                                            <p class="mb-1">{l.des}</p>
                                            <small>{l.price} đ</small>
                                        </Link>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                    <div class="actions">
                        <Link to="/hoadon">
                            <i class="bx bxs-shopping-bag cart-header">{user?.user?.username}</i>
                        </Link>
                        <i class="bx bxs-user" onClick={handleClick}>
                            Đăng xuất
                        </i>
                    </div>
                </div>
            </div>
            {/* <!-- End Header --> */}

            {/* <!-- Slider --> */}
            <div id="slider">
                <img
                    src="https://img.freepik.com/free-vector/top-view-cup-coffee-with-roasted-beans_52683-32340.jpg"
                    alt="Slider"
                />
            </div>
            {/* <!-- End Slider --> */}

            {/* <!-- Content --> */}
            <div id="content">
                {/* <!-- Sales --> */}
                <div class="home-sales">
                    <div class="header-content">
                        <div class="title">Danh Sách sản phẩm</div>
                        <div class="filter-btn">
                            <select
                                class="form-select"
                                className="select-category"
                                aria-label="Default select example"
                                onChange={(e) => getCoffeByCategory(e.target.value)}
                            >
                                <option selected>all</option>
                                {category?.map((c, i) => {
                                    return <option key={i}>{c}</option>
                                })}
                            </select>
                            <i class="bx bx-filter-alt"></i>
                        </div>
                    </div>

                    <div class="row">
                        {coffe?.map((b) => {
                            if (b?.quantity !== 0) {
                                return (
                                    <div class="sale-item col-md-2 col-xs-12 item-card">
                                        <div className="img">
                                            <Link to={`/detail/${b._id}`}>
                                                {' '}
                                                <img src={b?.img} alt="Sale" />
                                            </Link>
                                        </div>
                                        <div class="info-item">
                                            <div class="name-item">{b?.name}</div>
                                            <div class="price">
                                                <span class="sale-price">
                                                    {b?.price} VNĐ
                                                    <span>{(b?.price * 120) / 100}</span>
                                                </span>
                                                <i class="bx bx-shopping-bag"></i>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
            {/* <!-- End Content --> */}

            {/* <!-- Footer --> */}
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
            {/* <!-- End Footer --> */}
        </div>
    )
}

export default Home1

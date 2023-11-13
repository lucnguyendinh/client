import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link, useNavigate } from 'react-router-dom'

import '../../styles.css'
import { useEffect, useState } from 'react'
import createAxios from '../../config/createInstance'
import axios from 'axios'

const Home = ({ user, setUser }) => {
    const [books, setBooks] = useState(null)
    const [category, setCategory] = useState(null)
    const [find, setFind] = useState('')
    const [list, setList] = useState(null)
    const navigate = useNavigate()
    let axiosJWT = createAxios(user, setUser)
    useEffect(() => {
        !user && navigate('/login')
    }, [navigate, user])
    useEffect(() => {
        getBook()
        getCategory()
    }, [])
    useEffect(() => {
        const findBook = async () => {
            try {
                const res = await axios.get(`/coffe/${find}`)
                setList(res.data)
            } catch (error) {
                console.log(console.error)
            }
        }

        find.length > 0 ? findBook() : setList(null)
    }, [find])
    const handleClick = async () => {
        try {
            await axios.post('/auth/logout')
            setUser(null)
        } catch (err) {
            console.log(err)
        }
    }
    const getBook = async () => {
        try {
            const res = await axiosJWT.get('/coffe', {
                headers: { token: `Bearer ${user?.accessToken}` },
            })
            setBooks(res.data)
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
    const getBookByCategory = async (c) => {
        try {
            const res = await axios.get(`/coffe/findtocategory/${c}`)
            setBooks(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand>
                        <Link to="/" style={{ color: '#000' }}>
                            Book Store
                        </Link>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav>
                            {user?.user?.admin && <Link to="/addbook">Thêm sách</Link>}
                            <div class="find-book">
                                <input onChange={(e) => setFind(e.target.value)} placeholder="Tìm sách" />
                                <div class="list-group list-book">
                                    {list?.map((l, i) => {
                                        return (
                                            <Link
                                                key={i}
                                                to={`/detail/${l._id}`}
                                                class="list-group-item list-group-item-action"
                                            >
                                                <div class="d-flex w-100 justify-content-between">
                                                    <h5 class="mb-1">{l.name}</h5>
                                                    <small>{l.author}</small>
                                                </div>
                                                <p class="mb-1">{l.des}</p>
                                                <small>{l.price}</small>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                            <select
                                class="form-select"
                                className="select-category"
                                aria-label="Default select example"
                                onChange={(e) => getBookByCategory(e.target.value)}
                            >
                                <option selected>all</option>
                                {category?.map((c, i) => {
                                    return <option key={i}>{c}</option>
                                })}
                            </select>
                        </Nav>
                    </Nav>
                    <Nav className="me">
                        <Nav.Link>{user?.user.username}</Nav.Link>
                        <Nav.Link onClick={handleClick}>Đăng xuất</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            {/* // */}
            <div className="item-book">
                {books?.map((b) => {
                    return (
                        <div className="card1" key={b._id}>
                            <Card style={{ width: '18rem' }} className="book">
                                <Card.Img className="img-book" variant="top" src={b.img} />
                                <Card.Body>
                                    <Card.Title>{b.name}</Card.Title>
                                    <Card.Text>{b.des}</Card.Text>
                                    <Button variant="light">
                                        <Link to={`/detail/${b._id}`}>Xem Chi Tiết</Link>
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Home

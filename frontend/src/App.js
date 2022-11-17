import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'

import ProductView from './views/ProductView'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { LinkContainer } from 'react-router-bootstrap'
import HomeView from './views/HomeView'
import LoginView from './views/LoginView'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

function App() {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() =>{
    const result = JSON.parse(localStorage.getItem('userInfo'))
    setUserInfo(result)
  }, [])

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
  };
  

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand> Drink Free </Navbar.Brand>
              </LinkContainer>
              <Nav>
                {console.log(userInfo)}
                {userInfo ? (
                  <Navbar.Text className='out-link'>
                    {userInfo.name} <NavLink onClick={logoutHandler} to="/login">LogOut</NavLink>
                  </Navbar.Text>
                ) : (
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/product/:slug" element={<ProductView />} />
              <Route path="/" element={<HomeView />} />
              <Route path="/login" element={<LoginView />} />
            </Routes>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

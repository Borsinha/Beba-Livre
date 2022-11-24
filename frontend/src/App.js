import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import ProductView from './views/products/ProductView';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import SignUpView from './views/SignUpView';
import ProductsIndex from './views/products/Index';
import ProductsStore from './views/products/Store';
import ProductsUpdate from './views/products/Update';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';

function App() {
  const [userInfo, setUserInfo] = useState([]);
  if (!localStorage.getItem('userInfo')) {
    localStorage.setItem('userInfo', JSON.stringify({ _id: 'off' }));
  }

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem('userInfo'));
    setUserInfo(result);
  }, []);

  function refreshPage() {
    window.location.reload(false);
  }

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    refreshPage();
  };

  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand> Drink Free </Navbar.Brand>
              </LinkContainer>
              <Nav>
                {userInfo._id !== 'off' ? (
                  <NavDropdown title={userInfo.name} id="admin-nav-dropdown">
                    <LinkContainer to="/products/Index">
                      <NavDropdown.Item>Produtos</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer onClick={logoutHandler} to="/login">
                      <NavDropdown.Item>Sair</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
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
              <Route path="/signup" element={<SignUpView />} />
              <Route path="/products/index" element={<ProductsIndex />} />
              <Route path="/products/store" element={<ProductsStore />} />
              <Route
                path="/product/update/:productId"
                element={<ProductsUpdate />}
              />
            </Routes>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

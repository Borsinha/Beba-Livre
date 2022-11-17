import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProductView from "./views/ProductView";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import HomeView from "./views/HomeView";
import LoginView from './views/LoginView';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand> Drink Free </Navbar.Brand>
              </LinkContainer>
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
  );
}

export default App;

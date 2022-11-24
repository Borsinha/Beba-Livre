import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useState } from 'react';

export default function LoginView() {
  const navigate = useNavigate();
  console.log(JSON.parse(localStorage.getItem('userInfo'))._id);
  if (JSON.parse(localStorage.getItem('userInfo'))._id !== 'off') {
    navigate('/');
  }
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  function refreshPage() {
    window.location.reload(false);
  }

  const login = async (e) => {
    e.preventDefault();
    localStorage.removeItem('userInfo');
    try {
      const { data } = await axios.post('/api/users/login', {
        user,
        password,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      console.log(JSON.parse(localStorage.getItem('userInfo'))._id);
      refreshPage();
      navigate('/');
    } catch (error) {
      alert('Usuário ou senha incorretos!');
    }
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <h1 className="my-3">Login</h1>
      <Form onSubmit={login}>
        <Form.Group className="mb-3" controlId="user">
          <Form.Label>Usuário</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button variant="warning" type="submit">
            Login
          </Button>
        </div>
        <div className="mb-3">
          <Link to={'/signup'}>Cadastrar-se</Link>
        </div>
      </Form>
    </Container>
  );
}

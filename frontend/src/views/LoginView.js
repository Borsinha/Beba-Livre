import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import {useState} from 'react';


export default function LoginView() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const[user, setUser] = useState('');
  const[password, setPassword] = useState('');
  



  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/login', {
        user,
        password,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');

    } catch (error) {
      alert("Usuário ou senha incorretos!")
    }
  }

  return (
    <Container className="small-container">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <h1 className="my-3">Login</h1>
      <Form onSubmit={loginHandler}>
        <Form.Group className="mb-3" controlId="user">
          <Form.Label>Usuário</Form.Label>
          <Form.Control type="text" required onChange={(e) => setUser(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Senha</Form.Label>
          <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        <div className="mb-3">
          <Button variant="warning" type="submit">Login</Button>
        </div>
        <div className="mb-3">
          <Link to={`/Logged?redirect=${redirect}`}>Cadastrar-se</Link>
        </div>
      </Form>
    </Container>
  );
}
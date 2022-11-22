import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import Axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getError } from '../utils';

export default function SignUpView() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //   const submit = async (e) => {
  //     e.preventDefault();
  //     console.log(
  //       'NAME: ' +
  //         name +
  //         ' USER: ' +
  //         user +
  //         ' PASSWORD: ' +
  //         password +
  //         ' CPASSWORD: ' +
  //         confirmPassword
  //     );
  //     if (password !== confirmPassword) {
  //       toast.error('Passwords do not match');
  //       return;
  //     }
  //     try {
  //       const { data } = await Axios.post('/api/users/signup', {
  //         name,
  //         user,
  //         password,
  //       });
  //       localStorage.setItem('userInfo', JSON.stringify(data));
  //       navigate('/');
  //     } catch (error) {
  //       alert('Usuário ou senha incorretos!');
  //     }
  //   };

  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Senhas não coincidem');
      return;
    }
    try {
      const { data } = await Axios.post('/api/users/signup', {
        name,
        user,
        password,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control onChange={(e) => setName(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="user">
          <Form.Label>Usuário</Form.Label>
          <Form.Control
            type="name"
            required
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Enviar</Button>
        </div>
        <div className="mb-3">
          Já possui uma conta? <Link to={'/login'}>Logar</Link>
        </div>
      </Form>
    </Container>
  );
}

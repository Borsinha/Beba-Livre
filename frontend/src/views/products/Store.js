import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getError } from '../../utils';
import { ToggleButton } from 'react-bootstrap';

export default function Store() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [onSale, setOnSale] = useState('1');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');

  const radios = [
    { name: 'Sim', value: '1' },
    { name: 'Não', value: '0' },
  ];

  useEffect(() => {
    setUser(userInfo._id);
  });

  function handleImage(e) {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post('/api/products/store', {
        name,
        onSale,
        slug,
        price,
        type,
        image,
        user,
      });
      toast(data);
      navigate('/');
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Cadastro de Produto</title>
      </Helmet>
      <h1 className="my-3">Cadastrar Produto</h1>
      <Form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control onChange={(e) => setName(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Produto a Venda</Form.Label>
        </Form.Group>
        <Form.Group className="d-flex gap-2">
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={idx % 2 ? 'outline-danger' : 'outline-success'}
              name="radio"
              value={radio.value}
              checked={onSale === radio.value}
              onChange={(e) => setOnSale(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </Form.Group>
        <Form.Group>
          <Form.Label> </Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="slug">
          <Form.Label>slug</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setSlug(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Preço R$:</Form.Label>
          <Form.Control
            type="Number"
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="type">
          <Form.Label>Tipo de Bebida: </Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setType(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="d-flex gap-2">
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" required onChange={handleImage} />
          </Form.Group>
        </Form.Group>
        <div className="d-flex gap-2">
          <Button type="submit">Enviar</Button>
          <Link to="/products/index">
            <Button variant="secondary">Cancelar</Button>
          </Link>
        </div>
      </Form>
    </Container>
  );
}

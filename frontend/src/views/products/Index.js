import axios from 'axios';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faTrash,
  faEdit,
  faCheck,
  faX,
  faAdd,
} from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/esm/Container';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../../utils';

export default function Index() {
  //const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/products/index');
      setProducts(result.data);
    };
    fetchData();
  }, []);

  function refreshPage() {
    window.location.reload(false);
  }

  const deleteHandler = async (productId) => {
    console.log(productId);
    try {
      await axios.delete(`/api/products/${productId}`);
      toast('Produto excluido com sucesso!');
      refreshPage();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <Container>
      <Table bordered hover variant="dark">
        <thead>
          <tr>
            <th>
              {' '}
              <Link to="/products/store">
                <Button variant="light">
                  <FontAwesomeIcon icon={faAdd} /> Adicionar
                </Button>
              </Link>
            </th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Tipo</th>
            <th>A Venda</th>
            <th>Acões</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter((product) => product.user === user._id)
            .map((value, index) => (
              <tr key={index}>
                <td>{value.name}</td>
                <td>R${value.price}</td>
                <td>{value.type}</td>
                <td>
                  {value.onSale ? (
                    <Button disabled variant="success">
                      <FontAwesomeIcon icon={faCheck} />
                    </Button>
                  ) : (
                    <Button disabled variant="danger">
                      <FontAwesomeIcon icon={faX} />
                    </Button>
                  )}
                </td>
                <td>
                  <Link to={`/product/update/${value._id}`}>
                    <Button variant="warning">
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>{' '}
                  </Link>
                  <Button
                    onClick={() => deleteHandler(value._id)}
                    variant="danger"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}

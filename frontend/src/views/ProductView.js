import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Helmet } from 'react-helmet-async';

function Product() {
  const params = useParams();
  const { slug } = params;

  //get data from api/server
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/api/products/slug/${slug}`);
      setProduct(result.data);
    };
    fetchData();
  }, [slug]);

  console.log(product);

  return (
    <div>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <Row>
        <Col md="5">
          <img className="img-large" src={product.image} alt={product.name} />
        </Col>
        <Col md="3">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>Preço: R$ {product.price}</ListGroup.Item>
            <ListGroup.Item>{product.type}</ListGroup.Item>
          </ListGroup>
          <ListGroup>
            <ListGroup.Item>
              <div>
                <Button variant="warning">Carrinho</Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md="3"></Col>
      </Row>
    </div>
  );
}
export default Product;

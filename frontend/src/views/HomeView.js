import { useEffect, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';

function HomeView() {
  //get data from api/server
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/products/index');
      setProducts(result.data);
    };
    fetchData();
  }, []);

  //list products
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <h1>Lista de Produtos</h1>
      <div className="products">
        <Row sm={6} md={4} lg={3} className="mb-3">
          {products
            .filter((product) => product.user === user._id)
            .map((filteredProduct) => (
              <Col key={filteredProduct.slug}>
                <Product product={filteredProduct}></Product>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}
export default HomeView;

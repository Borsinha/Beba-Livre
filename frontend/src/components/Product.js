import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Product(props) {
  const { product } = props;
  return (
    <Card className="card-img">
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text>R${product.price}</Card.Text>
        <Button variant="warning">Carrinho</Button>
      </Card.Body>
    </Card>
  );
}
export default Product;

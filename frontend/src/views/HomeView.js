import { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";


function HomeView() {

    //get data from api/server
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("/api/products");
            setProducts(result.data);
        };
        fetchData();
    }, []);

    console.log(products);

    //list products
    return (
        <div>
            <h1>Lista de Produtos</h1>
            <div className="products">
                <Row sm={6} md={4} lg={3} className="mb-3">
                    {products.map((product) => (
                        <Col key={product.slug}>
                            <Product product={product}></Product>
                        </Col>
                    ))} 
                </Row>
            </div>
        </div>
    );
}
export default HomeView;

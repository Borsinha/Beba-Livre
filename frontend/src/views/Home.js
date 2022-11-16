import { Link } from "react-router-dom"
import data from "../data"

function Home() {
    return (
        <div>
            <h1>Lista de Produtos</h1>
            <div className="products">
                {data.products.map((product) => (
                    <div className="product" key={product.slug}>
                        <Link to={`/product/${product.slug}`}>
                            <img src={product.image} alt={product.name}></img>
                        </Link>

                        <div className="product-info">
                            <Link to={`/product/${product.slug}`}>
                                <p>{product.name}</p>
                            </Link>

                            <p>
                                <strong>R${product.price}</strong>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Home

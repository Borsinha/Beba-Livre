
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import Product from './views/Product'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <Link to="/"> Drink Free </Link>
        </header>
        <Routes>
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

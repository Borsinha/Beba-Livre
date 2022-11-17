import express from "express";
import data from "./data.js";

const app = express();

app.get('/api/products', (req, res) => {
    let products = data.products;
    products.forEach(element => {
        if(element.onSale == 0){
            products.pop(element);
        }
    });
    res.send(products)
});

app.get('/api/products/slug/:slug', (req, res) => {
    let product = data.products.find(x => x.slug === req.params.slug);
    res.send(product)
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server on http://localhost:${port}`)
});
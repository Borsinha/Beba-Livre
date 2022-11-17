import express from 'express';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

productRouter.get("/slug/:slug", async (req, res) => {
    const product = await Product.findOne({ slug: { $eq: req.params.slug } });
  
      res.send(product);
  });
productRouter.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.send(product);
});

export default productRouter;
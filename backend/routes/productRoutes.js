import express from 'express';
import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';

const productRouter = express.Router();

productRouter.get('/index', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: { $eq: req.params.slug } });

  res.send(product);
});
productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.send(product);
});

productRouter.post(
  '/store',
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product({
      name: req.body.name,
      onSale: req.body.onSale,
      slug: req.body.slug,
      price: req.body.price,
      type: req.body.type,
      image: '/images/jack-single-750ml.jpg',
      user: req.body.user,
    });
    const product = await newProduct.save();
  })
);

export default productRouter;

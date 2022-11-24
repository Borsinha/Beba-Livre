import express from 'express';
import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import streamfier from 'streamifier';

const productRouter = express.Router();
dotenv.config();

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
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    try {
      const file = req.body.image;
      const uploadedResponse = await cloudinary.uploader.upload(file, {
        upload_preset: 'frkyaww8',
      });
      console.log(uploadedResponse.url);

      const newProduct = new Product({
        name: req.body.name,
        onSale: req.body.onSale,
        slug: req.body.slug,
        price: req.body.price,
        type: req.body.type,
        image: uploadedResponse.url,
        user: req.body.user,
      });
      await newProduct.save();
      res.send('Produto cadastrado com sucesso!');
    } catch (error) {
      console.error(error);
    }
  })
);

productRouter.put(
  '/update/:id',
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    product.name = req.body.name;
    product.onSale = req.body.onSale;
    product.slug = req.body.slug;
    product.price = req.body.price;
    product.type = req.body.type;
    await product.save();
    res.send({ message: 'Produto atualizado com sucesso!' });
  })
);

productRouter.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      await product.remove();
      res.send({ message: 'Produto deletado' });
    } else {
      res.status(404).send({ message: 'Produto não encontrado!' });
    }
  })
);

export default productRouter;

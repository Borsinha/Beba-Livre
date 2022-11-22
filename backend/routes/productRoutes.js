import express from 'express';
import Product from '../models/productModel.js';

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

// userRouter.post(
//     '/signup',
//     expressAsyncHandler(async (req, res) => {
//       const newUser = new User({
//         name: req.body.name,
//         user: req.body.user,
//         password: bcrypt.hashSync(req.body.password),
//       });
//       const user = await newUser.save();
//       res.send({
//         _id: user._id,
//         name: user.name,
//         user: user.user,
//         token: createToken(user),
//       });
//     })
//   );

export default productRouter;

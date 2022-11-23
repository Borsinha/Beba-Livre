import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    onSale: { type: Number, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    image: { type: String, required: true },
    user: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;

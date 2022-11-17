import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seed from './routes/seed.js';
import productRouter from './routes/productRoutes.js';
import userRouter from "./routes/userRoutes.js";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('Connection Success with MONGO')
}).catch((err) => {
    console.log(err.message);
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seed);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

//error express
app.use((err, req, res, next) =>{
    res.status(500).send({message: err.message});
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server on http://localhost:${port}`)
});
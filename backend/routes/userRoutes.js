import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { createToken } from '../utils.js';

const userRouter = express.Router();

userRouter.post(
    '/login',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ user: req.body.user });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    user: user.user,
                    token: createToken(user),
                });
                return;
            }
        }
        res.status(401).send({ message: 'Usuário ou senha inválidos' });
    })
);

export default userRouter;
import jwt from 'jsonwebtoken';

export const createToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      user: user.user,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '600s',
    }
  );
};
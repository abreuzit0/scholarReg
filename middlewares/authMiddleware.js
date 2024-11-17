import jwt from 'jsonwebtoken';

export const autenticar = (req, res, next) => {
  const token = req.header('authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado' });
  }

  try {
    const check = jwt.verify(token, process.env.JWT_SECRET);
    req.user = check;
    console.log(req.user);
    next();

  } catch (err) {
    res.status(401).json({ message: 'Token invalido' });
  }
};
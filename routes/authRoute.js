import express from 'express';
import { registrarUsuario, login } from '../controllers/authController.js';
import { autenticar } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registrarUsuario);
router.post('/login', login);

// Teste de rota protegida
router.get('/protected', autenticar, (req, res) => {
  res.status(200).json({ message: 'Access granted', user: req.user });
});

export default router;

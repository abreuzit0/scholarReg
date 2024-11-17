import express from 'express';
import { matricular, listarOfertas } from '../controllers/matriculaController.js';
import { autenticar } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/ofertas', autenticar, listarOfertas);
router.post('/matricular', autenticar, matricular);

export default router;

import express from 'express';
import { matricular, listarOfertas } from '../controllers/matriculaController.js';

const router = express.Router();

router.get('/ofertas', listarOfertas);
router.post('/matricular', matricular);

export default router;

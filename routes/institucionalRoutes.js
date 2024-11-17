import express from 'express';
import { criarOferta, listarAlunos } from '../controllers/ofertaController.js';
import { autenticar } from '../middlewares/authMiddleware.js';
import { listarOfertas } from '../controllers/matriculaController.js';

const router = express.Router();

router.get('/alunos', autenticar, listarAlunos);
router.get('/ofertas', autenticar, listarOfertas);
router.post('/criarofertas', autenticar, criarOferta);

export default router;

import express from 'express';
import { criarOferta, listarAlunos } from '../controllers/ofertaController.js';
import { listarOfertas } from '../controllers/matriculaController.js';

const router = express.Router();

router.get('/alunos', listarAlunos);
router.get('/ofertas', listarOfertas);
router.post('/criarofertas', criarOferta);

export default router;
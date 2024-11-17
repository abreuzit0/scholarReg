import express from 'express';
import dotenv from 'dotenv';
import institucionalRoutes from './routes/institucionalRoutes.js';
import estudanteRoutes from './routes/estudanteRoutes.js';
import authRoutes from './routes/authRoute.js'

dotenv.config();

const app = express();
app.use(express.json());

// Definir rotas
app.use('/api/aluno', estudanteRoutes);
app.use('/api/institucional', institucionalRoutes)
app.use('/api/auth', authRoutes);

app.listen(3000, () => { console.log("Aplicação rodando na porta 3000.") });
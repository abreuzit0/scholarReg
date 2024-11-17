import express from "express";
import dotenv from "dotenv";
import institucionalRoutes from "./routes/institucionalRoutes.js";
import estudanteRoutes from "./routes/estudanteRoutes.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";

dotenv.config();

const app = express();

// Configurar o CORS para permitir requisições de localhost:5173
const corsOptions = {
  origin: "http://localhost:5173", // Permite apenas o frontend rodando em localhost:5173
  methods: "GET, POST, PUT, DELETE", // Métodos permitidos
  allowedHeaders: "Content-Type, Authorization", // Cabeçalhos permitidos
};

app.use(cors(corsOptions));
app.use(express.json());

// Definir rotas
app.use("/api/aluno", estudanteRoutes);
app.use("/api/institucional", institucionalRoutes);
app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("Aplicação rodando na porta 3000.");
});

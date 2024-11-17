import knex from 'knex';
import knexfile from '../db/knexfile.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const dbConn = knex(knexfile);

// Função para criar um usuário (Admin, Professor ou Aluno)
export const registrarUsuario = async (req, res) => {
  const { nome, email, senha, tipo } = req.body;
  const { emailFromDb } = await dbConn('usuarios').where('email', email).select('email');
  
  try {
    // Verifica se o email já está registrado
    if (emailFromDb == email) {
      return res.status(400).json({ message: 'Email já registrado.' });
    }
    // Hash da senha
    const hashedSenha = bcrypt.hashSync(senha, 10);
    // Criar o usuário base
    await dbConn('usuarios').insert({
        nome: nome,
        email: email,
        senha: hashedSenha,
        tipo: tipo
    });

    res.status(201).json({ message: `Usuário ${tipo} registrado com sucesso.` });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erro ao registrar usuário.', error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, senha } = req.body;
  
  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    const usuario = await dbConn('usuarios').where({ email }).first();

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Gerar token JWT
    const token = jwt.sign({ id: usuario.id, role: usuario.tipo }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token, tipo: usuario.tipo });

  } catch (error) {
      res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};
import knex from 'knex';
import knexfile from '../db/knexfile.js';

const dbConn = knex(knexfile);

export const criarOferta = async (req, res) => {
    const { nomeTurma, nomeProf, turno } = req.body;

    console.log(nomeTurma, nomeProf, turno);
    const novaOferta = await dbConn('turmas').insert({
        nomeTurma: nomeTurma,
        nomeProf: nomeProf, 
        turno: turno
    });
    res.json({message: 'Oferta de turma criada com sucesso!'});
};

export const listarOfertas = async (req, res) => {
    const listaTurmas = await dbConn('turmas');
    console.log(listaTurmas);
    res.json(listaTurmas);
};

export const listarAlunos = async (req, res) => {
    try {
        const lista = await dbConn('usuarios').where('tipo', 'aluno').select('nome', 'email', 'tipo');
        console.log(lista);
        res.json(lista)
    } catch (error) {

    }
};
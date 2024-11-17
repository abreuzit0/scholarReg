import knex from 'knex';
import knexfile from '../db/knexfile.js';

const dbConn = knex(knexfile);

export const matricular = async (req, res) => {
    const { idAluno, idTurma } = req.body;

    console.log(idAluno, idTurma);
    const mat = await dbConn('aluno_turmas').insert({
        idAluno: idAluno, 
        idTurma: idTurma
    });
    res.json({message: 'Aluno matriculado com sucesso!'})
};

export const listarOfertas = async (req, res) => {
    const listaTurmas = await dbConn('turmas');
    console.log(listaTurmas);
    res.json(listaTurmas);
};

export const contagemAlunos = async (req, res) => {
    const contagem = await dbConn('aluno_turmas').count('idAluno').groupBy('idTurma');
    res.json(contagem);
}
import knex from "knex";
import knexfile from "../db/knexfile.js";

const dbConn = knex(knexfile);

export const matricular = async (req, res) => {
  const { idTurma } = req.body;

  console.log("Matrícula solicitada para a turma:", idTurma);

  try {
    const idAluno = "1";
    await dbConn("aluno_turmas").insert({
      idAluno: idAluno,
      idTurma: idTurma,
    });

    await dbConn("turmas").where("id", idTurma).update({ isEnrolled: true });

    res.json({ message: "Aluno matriculado com sucesso!" });
  } catch (error) {
    console.error("Erro ao matricular o aluno:", error);
    res
      .status(500)
      .json({ message: "Erro ao matricular. Tente novamente mais tarde." });
  }
};

export const listarOfertas = async (req, res) => {
  const listaTurmas = await dbConn("turmas");
  console.log("aqui", listaTurmas);
  res.json(listaTurmas);
};

export const contagemAlunos = async (req, res) => {
  const contagem = await dbConn("aluno_turmas")
    .count("idAluno")
    .groupBy("idTurma");
  res.json(contagem);
};

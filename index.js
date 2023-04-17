
const express = require("express");
const alunos = require("./alunos");
const fs = require("fs");
const db = require("./db/db.json");

const app = express();

app.get("/alunos", (req, res) => {
    //Desestruturando variáveis da query e declarando variáveis
    const { nome, media } = req.query;
    alunos.alunos = db;
    const mostrarAlunos = [];

    //verificação se existe alunos no Array
    if(alunos.alunos){
        //verificação se existe query de nome para filtragem
        if(nome && nome !== ""){
            //verificação se existe query de media depois do nome para filtragem
            if(media && media >= 0) {
                //filtrando nome e nota
                let e = alunos.filtrarAlunoNomeNota(nome, media)
                e.forEach((aluno) => {
                    mostrarAlunos.push(aluno);
                });
            }else{
                //filtrando nome
                let e = alunos.filtrarAlunoNome(nome)
                e.forEach((aluno) => {
                    mostrarAlunos.push(aluno);
                });
            }
        //verificação se existe ao menos a query de media para filtragem
        }else if(media && media >= 0){
            //filtrando nome e nota
            let e = alunos.filtrarAlunoNota(media)
                e.forEach((aluno) => {
                    mostrarAlunos.push(aluno);
                });
        }else{
            //salvar na variável mostrar alunos os alunos que pelo menos constam em "alunos"
            alunos.alunos.forEach((aluno) => {
                mostrarAlunos.push(aluno);
            });
        }
        res.json(mostrarAlunos);
    }else{
        res.status(404).json({ message:"Não foi possível encontrar nenhu aluno para mostrar"});
    }
    res.end();
});

app.post("/alunos/novo", (req, res) => {
    const teveNovoAluno = alunos.adicionarAluno(req, res);
    if(teveNovoAluno){
        res.status(201).json(teveNovoAluno);
        db.push(teveNovoAluno);
        const jsonData = JSON.stringify(db);
        fs.writeFileSync("./db/db.json", `${jsonData}`);
    }else{
        res.status(400).json({ message:"Erro! Para adicionar um novo aluno, informe: Nome, Media e Matricula"});
        res.end();
    }
});

app.delete("/alunos/deletar/:index", (req, res) => {
    const teveExclusao = alunos.deletarAluno(req, res);
    if(teveExclusao){
        db.splice(teveExclusao, 1);
        const jsonData = JSON.stringify(db);
        fs.writeFileSync("./db/db.json", `${jsonData}`);
        res.status(200).json(alunos.alunos);
    }else{
        res.status(404).json({ message:"Erro! Número de Index não existe"});
        res.end();
    }
});


app.put("/alunos/atualizar/:index", (req, res) => {
    const teveAtualizacao = alunos.atualizarAluno(req, req);

    if(teveAtualizacao){
        db[teveAtualizacao.index] = teveAtualizacao.db;
        const jsonData = JSON.stringify(db);
        fs.writeFileSync("./db/db.json", `${jsonData}`);
        //res.status(200).json(alunos);
    }else{
        res.status(400).json({ message:"Erro! Solicitação incorreta, seguir padrão index?nome=&media="});
    }
});


app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/");
});
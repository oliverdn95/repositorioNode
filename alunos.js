const { json } = require("express");

const alunos = [
    { nome: "Danilo", media:7.5 },
    { nome: "Araújo", media:3.0 },
    { nome: "De", media:0.5 },
    { nome: "Oliveira", media:4.0 },
    { nome: "Arievilo", media:5.0 },
    { nome: "Ed", media:0.5 },
    { nome: "Ojúara", media:1.0 },
    { nome: "Olinad", media:2.0 },
    { nome: "Daniel", media:0.0 },
    { nome: "Dani", media:8.0 },
    { nome: "Dan-Dan", media:8.5 },
    { nome: "Dan", media:8.0 },
    { nome: "Nilo", media:10.0 },
    { nome: "Lillaw", media:6.5 },
    { nome: "Danilo Dan-Dan", media:8.0 },
    { nome: "Nilinho", media:9.0 },
    { nome: "Danih", media:7.5 },
    { nome: "Nilow", media:9.0 }
];

function filtrarAlunoNome(nomeAluno){
    const alunosEncontrados = alunos.filter((aluno) => aluno.nome.toLowerCase().startsWith(nomeAluno.toLowerCase()));

    if(alunosEncontrados){
        return alunosEncontrados
    }
}

function filtrarAlunoNota(mediaAluno){
    const alunosEncontrados = alunos.filter((aluno) => aluno.media >= mediaAluno);

    if(alunosEncontrados){
        return alunosEncontrados;
    }
}

function filtrarAlunoNomeNota(nomeAluno, mediaAluno){
    const alunosEncontrados = alunos.filter((aluno) => aluno.media >= mediaAluno && aluno.nome.toLowerCase().startsWith(nomeAluno.toLowerCase()));

    if(alunosEncontrados){
        
        return alunosEncontrados;
    }
}

function adicionarAluno(req, res){
    //Desestruturando variáveis da query
    const { nome, media, matricula } = req.query;

    const novoAluno = {nome: nome, media: media, matricula: matricula};

    if(novoAluno){
        alunos.push(novoAluno);
        return novoAluno;
    }else{
        return false;
    }
}

function deletarAluno(req, res){
    const { index } = req.params;

    if(index && index <= alunos.length-1 && index >= 0){
        alunos.splice(index, 1);
        return index;
    }else{
        return false;
    }
}

function atualizarAluno(req, res){
    const { index } = req.params;
    const { nome, media } = req.query;

    if(index && nome && media >= 0 && media <= 10){
        alunos[index].nome = nome;
        alunos[index].media = media;
        return {db:alunos[index], index:index};
    }else{
        return false;
    }
}

module.exports = {alunos, filtrarAlunoNome, filtrarAlunoNota, filtrarAlunoNomeNota, adicionarAluno, deletarAluno, atualizarAluno};
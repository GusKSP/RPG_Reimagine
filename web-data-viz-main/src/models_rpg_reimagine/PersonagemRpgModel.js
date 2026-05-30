console.log("MODEL PERSONAGEM RPG CARREGADO");
var database = require("../database_rpgreimagine/configRpg")

function carregarPersonagens(id_usuario) {
    var instrucaoSelectPersonagem = `SELECT p.id_personagem, p.imagem_personagem, p.nome AS nome_personagem, DATE(p.dt_criacao), p.descricao AS descricao_personagem, u.id_usuario, u.nome AS nome_usuario FROM Personagens p JOIN Usuario u ON u.id_usuario = p.fk_usuario WHERE u.id_usuario = ?`
    console.log("Executando a instrução SQL: \n" + instrucaoSelectPersonagem);
    return database.executar(instrucaoSelectPersonagem, [id_usuario])
}

function criarPersonagem(nome, descricao, id_usuario) {
    var instrucaoInsertPersonagem = `INSERT INTO Personagens (nome, descricao, fk_usuario) VALUES (?, ?, ?)`
    console.log("Executando a instrução SQL: \n" + instrucaoInsertPersonagem);
    return database.executar(instrucaoInsertPersonagem, [nome, descricao, id_usuario])
}

function alterarFotoPersonagem(imagem_personagem, id_personagem) {
    var instrucaoUpdatePersonagem = `UPDATE Personagens SET imagem_personagem = ? 
    WHERE id_personagem = ?`
    console.log("Executando a instrução SQL: \n" + instrucaoUpdatePersonagem);
    return database.executar(instrucaoUpdatePersonagem, [imagem_personagem, id_personagem])
}

function editarPersonagem(nome, descricao, id_personagem) {
    var instrucaoUpdatePersonagem = `UPDATE Personagens SET nome = ?, descricao = ? 
    WHERE id_personagem = ?`
    console.log("Executando a instrução SQL: \n" + instrucaoUpdatePersonagem);
    return database.executar(instrucaoUpdatePersonagem, [nome, descricao, id_personagem])
}

function deletarPersonagem(id_personagem) {
    var instrucaoDeletePersonagem = `DELETE FROM Personagens WHERE id_personagem = ?`
    console.log("Executando a instrução SQL: \n" + instrucaoDeletePersonagem);
    return database.executar(instrucaoDeletePersonagem, [id_personagem])
}

function buscarPersonagemPorId(id_personagem) {
    var instrucaoSelectPersonagem = `SELECT id_personagem, imagem_personagem, nome AS nome_personagem, DATE(dt_criacao), descricao AS descricao_personagem, fk_usuario FROM Personagens WHERE id_personagem = ?`
    console.log("Executando a instrução SQL: \n" + instrucaoSelectPersonagem);
    return database.executar(instrucaoSelectPersonagem, [id_personagem])
}

module.exports = {
    carregarPersonagens,
    criarPersonagem,
    alterarFotoPersonagem,
    editarPersonagem,
    deletarPersonagem,
    buscarPersonagemPorId
};
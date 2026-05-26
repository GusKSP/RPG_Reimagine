console.log("MODEL USUARIOS RPG CARREGADO");

var database = require("../database_rpgreimagine/configRpg")

function cadastrarRpg(nome, email, senha) {
    console.log("ACESSEI O USUARIORPG MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    var instrucaoInsertCadastro =
        `INSERT INTO Usuario (nome, email, senha)VALUES (?, ?, ?);`;

    return database.executar(instrucaoInsertCadastro, [nome, email, senha]);
}


// Listando todos os emails de usuarios cadastrados
function verificarEmail(email) {
    console.log("ACESSEI O USUARIORPG MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarRpg()");
    var instrucaoSelectUser = `            
    SELECT u.email FROM Usuario u
    WHERE u.email = (?);`;
    console.log("Executando a instrução SQL: \n" + instrucaoSelectUser);
    return database.executar(instrucaoSelectUser, [email]);
}

function autenticarUsuario(email, senha) {
    console.log("ACESSEI O USUARIORPG MODEL")


    var instrucaoSelectUser = `SELECT u.id_usuario, u.email, u.imagem_usuario, u.nome, u.super_usuario FROM Usuario u WHERE u.email= ? AND u.senha = ?`
    console.log("Executando a instrução SQL: \n" + instrucaoSelectUser);
    return database.executar(instrucaoSelectUser, [email, senha])
}


module.exports = {
    cadastrarRpg,
    verificarEmail,
    autenticarUsuario
};
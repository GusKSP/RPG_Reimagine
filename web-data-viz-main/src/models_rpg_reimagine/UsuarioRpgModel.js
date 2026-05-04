console.log("MODEL USUARIOS RPG CARREGADO");

var database = require("../database_rpgreimagine/configRpg")

function cadastrarRpg(nome, email, senha) {
    console.log("ACESSEI O USUARIORPG MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    var instrucaoInsertCadastro =
        `INSERT INTO Usuario (nome, email, senha)VALUES (?, ?, ?);`;

    return database.executar(instrucaoInsertCadastro, [nome, email, senha]);
}

function listarRpg() {
    console.log("ACESSEI O USUARIORPG MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSelectUser = `
            
    SELECT u.id_usuario AS 'id_usuario', 
    u.nome AS 'usuario_nome', 
    u.email AS 'email_usuario', 
    u.dt_registro AS 'data_registro', 
    u.super_usuario, 
    u.ativo
    FROM Usuario AS u;
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSelectUser);
    return database.executar(instrucaoSelectUser);
}
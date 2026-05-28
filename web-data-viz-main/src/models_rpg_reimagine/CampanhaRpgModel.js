console.log("MODEL MESA RPG CARREGADO");
var database = require("../database_rpgreimagine/configRpg")

function carregarCampanha(id_usuario) {
    var instrucaoSelectCampanha = `SELECT * FROM vw_Campanha_jogadores WHERE id_jogador = ? `
    console.log("Executando a instrução SQL: \n" + instrucaoSelectCampanha)
    return database.executar(instrucaoSelectCampanha, [id_usuario])

}
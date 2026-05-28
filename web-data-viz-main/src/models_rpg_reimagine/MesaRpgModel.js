console.log("MODEL MESA RPG CARREGADO");
var database = require("../database_rpgreimagine/configRpg")

function carregarMesas(id_usuario) {
    var instrucaoSelectMesa = ` SELECT id_mesa, fk_usuario_criador, imagem_mesa, nome_mesa, dt_criacao, codigo FROM mesas WHERE fk_usuario_criador = ?`
    console.log("Executando a instrução SQL: \n" + instrucaoSelectMesa);
    return database.executar(instrucaoSelectMesa, [id_usuario])
}

function criarCodigo(codigo, id_mesa) {
    var instrucaoUpdateMesa = `UPDATE mesas SET codigo = ? WHERE id_mesa = ?`
    console.log("Executando a instrução SQL: \n" + instrucaoUpdateMesa);
    return database.executar(instrucaoUpdateMesa, [codigo, id_mesa])
}

function alterarFotoMesa(imagem_mesa, id_mesa) {
    var instrucaoUpdateMesa = `UPDATE mesas SET imagem_mesa = ? WHERE id_mesa = ?`
    console.log("Executando a instrução SQL: \n" + instrucaoUpdateMesa);
    return database.executar(instrucaoUpdateMesa, [imagem_mesa, id_mesa])
}

function criarMesa(id_usuario, nome_mesa) {
    var instrucaoInsertMesa = `INSERT INTO mesas (fk_usuario_criador, nome_mesa) VALUES
    (?, ?)`
    console.log("Executando a instrução SQL: \n" + instrucaoInsertMesa);
    return database.executar(instrucaoInsertMesa, [id_usuario, nome_mesa])
}
function excluirMesa(id_mesa) {

    var instrucaoDeleteElementos = `DELETE FROM ElementosMesa WHERE fk_mesa = ?`
    console.log("Executando: " + instrucaoDeleteElementos);

    return database.executar(instrucaoDeleteElementos, [id_mesa])
        .then(function () {

            var instrucaoDeleteCampanhaPersonagens = `DELETE FROM CampanhaPersonagens WHERE fkpk_idmesa = ?`
            console.log("Executando: " + instrucaoDeleteCampanhaPersonagens);

            return database.executar(instrucaoDeleteCampanhaPersonagens, [id_mesa])

        }).then(function () {

            var instrucaoDeleteCampanhaJogadores = `DELETE FROM CampanhaJogadores WHERE fkpk_idmesa = ?`
            console.log("Executando: " + instrucaoDeleteCampanhaJogadores);

            return database.executar(instrucaoDeleteCampanhaJogadores, [id_mesa])

        }).then(function () {

            var instrucaoDeleteMesa = `DELETE FROM Mesas WHERE id_mesa = ?`
            console.log("Executando: " + instrucaoDeleteMesa);

            return database.executar(instrucaoDeleteMesa, [id_mesa])
        })
}
module.exports = {
    carregarMesas,
    criarCodigo,
    alterarFotoMesa,
    criarMesa,
    excluirMesa
};

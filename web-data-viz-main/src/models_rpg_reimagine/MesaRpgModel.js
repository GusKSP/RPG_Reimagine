console.log("MODEL MESA RPG CARREGADO");
var database = require("../database_rpgreimagine/configRpg")

function carregarMesas(id_usuario) {
    var instrucaoSelectMesa = `SELECT u.id_usuario AS Id_Usuario, u.nome AS Nome_Usuario, u.email AS Email_Usuario, m.id_mesa AS Id_mesa, m.imagem_mesa AS Imagem_Mesa, m.nome_mesa AS Nome_Mesa, DATE(m.dt_criacao) AS Data_Criacao, m.codigo AS Codigo_mesa FROM Usuario u LEFT JOIN Mesas m ON m.fk_usuario_criador=u.id_usuario WHERE fk_usuario_criador = ?`
    console.log("Executando a instrução SQL: \n" + instrucaoSelectMesa);
    return database.executar(instrucaoSelectMesa, [id_usuario])
}

function trazerMesa(id_mesa) {
    var instrucaoSelectMesa = `SELECT * FROM Mesas WHERE id_mesa = ?`
    console.log("Executando a instrução SQL: \n" + instrucaoSelectMesa);
    return database.executar(instrucaoSelectMesa, [id_mesa])
}

function criarCodigo(codigo, id_mesa) {
    var instrucaoUpdateMesa = `UPDATE Mesas SET codigo = ? WHERE id_mesa = ?`
    console.log("Executando a instrução SQL: \n" + instrucaoUpdateMesa);
    return database.executar(instrucaoUpdateMesa, [codigo, id_mesa])
}

function SalvarMundo(id_mundo, nome_mundo, imagem, codigo) {
    var instrucaoUpdateMesa = `UPDATE Mesas SET nome_mesa = ?, imagem_mesa = ?, codigo = ? WHERE id_mesa = ?;`
    console.log("Executando a instrução SQL: \n" + instrucaoUpdateMesa);
    return database.executar(instrucaoUpdateMesa, [nome_mundo, imagem, codigo, id_mundo])
}

function criarMesa(id_usuario, nome_mesa, codigo) {
    var instrucaoInsertMesa = `INSERT INTO Mesas (fk_usuario_criador, nome_mesa, codigo) VALUES
    (?, ?, ?)`
    console.log("Executando a instrução SQL: \n" + instrucaoInsertMesa);
    return database.executar(instrucaoInsertMesa, [id_usuario, nome_mesa, codigo])
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

function VerificarCodigoModel(codigo) {
    var instrucaoSelectMesa = `SELECT COUNT(id_mesa) AS Qtd_mesas FROM Mesas WHERE Codigo = ?;`
    console.log("Executando a instrução SQL: \n" + instrucaoSelectMesa);
    return database.executar(instrucaoSelectMesa, [codigo])
}
module.exports = {
    carregarMesas,
    criarCodigo,
    criarMesa,
    excluirMesa,
    VerificarCodigoModel,
    trazerMesa,
    SalvarMundo,
};

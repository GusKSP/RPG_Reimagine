console.log("MODEL MESA RPG CARREGADO");
var database = require("../database_rpgreimagine/configRpg")

function carregarUsuarios() {

    var instrucaoSelectDash = `SELECT DATE_FORMAT(data, '%d-%m-%Y') AS data_bd, COUNT(*) AS total_usuarios 
FROM (SELECT DATE(dt_registro) AS data FROM Usuario WHERE DATEDIFF(CURDATE(), DATE(dt_registro)) BETWEEN 0 AND 9
) u
GROUP BY data, data_bd
ORDER BY data;`
    console.log("Executando a instrução SQL: \n" + instrucaoSelectDash)
    return database.executar(instrucaoSelectDash)
}

function carregarMesas() {
    var instrucaoSelectDash = `SELECT DATE_FORMAT(data, '%d-%m-%Y') AS data_bd, COUNT(*) AS total_mesas 
    FROM (SELECT DATE(dt_criacao) AS data FROM Mesas WHERE DATEDIFF(CURDATE(), DATE(dt_criacao)) BETWEEN 0 AND 9
    ) m
    GROUP BY data, data_bd
    ORDER BY data;`
    console.log("Executando a instrução SQL: \n" + instrucaoSelectDash)
    return database.executar(instrucaoSelectDash)
}
function carregarElementos() {
    var instrucaoSelectDash = `
    SELECT MAX(qtd_elementos) AS maior_quantidade_elementos, ROUND(AVG(qtd_elementos),2) AS media_elementos_por_mesa 
    FROM (
        SELECT fk_mesa, COUNT(*) AS qtd_elementos
        FROM ElementosMesa
        GROUP BY fk_mesa
    ) AS elementos_por_mesa;`
    console.log("Executando a instrução SQL: \n" + instrucaoSelectDash)
    return database.executar(instrucaoSelectDash)
}

module.exports = {
    carregarUsuarios,
    carregarMesas,
    carregarElementos
}
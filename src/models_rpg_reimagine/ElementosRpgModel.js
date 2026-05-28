console.log("MODEL MESA RPG CARREGADO");
var database = require("../database_rpgreimagine/configRpg")

function carregarElementos(id_mesa) {
    var instrucaoSelectElemento = ` SELECT * FROM elementosmesa WHERE fk_mesa = ? `

    console.log("Executando a instrução SQL: \n" + instrucaoSelectElemento)
    return database.executar(instrucaoSelectElemento, [id_mesa])

}

function criarElementos(id_mesa, nome, tipo_elemento, id_elemento_dependencia) {
    var instrucaoInsertElemento = `INSERT INTO elementosmesa (fk_mesa, nome, tipo_elemento, fk_elemento_dependencia) VALUES (?, ?, ?, ?)`
    console.log("Executando a instrução SQL: \n" + instrucaoInsertElemento)
    return database.executar(instrucaoInsertElemento, [id_mesa, nome, tipo_elemento, id_elemento_dependencia])
}

function modificarCampo(id_elemento, id_mesa, campo, valor) {
    const camposPermitidos = [
        "imagem_elemento",
        "nome",
        "descricao",
        "valor_inteiro",
        "valor_flutuante"]
    if (camposPermitidos.includes(campo)) {
        var instrucaoUpdateElemento = `UPDATE elementosmesa SET ${campo} = ? WHERE id_elementos_mesa = ? AND fk_mesa = ?`
        console.log("Executando a instrução SQL: \n" + instrucaoUpdateElemento)
        return database.executar(instrucaoUpdateElemento, [valor, id_elemento, id_mesa])
    }
    else {
        return "Campo Inválido!"
    }
}

module.exports = {
    carregarElementos,
    criarElementos,
    modificarCampo
};
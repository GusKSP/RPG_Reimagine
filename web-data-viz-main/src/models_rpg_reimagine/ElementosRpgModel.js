console.log("MODEL ELEMENTOS RPG CARREGADO");

var database = require("../database_rpgreimagine/configRpg");

function trazerElementosModel(idMesa) {

    var instrucaoSql = `
        SELECT
            id_elementos_mesa, imagem_elemento, nome, descricao, valor_inteiro, valor_flutuante, tipo_elemento, fk_mesa, 
            fk_elemento_dependencia
        FROM ElementosMesa
        WHERE fk_mesa = ?;
    `;

    console.log("Executando a instrução SQL:\n" + instrucaoSql);

    return database.executar(instrucaoSql, [idMesa]);
}

function adicionarElementoModel(idMesa, tipoElemento) {
    let nome = "Novo Elemento";

    if (tipoElemento == 1) {
        nome = "Novo Atributo";
    }
    else if (tipoElemento == 2) {
        nome = "Nova Perícia";
    }
    else if (tipoElemento == 3) {
        nome = "Nova Barra";
    }
    else if (tipoElemento == 4) {
        nome = "Nova Habilidade";
    }
    else if (tipoElemento == 5) {
        nome = "Novo Item";
    }
    else if (tipoElemento == 6) {
        nome = "Nova Criatura";
    }
    else if (tipoElemento == 7) {
        nome = "Novo Homebrew";
    }

    var instrucaoSql = `
        INSERT INTO ElementosMesa (nome, valor_inteiro, tipo_elemento, fk_mesa) VALUES
        (?,20,?,?);
    `;

    console.log("Executando a instrução SQL:\n" + instrucaoSql);

    return database.executar(
        instrucaoSql,
        [nome, tipoElemento, idMesa]
    );
}

function adicionarElementoDependenteModel(idMesa, idElemento) {

    let nome = "Nova Barra";

    let instrucaoSql = `INSERT INTO ElementosMesa (nome, valor_inteiro, valor_flutuante, tipo_elemento, fk_mesa, fk_elemento_dependencia) VALUES
    (?, 0, 100, 3, ?, ?);
`;

    console.log("Executando SQL dependente:\n" + instrucaoSql);

    return database.executar(instrucaoSql, [nome, idMesa, idElemento]);
}


function excluirElementoModel(idElemento) {
    var instrucaoSql = ` DELETE FROM ElementosMesa WHERE id_elementos_mesa=?;`;
    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql, [idElemento]);
}

function AtualizarElemento(idElemento, nome, valorInteiro, descricao, fkDependencia) {
    if (fkDependencia == "" || fkDependencia == undefined) {
        fkDependencia = null
    }
    var sql = `UPDATE ElementosMesa SET nome = '${nome}', valor_inteiro = ${valorInteiro}, descricao = '${descricao}', fk_elemento_dependencia = ${fkDependencia} WHERE id_elementos_mesa = ${idElemento}; `;

    return database.executar(sql);
}




module.exports = {
    trazerElementosModel,
    adicionarElementoModel,
    excluirElementoModel,
    adicionarElementoDependenteModel,
    AtualizarElemento,
};
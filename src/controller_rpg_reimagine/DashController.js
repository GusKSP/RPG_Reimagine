var DashboardModel = require("../models_rpg_reimagine/DashModel")

function buscarUsuariosUltimosDias(req, res) {
    DashboardModel.carregarFuncionarios()
        .then((resultado) => {
            console.log("RESULTADO SQL:", resultado);
            res.status(200).json(resultado);
        })
        .catch((erro) => {
            console.log("ERRO NO MODEL:", erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

function buscarMesasUltimosDias(req, res) {
    DashboardModel.carregarMesas()
        .then((resultado) => {
            console.log("RESULTADO SQL:", resultado);
            res.status(200).json(resultado);
        })
        .catch((erro) => {
            console.log("ERRO NO MODEL:", erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

function buscarElementos(req, res) {
    DashboardModel.carregarElementos()
        .then((resultado) => {
            console.log("RESULTADO SQL:", resultado);
            res.status(200).json(resultado);
        })
        .catch((erro) => {
            console.log("ERRO NO MODEL:", erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

module.exports = {
    buscarUsuariosUltimosDias,
    buscarMesasUltimosDias,
    buscarElementos
}
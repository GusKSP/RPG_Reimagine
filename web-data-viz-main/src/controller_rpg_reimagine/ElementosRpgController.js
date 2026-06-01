console.log("ELEMENTOS CONTROLLER CARREGADO");

var elementosModel = require("../models_rpg_reimagine/ElementosRpgModel");

function trazerElementosController(req, res) {
    let idMesa = req.body.idMesaServer;
    console.log("ID RECEBIDO:", idMesa);
    if (!idMesa) {
        res.status(400).send("O id da mesa está undefined!");
    } else {
        elementosModel.trazerElementosModel(idMesa)
            .then(function (resultado) {
                console.log(resultado);
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os elementos! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function adicionarElementoController(req, res) {
    let idMesa = req.body.idMesaServer;
    let tipoElemento = req.body.tipoElementoServer
    if (idMesa == undefined) {
        res.status(400).send("idMesa undefined");
    }
    else if (tipoElemento == undefined) {
        res.status(400).send("tipoElemento undefined");
    }
    else {
        elementosModel.adicionarElementoModel(
            idMesa,
            tipoElemento
        ).then(function (resultado) {

            res.status(200).json(resultado);

        }).catch(function (erro) {

            console.log(erro);
            res.status(500).json(erro.sqlMessage);

        });

    }
}

function excluirElementoController(req, res) {
    let idElemento = req.body.idElementoServer;

    if (!idElemento) {
        res.status(400).send("id do elemento está undefined");
        return;
    }

    elementosModel.excluirElementoModel(idElemento)
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function adicionarElementoDependenteController(req, res) {

    let idMesa = req.body.idMesaServer;
    let idElemento = req.body.idElementoServer;

    if (!idMesa || !idElemento) {
        res.status(400).send("Dados inválidos");
        return;
    }

    elementosModel.adicionarElementoDependenteModel(idMesa, idElemento)
        .then(result => res.json(result))
        .catch(err => {
            console.log(err);
            res.status(500).json(err.sqlMessage);
        });
}

function AtualizarElemento(req, res) {
    var idElemento = req.body.idElementoServer;
    var nome = req.body.nomeServer;
    var valorInteiro = req.body.valorInteiroServer;
    var descricao = req.body.descricaoServer;
    var fkDependencia = req.body.fkDependenciaServer;

    elementosModel.AtualizarElemento(idElemento, nome, valorInteiro, descricao, fkDependencia)
        .then(function () {
            res.sendStatus(200);
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).send("Erro ao atualizar elemento");
        });
}



module.exports = {
    trazerElementosController,
    adicionarElementoController,
    excluirElementoController,
    adicionarElementoDependenteController,
    AtualizarElemento
};
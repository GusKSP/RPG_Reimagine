var MundosModel = require("../models_rpg_reimagine/MesaRpgModel")

function BuscarMundosController(req, res) {
    var id = req.body.idServer
    MundosModel.carregarMesas(id)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(function (erro) {
            console.log("ERRO COMPLETO:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function excluirMesaController(req, res) {

    var id_mesa = req.body.idMesaServer

    MundosModel.excluirMesa(id_mesa)
        .then(
            function (resultado) {
                res.status(200).json(resultado)
            }
        ).catch(
            function (erro) {
                console.log("ERRO COMPLETO:", erro)
                res.status(500).json(erro.sqlMessage)
            }
        )
}
function criarMesaController(req, res) {

    var nome = req.body.nomeServer
    var idUsuario = req.body.idUsuarioServer

    if (!nome || !idUsuario) {
        res.status(400).send("Dados inválidos")
        return
    }

    MundosModel.criarMesa(idUsuario, nome)
        .then(function (resultado) {
            res.json(resultado)
        })
        .catch(function (erro) {
            console.log("ERRO COMPLETO:", erro)
            res.status(500).json(erro.sqlMessage)
        })
}

module.exports = {
    BuscarMundosController,
    excluirMesaController,
    criarMesaController
}   
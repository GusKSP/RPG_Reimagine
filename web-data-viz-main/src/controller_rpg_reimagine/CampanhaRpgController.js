var CampanhaModel = require("../models_rpg_reimagine/CampanhaRpgModel");

function carregarCampanhas(req, res) {

    var id_usuario = req.body.idUsuarioServer;

    CampanhaModel.carregarCampanhaDoUsuario(id_usuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("ERRO COMPLETO:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function carregarPersonagens(req, res) {
    var id_mesa = req.body.idMesaServer;
    CampanhaModel.carregarPersonagensDeCampanhas(id_mesa)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("ERRO COMPLETO:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function entrarCampanha(req, res) {
    var codigo = req.body.codigoServer;
    var idUsuario = req.body.idUsuarioServer;
    if (!codigo || !idUsuario) {
        res.status(400).send("Dados inválidos");
        return;
    }
    CampanhaModel.entrarCampanha(codigo, idUsuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("ERRO COMPLETO:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    carregarCampanhas,
    carregarPersonagens,
    entrarCampanha
}
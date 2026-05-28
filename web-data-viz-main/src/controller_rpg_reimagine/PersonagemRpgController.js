var PesronagemModel = require("../models_rpg_reimagine/PersonagemRpgModel")

function BuscarPersonagemController(req, res) {
    var id = req.body.idServer
    PesronagemModel.carregarPersonagens(id)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(function (erro) {
            console.log("ERRO COMPLETO:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    BuscarPersonagemController,
}
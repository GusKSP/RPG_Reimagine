var express = require("express");
var router = express.Router();

var elementosController = require("../controller_rpg_reimagine/ElementosRpgController");

router.post("/trazerElementos", function (req, res) {
    elementosController.trazerElementosController(req, res);
});

router.post("/AdicionarElemento", function (req, res) {
    elementosController.adicionarElementoController(req, res);
});

router.post("/ExcluirElemento", function (req, res) {
    elementosController.excluirElementoController(req, res);
});

router.post("/AdicionarElementoDependente", function (req, res) {
    elementosController.adicionarElementoDependenteController(req, res);
});

router.post("/AtualizarElemento", function (req, res) {
    elementosController.AtualizarElemento(req, res);
});
module.exports = router;
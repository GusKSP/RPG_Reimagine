var express = require("express");
var router = express.Router();

var MundosController = require("../controller_rpg_reimagine/MundosRpgController")

router.post("/routeBuscarMundos", function (req, res) {
    MundosController.BuscarMundosController(req, res)
})

router.post("/excluirMesa", function (req, res) {
    MundosController.excluirMesaController(req, res)
})

router.post("/criarMesa", function (req, res) {
    MundosController.criarMesaController(req, res)
});

module.exports = router;
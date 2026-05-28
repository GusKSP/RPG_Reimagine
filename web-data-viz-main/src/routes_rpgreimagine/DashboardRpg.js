var express = require("express");
var router = express.Router();

var DashController = require("../controller_rpg_reimagine/DashController")

router.get("/UsuariosQuantidade", function (req, res) {
    DashController.buscarUsuariosUltimosDias(req, res);
})

router.get("/MesasQuantidade", function (req, res) {
    DashController.buscarMesasUltimosDias(req, res);
})

router.get("/ElementosQuantidade", function (req, res) {
    DashController.buscarElementos(req, res);
})

module.exports = router;
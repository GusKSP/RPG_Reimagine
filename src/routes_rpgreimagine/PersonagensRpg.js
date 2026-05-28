var express = require("express");
var router = express.Router();

var PersonagemController = require("../controller_rpg_reimagine/PersonagemRpgController")

router.post("/routeBuscarPersonagens", function (req, res) {
    PersonagemController.BuscarPersonagemController(req, res)
})

module.exports = router;
var express = require("express");
var router = express.Router();

var CampanhaController = require("../controller_rpg_reimagine/CampanhaRpgController");

router.post("/buscarCampanhas", function (req, res) {
    CampanhaController.carregarCampanhas(req, res);
});

router.post("/buscarPersonagensCampanha", function (req, res) {
    CampanhaController.carregarPersonagens(req, res);
});

router.post("/entrarCampanha", function (req, res) {
    CampanhaController.entrarCampanha(req, res);
});

router.post("/sairCampanha", function (req, res) {
    CampanhaController.sairCampanhaController(req, res);
})

router.post("/buscarUsuariosCampanha", function (req, res) {
    CampanhaController.buscarUsuariosCampanha(req, res);
});
module.exports = router;
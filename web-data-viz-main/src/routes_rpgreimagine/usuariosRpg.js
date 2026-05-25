console.log("ROTA USUARIOS RPG CARREGADA");

var express = require("express");
var router = express.Router();

var UsuarioRpgController = require("../controllers_rpg_reimagine/UsuarioRpgController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarRpg", function (req, res) {
    UsuarioRpgController.cadastrarRpg(req, res);
})

router.post("/emailRegistrado", function (req, res) {
    UsuarioRpgController.EmailRegistrado(req, res);
});

router.post("/AutenticarRoute", function(req,res){
    UsuarioRpgController.Autenticar(req,res);
})

module.exports = router;
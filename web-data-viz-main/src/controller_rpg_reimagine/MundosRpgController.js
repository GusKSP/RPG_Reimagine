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
    var codigo = req.body.codigoServer

    if (!nome || !idUsuario) {
        res.status(400).send("Dados inválidos")
        return
    }

    MundosModel.criarMesa(idUsuario, nome, codigo)
        .then(function (resultado) {
            res.json(resultado)
        })
        .catch(function (erro) {
            console.log("ERRO COMPLETO:", erro)
            res.status(500).json(erro.sqlMessage)
        })
}

function VerificarCodigoController(req, res) {
    var codigo = req.body.codigoServer
    if (!codigo) {
        res.status(400).send("Código inválido")
        return
    }
    MundosModel.VerificarCodigoModel(codigo)
        .then(function (resultado) {
            res.json(resultado)
        })
        .catch(function (erro) {
            console.log("ERRO COMPLETO:", erro)
            res.status(500).json(erro.sqlMessage)
        })
}

function SalvarCodigoController(req, res) {
    var codigo = req.body.codigoServer
    var id_mesa = req.body.idMesaServer
    if (!codigo || !id_mesa) {
        res.status(400).send("Código inválido")
        return
    }
    MundosModel.criarCodigo(codigo, id_mesa)
        .then(function (resultado) {
            res.json(resultado)
        })
        .catch(function (erro) {
            console.log("ERRO COMPLETO:", erro)
            res.status(500).json(erro.sqlMessage)
        })
}

function trazerInformacoesMundo(req, res) {
    var id_mundo = req.body.idServerMundo

    if (!id_mundo) {
        res.status(400).send("Erro ao tentar buscar o Mundo")
        return
    } else {
        MundosModel.trazerMesa(id_mundo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(function (erro) {
                console.log("ERRO COMPLETO:", erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}
function SalvarAlteracoesController(req, res) {
    var id_mundo = req.body.idServerMundo
    var nome_mundo = req.body.nomeServer
    var imagem = req.body.imagemServer
    var codigo = req.body.codigoServer
    if (!id_mundo || !nome_mundo) {
        res.status(400).send("Erro ao tentar salvar o Mundo")
        return
    }
    else {
        MundosModel.SalvarMundo(id_mundo, nome_mundo, imagem, codigo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(function (erro) {
                console.log("ERRO COMPLETO:", erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}
module.exports = {
    BuscarMundosController,
    excluirMesaController,
    criarMesaController,
    VerificarCodigoController,
    SalvarCodigoController,
    trazerInformacoesMundo,
    SalvarAlteracoesController,
}   
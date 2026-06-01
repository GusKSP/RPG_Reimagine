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

function sairCampanhaController(req, res) {
    var idMesa = req.body.mesaServer;
    var idUsuario = req.body.idUsuarioServer
    if (!idMesa || !idUsuario) {
        res.status(400).send("Erro ao tentar achar a campanha");
        return
    };
    CampanhaModel.SairCampanhaModel(idMesa, idUsuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("ERRO COMPLETO:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}
function carregarUsuariosDaCampanha(id_mesa) {

    var instrucaoSql = `
        SELECT 
            u.id_usuario AS Id_Usuario,
            u.nome AS Nome_Usuario,
            u.imagem_usuario AS Imagem_Usuario,
            cj.fkpk_idmesa AS Id_Mesa,
            m.nome_mesa AS Nome_Mesa,
            m.codigo AS Codigo_Mesa,
            m.imagem_mesa AS Imagem_Mesa,
            m.fk_usuario_criador AS Id_Criador,
            uc.nome AS Nome_Criador,
            uc.imagem_usuario AS Imagem_Criador
        FROM CampanhaJogadores cj
        JOIN Usuario u ON cj.fkpk_idusuario = u.id_usuario
        JOIN Mesas m ON cj.fkpk_idmesa = m.id_mesa
        JOIN Usuario uc ON uc.id_usuario = m.fk_usuario_criador
        WHERE m.id_mesa = ?;
    `;

    console.log("Executando SQL:", instrucaoSql);

    return database.executar(instrucaoSql, [id_mesa]);
}

function buscarUsuariosCampanha(req, res) {

    var id_mesa = req.body.idMesaServer;

    if (!id_mesa) {
        res.status(400).send("ID da mesa inválido");
        return;
    }

    CampanhaModel.carregarUsuariosDaCampanha(id_mesa)
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
    entrarCampanha,
    sairCampanhaController,
    carregarUsuariosDaCampanha,
    buscarUsuariosCampanha
}
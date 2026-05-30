console.log("MODEL MESA RPG CARREGADO");
var database = require("../database_rpgreimagine/configRpg")

function carregarCampanhaDoUsuario(id_usuario) {
    var instrucaoSelectCampanha = `SELECT u.id_usuario, u.imagem_usuario AS Imagem_Usuario, u.nome AS Nome_Usuario, m.id_mesa AS Id_Mesa, m.nome_mesa AS Nome_Mesa, m.codigo AS codigo_mesa, m.imagem_mesa, uc.id_usuario AS id_criador, uc.nome AS nome_criador,
    uc.imagem_usuario AS imagem_criador FROM CampanhaJogadores cj JOIN Usuario u ON cj.fkpk_idusuario = u.id_usuario JOIN Mesas m ON cj.fkpk_idmesa = m.id_mesa JOIN Usuario uc ON uc.id_usuario = m.fk_usuario_criador WHERE u.id_usuario = ? `
    console.log("Executando a instrução SQL: \n" + instrucaoSelectCampanha)
    return database.executar(instrucaoSelectCampanha, [id_usuario])

}

function carregarPersonagensDeCampanhas(id_mesa) {
    var instrucaoSelectCampanha = `SELECT p.id_personagem AS Id_Personagem, p.nome AS Nome_Personagem, u.id_usuario AS Id_Usuario, u.nome AS Usuário, m.id_mesa AS Id_Mesa, m.nome_mesa AS Nome_Mesa FROM CampanhaPersonagens cp JOIN Personagens p ON p.id_personagem = cp.fkpk_idpersonagem JOIN Usuario u ON u.id_usuario = p.fk_usuario JOIN Mesas m ON m.id_mesa = cp.fkpk_idmesa WHERE m.id_mesa = ? ORDER BY u.id_usuario`

    console.log("Executando a instrução SQL: \n" + instrucaoSelectCampanha)
    return database.executar(instrucaoSelectCampanha, [id_mesa])
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

function entrarCampanha(codigo, id_usuario) {

    var instrucaoInserirJogador = `
    INSERT INTO CampanhaJogadores (fkpk_idusuario, fkpk_idmesa) VALUES (?,
        (
            SELECT id_mesa
            FROM Mesas
            WHERE codigo = ?
        )   
    )`;
    console.log("Executando SQL: " + instrucaoInserirJogador);
    return database.executar(instrucaoInserirJogador, [id_usuario, codigo]);
}

module.exports = {
    carregarCampanhaDoUsuario,
    carregarPersonagensDeCampanhas,
    entrarCampanha
}
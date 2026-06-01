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

function entrarCampanha(codigo, id_usuario) {

    var instrucaoInsertCampanha = `
    INSERT INTO CampanhaJogadores (fkpk_idusuario, fkpk_idmesa) VALUES (?,
        (
            SELECT id_mesa
            FROM Mesas
            WHERE codigo = ?
        )   
    )`;
    console.log("Executando SQL: " + instrucaoInsertCampanha);
    return database.executar(instrucaoInsertCampanha, [id_usuario, codigo]);
}

function SairCampanhaModel(id_mesa, id_jogador) {
    var instrucaoDeleteCampanha = `
DELETE FROM CampanhaJogadores WHERE fkpk_idmesa = ? AND fkpk_idusuario = ?;   `;
    console.log("Executando SQL: " + instrucaoDeleteCampanha);
    return database.executar(instrucaoDeleteCampanha, [id_mesa, id_jogador]);
}

function carregarUsuariosDaCampanha(id_mesa) {

    var instrucaoSql = `
        SELECT cj.dt_entrada, u.id_usuario AS Id_Usuario, u.nome AS Nome_Usuario, u.imagem_usuario AS Imagem_Usuario, m.id_mesa AS Id_Mesa, m.nome_mesa AS Nome_Mesa, m.codigo AS Codigo_Mesa, uc.id_usuario AS Id_Criador, uc.nome AS Nome_Criador, uc.imagem_usuario AS Imagem_Criador 
        FROM CampanhaJogadores cj
        JOIN Usuario u ON cj.fkpk_idusuario = u.id_usuario
        JOIN Mesas m ON cj.fkpk_idmesa = m.id_mesa
        JOIN Usuario uc ON uc.id_usuario = m.fk_usuario_criador

        WHERE m.id_mesa = ?;
    `;

    console.log("Executando SQL:", instrucaoSql);

    return database.executar(instrucaoSql, [id_mesa]);
}
module.exports = {
    carregarCampanhaDoUsuario,
    carregarPersonagensDeCampanhas,
    entrarCampanha,
    SairCampanhaModel,
    carregarUsuariosDaCampanha
}
console.log("CONTROLLER USUARIOS RPG CARREGADO");

var UsuarioRpgModel = require("../models_rpg_reimagine/UsuarioRpgModel");

function EmailRegistrado(req, res) {
    var email = req.body.emailServer;

    console.log("EMAIL RECEBIDO:", email);
    UsuarioRpgModel.verificarEmail(email)
        .then(function (resultado) {

            res.json(resultado);

        })
        .catch(function (erro) {

            console.log(erro);
            res.status(500).json(erro.sqlMessage);

        });

}

function cadastrarRpg(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Função para validar email
    const emailInvalido = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !regex.test(email);
    };
    // Validando Nome no BackEnd
    if (!nome || nome.trim() === "") {
        console.log("Nome inválido recebido:", nome);
        return res.status(400).send("Nome inválido!");
    }

    if (nome.trim().length < 3) {
        console.log("Nome inválido recebido:", nome);
        return res.status(400).send("Nome deve ter pelo menos 3 caracteres!");
    }

    const caracteresEspeciais = "!@#$%^&*()_+[]{}|;'\":,./<>?`~";
    for (let i = 0; i < nome.length; i++) {
        console.log("Verificando caractere:", nome[i]);
        if (caracteresEspeciais.includes(nome[i])) {
            console.log("Nome inválido recebido:", nome);
            return res.status(400).send("Nome não pode conter caracteres especiais!");
        }
    }

    // Validando Email
    if (!email || email.trim() === "") {
        console.log("Email inválido recebido:", email);
        return res.status(400).send("Email inválido!");
    }

    if (email.includes(" ")) {
        console.log("Email inválido recebido:", email);
        return res.status(400).send("Email não pode conter espaços!");
    }

    if (emailInvalido(email)) {
        console.log("Email inválido recebido:", email);
        return res.status(400).send("Formato de email inválido!");
    }

    // Validando Senha

    if (!senha || senha.trim() === "") {
        console.log("Senha inválida recebida:", senha);
        return res.status(400).send("Senha inválida!");
    }

    if (senha.length < 6) {
        console.log("Senha inválida recebida:", senha);
        return res.status(400).send("Senha deve ter pelo menos 6 caracteres!");
    }

    if (senha.length > 100) {
        console.log("Senha inválida recebida:", senha);
        return res.status(400).send("Senha muito longa!");
    }

    else {

        // Passe os valores como parâmetro e vá para o arquivo UsuarioRpgModel.js
        UsuarioRpgModel.cadastrarRpg(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(function (erro) {
                console.log("ERRO COMPLETO:", erro);
                res.status(500).json(erro.sqlMessage );
            });
    }
}


function Autenticar(req, res){
    var email = req.body.emailServer
    var senha = req.body.senhaServer
    UsuarioRpgModel.autenticarUsuario(email, senha).then(function(resultado){
        if (resultado.length ==1){
            console.log(resultado);
            res.status(200).json(resultado);
        }
        else if(resultado.length == 0){
            console.log(resultado)
            res.status(403).send("email ou senha inválido")
        }
        else{
            console.log(resultado)
            res.status(405).send("mais de dois usuários com o mesmo email?")
        }
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage)
    })
}

module.exports = {
    cadastrarRpg,
    EmailRegistrado,
    Autenticar
}
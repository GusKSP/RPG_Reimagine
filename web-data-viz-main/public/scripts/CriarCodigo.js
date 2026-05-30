let caractereshex = "1234567890abcdefABCDEF"
let codigoExistente = false
const id_mesa = sessionStorage.ID_MUNDO
function GerarCodigo() {
    let codigo = ""
    for (let i = 0; i < 8; i++) {
        let Indice = Math.floor(Math.random() * caractereshex.length)
        codigo += caractereshex[Indice]
    }
    console.log(codigo)
    VerificarCodigo(codigo)
}
async function VerificarCodigo(codigo) {
    let resposta = fetch("/mundosRouter/verificarCodigo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            codigoServer: codigo
        })
    }).then(function (resposta) {


        if (resposta.ok) {
            console.log(resposta)
            resposta.json().then(function (json) {
                console.log(json)
                let qtdCodigos = json[0]
                console.log(qtdCodigos)
                console.log(JSON.stringify(json))
                if (qtdCodigos.Qtd_mesas == 0) {
                    sessionStorage.GUARDAR_CODIGO = codigo
                    mostrarCodigo()
                }
                else {
                    console.log("Erro ao criar código... tentando novamente:")
                    GerarCodigo()
                }
            })
            // window.location.reload()
        } else {
            alert("Erro ao verificar código")
        }
    }).catch(function (erro) {
        console.log(erro);
    })
}

async function SalvarCodigo(codigo, id_mesa) {
    let resposta = fetch("/mundosRouter/AutenticarRoute", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            codigoServer: codigo,
            idMesaServer: id_mesa
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta)
            setTimeout(RetirarCodigo(), 10000)
        }
        else {
            alert("erro ao cadastrar código!")
        }

    }).catch(function (erro) {
        console.log(erro);
    })
}

function RetirarCodigo() {
    console.log("Retirando o Código:")
}
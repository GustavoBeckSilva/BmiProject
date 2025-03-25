const express = require('express');
const cors = require('cors');

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

/* 
    Um método que recebe um objeto JSON com o nome, altura e peso de
uma pessoa, e retorna o valor do IMC e sua classificação juntamente
os dados recebidos. Este método também deve armazenar em
uma lista no servidor do serviço os cálculos já realizados.
*/

let calculos = [];

const calculaImc = (request, response) => {

    const { nome, altura, peso } = request.body;

    if(!nome || !altura || !peso)
        return response.status(400).json({erro: "Todos os campos devem ser preenchidos"})

    if(altura <= 0 || peso <= 0)
        return response.status(400).json({erro: "Altura e peso devem ser positivos e não nulos"})

    const imc = (peso / (altura * altura)).toFixed(2)

    let classificacao = ""

    if (imc < 18.5)
        classificacao = "Abaixo do peso"

    else if (imc < 25)
        classificacao = "Peso normal"

    else if (imc < 30)
        classificacao = "Sobrepeso"
    
    else if (imc < 35) 
        classificacao = "Obesidade grau 1"

    else if (imc < 40)
        classificacao = "Obesidade grau 2"

    else
        classificacao = "Obesidade grau 3"

    const resultado = {nome, altura, peso, imc, classificacao}

    calculos.push(resultado)

    response.status(200).json(resultado)
}

/*
Um método que retorna uma lista com todos os cálculos do IMC já
realizados.
*/

/*
Um método que recebe um índice de um cálculo já realizado e o
remove da lista. 
*/

app.route("/calculaImc")
    .post(calculaImc)

app.listen(3002, () => {
    console.log('Servidor rodando na porta 3002')
})
const express = require('express');
const cors = require('cors');

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

let calculos = [];

const addCalculoImc = (request, response) => {

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

const getResultados = (request, reponse) => {
    reponse.status(200).json(calculos)
}

const removeCalculoImc = (request, response) => {
    const { indice } = request.params;

    if (indice < 0 || indice >= calculos.length) {
        return response.status(400).json({ erro: "Índice inválido" });
    }

    calculos.splice(indice, 1);

    return response.status(200).json({ mensagem: "Cálculo removido com sucesso!" });

}

app.post("/addCalculoImc", calculaImc)

app.get("/getResultados", listarCalculos)

app.delete("/removeCalculoImc/:indice", removerCalculo)

app.listen(3002, () => {
    console.log('Servidor rodando na porta 3002')
})
import { useState, useEffect } from "react";

function ImcForm () {

    const [resultado, setResultados] = useState([])

    const getResultados = async () => {
        await fetch('http://localhost:3002/getResultados')
        .then(response => response.json())
        .then(json => setResultados(json))
    }

}

export default ImcForm
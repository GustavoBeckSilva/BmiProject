import React, { useState, useEffect } from "react";

function ImcApp() {

  const [nome, setNome] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [resultado, setResultado] = useState(null);
  const [calculos, setCalculos] = useState([]);

  const getResultados = async () => {
    try {
      const response = await fetch("http://localhost:3002/getResultados");
      const json = await response.json();
      setCalculos(json);
    } catch (error) {
      console.error("Erro ao buscar os resultados:", error);
    }
  };

  useEffect(() => {
    getResultados();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !altura || !peso) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/addCalculoImc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          altura: parseFloat(altura),
          peso: parseFloat(peso),
        }),
      });
      const data = await response.json();
      setResultado(data); 
      getResultados(); 
    } catch (error) {
      console.error("Erro ao calcular IMC:", error);
    }

    setNome("");
    setAltura("");
    setPeso("");
  };

  const removerCalculo = async (indice) => {
    if (window.confirm("Deseja remover este registro?")) {
      try {
        const response = await fetch(`http://localhost:3002/removeCalculoImc/${indice}`, {
          method: "DELETE",
        });
        const json = await response.json();
        alert(json.mensagem);
        getResultados();
      } catch (error) {
        console.error("Erro ao remover cálculo:", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Calculadora de IMC</h1>

      {}
      <div className="card p-4 mb-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Altura (m)</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              placeholder="Digite sua altura"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Peso (kg)</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              placeholder="Digite seu peso"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Calcular IMC</button>
        </form>
      </div>

      {}
      {resultado && (
        <div className="alert alert-info">
          <h4 className="alert-heading">Resultado</h4>
          <p><strong>Nome:</strong> {resultado.nome}</p>
          <p><strong>IMC:</strong> {resultado.imc}</p>
          <p><strong>Classificação:</strong> {resultado.classificacao}</p>
        </div>
      )}

      {}
      <h2 className="mt-5">Histórico de Cálculos</h2>
      {calculos.length === 0 ? (
        <p className="text-muted">Nenhum cálculo registrado.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Nome</th>
              <th>Altura</th>
              <th>Peso</th>
              <th>IMC</th>
              <th>Classificação</th>
              <th>Remover</th>
            </tr>
          </thead>
          <tbody>
            {calculos.map((calc, index) => (
              <tr key={index}>
                <td>{calc.nome}</td>
                <td>{calc.altura}</td>
                <td>{calc.peso}</td>
                <td>{calc.imc}</td>
                <td>{calc.classificacao}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removerCalculo(index)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ImcApp;

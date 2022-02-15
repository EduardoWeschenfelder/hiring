import React, { useState } from "react";
import "./App.css";

import api from "./services/api";

function App() {
  const [stock, setStock] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [qtdStock, setQtdStock] = useState("");

  async function handleSubmit(e: any) {
    // Prevent form to change to "next" page
    e.preventDefault();

    if (stock && !dateFrom && !dateTo) {
      const { data } = await api.get(`/stocks/${stock}/quote`);

      console.log(data);
    } else if (stock && dateFrom && dateTo) {
      const { data } = await api.get(
        `/stocks/${stock}/history?from=${dateFrom}&to=${dateTo}`
      );
      console.log(data);
    } else if (stock && dateFrom && qtdStock) {
      const { data } = await api.get(
        `/stocks/${stock}/gains?purchasedAmount=${qtdStock}&purchasedAt=${dateFrom}`
      );
      console.log(data);
    }

    // Clean fields
    setStock("");
    setDateFrom("");
    setDateTo("");
    setQtdStock("");
  }

  return (
    <div id="app">
      <form onSubmit={handleSubmit}>
        <div className="input-block">
          <label>
            * Informe o nome de um ativo:
            <input
              type="text"
              id="stock"
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </label>
        </div>

        <div className="input-block">
          <label>
            Informe uma data de inicio:
            <p>Use o formato: YYYY-MM-DD ex: 2022-02-16</p>
            <p> Observação a data inicial não deve ser maior que a final</p>
            <input
              type="text"
              id="from"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </label>
          <label>
            Informe uma data final:
            <input
              type="text"
              id="to"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </label>
        </div>
        <div className="input-block">
          <label>
            Informe a quantidade para calcular ganhos:
            <input
              type="number"
              id="to"
              value={qtdStock}
              onChange={(e) => setQtdStock(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
}

export default App;

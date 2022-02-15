import React, { useState } from "react";
import dayjs from "dayjs";

import api from "./services/api";
import { CSSProperties } from "react";

function App() {
  const [stock, setStock] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const butonStyles: CSSProperties = {
    backgroundColor: "#008CBA" /* Green */,
    border: "none",
    color: "white",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
  };

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
    }

    // Clean fields
    setStock("");
    setDateFrom("");
    setDateTo("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <div>
          <p>
            Use o formato: YYYY-MM-DD ex: 2022-02-16 Observação a data inicial
            não deve ser maior que a final
          </p>

          <label>
            Informe uma data de inicio:
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
        <input type="submit" style={butonStyles} value="Buscar" />
      </form>
    </div>
  );
}

export default App;

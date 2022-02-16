import React, { useState } from "react";

import "./App.css";
import api from "./services/api";
import { PlaceItem, HistoryItem, ProjectGains } from "./components/placeItem";

function App() {
  const [stock, setStock] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [qtdStock, setQtdStock] = useState("");

  const [search, setSeach] = useState({
    name: "",
    lastPrice: 0,
    pricedAt: "",
  });
  const [history, setHistory] = useState({
    name: "",
    prices: [],
  });
  const [projectGains, setProjectGains] = useState({
    capitalGains: 0,
    lastPrice: 0,
    name: "",
    priceAtDate: 0,
    purchasedAmount: 0,
    purchasedAt: "",
  });

  async function handleSubmit(e: any) {
    // Prevent form to change to "next" page
    e.preventDefault();
    // a cada busca limpa a busca anterior
    setSeach({
      name: "",
      lastPrice: 0,
      pricedAt: "",
    });
    setHistory({ name: "", prices: [] });
    setProjectGains({
      capitalGains: 0,
      lastPrice: 0,
      name: "",
      priceAtDate: 0,
      purchasedAmount: 0,
      purchasedAt: "",
    });

    if (stock && !dateFrom && !dateTo) {
      //busca simples cotação atual
      const { data } = await api.get(`/stocks/${stock}/quote`);
      setSeach(data);
    } else if (stock && dateFrom && dateTo) {
      //busca histórico de cota//busca simples cotaão atuação entre duas datas
      const { data } = await api.get(
        `/stocks/${stock}/history?from=${dateFrom}&to=${dateTo}`
      );
      setHistory(data);
    } else if (stock && dateFrom && qtdStock) {
      // busca projeção de ganhos ou perdas
      const { data } = await api.get(
        `/stocks/${stock}/gains?purchasedAmount=${qtdStock}&purchasedAt=${dateFrom}`
      );
      console.log(data);

      setProjectGains(data);
    }

    // Clean fields
    setStock("");
    setDateFrom("");
    setDateTo("");
    setQtdStock("");

    setHistory({ name: "", prices: [] });
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

      <div className="px-6 lg:px-8 mt-4 border-2 py-4">
        <p className="py-4">Resultado cota de um ativo:</p>
        {search.lastPrice !== 0 ? (
          <PlaceItem
            name={search.name}
            lastPrice={search.lastPrice.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
            pricedAt={search.pricedAt}
          />
        ) : null}
      </div>
      <div className="px-6 lg:px-8 mt-4 border-2 py-4">
        <p className="py-4">Resultado histórico entre duas datas:</p>
        <p>{history.name}</p>
        {history.prices.map((item: any) => {
          return (
            <HistoryItem
              closing={item.closing}
              high={item.high}
              low={item.low}
              opening={item.opening}
              pricedAt={item.pricedAt}
            />
          );
        })}
      </div>

      <div className="px-6 lg:px-8 mt-4 border-2 py-4">
        <p className="py-4">Resultado projeção de ganhos ou perdas</p>
        {projectGains.name !== "" ? (
          <ProjectGains
            capitalGains={projectGains.capitalGains}
            lastPrice={projectGains.lastPrice}
            name={projectGains.name}
            priceAtDate={projectGains.priceAtDate}
            purchasedAmount={projectGains.purchasedAmount}
            purchasedAt={projectGains.purchasedAt}
          />
        ) : null}
      </div>

      {/* <div className="px-6 lg:px-8 mt-4 border-2 py-4">
        <p>Resultado busca por Ação:</p>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {portifolio.map((item: any) => {
            return (
              <PlaceItem
                name={item.name}
                lastPrice={item.lastPrice.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
                pricedAt={item.pricedAt}
              />
            );
          })}
        </div>
      </div> */}
    </div>
  );
}

export default App;

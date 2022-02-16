import react, { useState, FC } from "react";
import "./App.css";

import api from "./services/api";

export const PlaceItem: FC<{
  name: string;
  lastPrice: number;
  pricedAt: string;
}> = ({ name, lastPrice, pricedAt }) => (
  // <a href={link} className="focus:outline-none">
  <div className="relative rounded-lg border border-gray-300 bg-gray-50 p-4 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 hover:shadow hover:bg-white">
    <div className="flex-1 min-w-0">
      <span className="absolute inset-0" aria-hidden="true" />
      <p className="text-sm font-medium text-gray-900">{name}</p>
      <p className="text-sm text-gray-500">{lastPrice}</p>
      <p className="text-sm text-gray-500">{pricedAt}</p>
    </div>
  </div>
  // </a>
);

function App() {
  const [stock, setStock] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [qtdStock, setQtdStock] = useState("");

  const portifolio: any = [
    { name: "IBM", lastPrice: 130.15, pricedAt: "2022-14-02" },
    { name: "TSCO.LON", lastPrice: 130.15, pricedAt: "2022-14-02" },
  ];

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

      <div className="px-6 lg:px-8 mt-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {portifolio.map((item: any) => {
            return (
              <PlaceItem
                name={item.name}
                lastPrice={item.lastPrice}
                pricedAt={item.pricedAt}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

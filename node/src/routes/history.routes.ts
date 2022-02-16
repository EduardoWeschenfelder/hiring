import { Router } from "express";
import axios from "axios";

const historyRoutes = Router();

historyRoutes.get("/:stock_name/history", async (req, res) => {
  const { stock_name } = req.params;
  const { from, to } = req.query;
  /* 
    obter de params as tadas para filtar o resultado
    - `from` - string com data em formato ISO 8601
    - `to` - string com data em format ISO 8601
  */

  const { data } = await axios(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock_name}&outputsize=full&apikey=6ISR17BLFDBXVXIY`
  );
  const arrayResult = Object.keys(data["Time Series (Daily)"]);
  const periodo = arrayResult.slice(
    arrayResult.indexOf(`${to}`),
    arrayResult.indexOf(`${from}`)
  );
  const prices = [];
  for await (const day of periodo) {
    const dataPrice = {
      opening: parseFloat(data["Time Series (Daily)"][`${day}`]["1. open"]),
      low: parseFloat(data["Time Series (Daily)"][`${day}`]["2. high"]),
      high: parseFloat(data["Time Series (Daily)"][`${day}`]["3. low"]),
      closing: parseFloat(data["Time Series (Daily)"][`${day}`]["4. close"]),
      pricedAt: day,
    };
    prices.push(dataPrice);
  }
  const formatData = {
    name: data["Meta Data"]["2. Symbol"],
    prices,
  };
  return res.json(formatData);
});

export { historyRoutes };

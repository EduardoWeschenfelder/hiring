import { Router } from "express";
import axios from "axios";

const ativos = [];

const routes = Router();

routes.get("/stocks/:stock_name/quote", async (req, res) => {
  const { stock_name } = req.params;
  const { data } = await axios(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock_name}&apikey=6ISR17BLFDBXVXIY`
  );
  const infoToday = Object.keys(data["Time Series (Daily)"])[0];
  const formatData = {
    name: data["Meta Data"]["2. Symbol"],
    lastPrice: data["Time Series (Daily)"][`${infoToday}`]["4. close"],
    pricedAt: infoToday,
  };
  return res.json(formatData);
});

routes.get("/stocks/:stock_name/history", async (req, res) => {
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
      opening: data["Time Series (Daily)"][`${day}`]["1. open"],
      low: data["Time Series (Daily)"][`${day}`]["2. high"],
      high: data["Time Series (Daily)"][`${day}`]["3. low"],
      closing: data["Time Series (Daily)"][`${day}`]["4. close"],
    };
    prices.push(dataPrice);
  }
  const formatData = {
    name: data["Meta Data"]["2. Symbol"],
    prices,
  };
  return res.json(formatData);
});

routes.get("/stocks/:stock_name/compare", async (req, res) => {
  const { stock_name } = req.params;
  /* 
    comparar uma ação com uma lista de outras 
    - pode ser feito com os ativos "salvos"
  */
  const { data } = await axios(`
  https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock_name}&apikey=6ISR17BLFDBXVXIY
  `);
});

routes.get("/stocks/:stock_name/gains", async (req, res) => {
  const { stock_name } = req.params;
  const { purchasedAmount, purchasedAt } = req.query;

  const qtdStock = parseInt(`${purchasedAmount}`, 10);

  const { data } = await axios(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock_name}&outputsize=full&apikey=6ISR17BLFDBXVXIY`
  );
  const infoRecent = Object.keys(data["Time Series (Daily)"])[0];
  const valueOld = data["Time Series (Daily)"][`${purchasedAt}`]["4. close"];
  const valueNow = data["Time Series (Daily)"][`${infoRecent}`]["4. close"];

  const returnGains = ((valueNow - valueOld) * qtdStock).toLocaleString(
    "pt-br",
    {
      style: "currency",
      currency: "BRL",
    }
  );
  const formatData = {
    name: data["Meta Data"]["2. Symbol"],
    purchasedAmount: qtdStock,
    purchasedAt,
    priceAtDate: valueOld,
    lastPrice: valueNow,
    capitalGains: returnGains,
  };

  return res.json(formatData);
});

export { routes };

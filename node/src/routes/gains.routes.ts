import { Router } from "express";
import axios from "axios";

const gainsRoutes = Router();

gainsRoutes.get("/:stock_name/gains", async (req, res) => {
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
    priceAtDate: parseFloat(valueOld),
    lastPrice: parseFloat(valueNow),
    capitalGains: returnGains,
  };

  return res.json(formatData);
});

export { gainsRoutes };

import { Router } from "express";
import axios from "axios";

const quoteRoutes = Router();

quoteRoutes.get("/:stock_name/quote", async (req, res) => {
  const { stock_name } = req.params;
  const { data } = await axios(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock_name}&apikey=6ISR17BLFDBXVXIY`
  );
  const infoToday = Object.keys(data["Time Series (Daily)"])[0];
  const formatData = {
    name: data["Meta Data"]["2. Symbol"],
    lastPrice: parseFloat(
      data["Time Series (Daily)"][`${infoToday}`]["4. close"]
    ),
    pricedAt: infoToday,
  };
  return res.json(formatData);
});

export { quoteRoutes };

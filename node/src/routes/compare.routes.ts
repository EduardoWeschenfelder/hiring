import { Router } from "express";
import axios from "axios";

const compareRoutes = Router();

compareRoutes.post("/:stock_name/compare", async (req, res) => {
  const { stock_name } = req.params;
  const { arayStock } = req.body;
  const lastPrices = [];
  let stocks = `${arayStock}`.replace(/\s/g, "").split(",");
  stocks = stocks.concat(stock_name);
  console.log({ stocks });

  for await (const stock of stocks) {
    const { data } = await axios(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=6ISR17BLFDBXVXIY`
    );
    const infoToday = Object.keys(data["Time Series (Daily)"])[0];
    const formatData = {
      name: data["Meta Data"]["2. Symbol"],
      lastPrice: parseFloat(
        data["Time Series (Daily)"][`${infoToday}`]["4. close"]
      ),
      pricedAt: infoToday,
    };
    lastPrices.push(formatData);
  }

  return res.json({ lastPrices });
});

export { compareRoutes };

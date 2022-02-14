import { Router } from "express";
import axios from "axios";

const routes = Router();

routes.get("/stocks/:stock_name/quote", async (req, res) => {
  const { stock_name } = req.params;
  const { data } = await axios(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock_name}&apikey=6ISR17BLFDBXVXIY`
  );

  return res.json(data);
});

export { routes };

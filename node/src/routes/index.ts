import { Router } from "express";
import { quoteRoutes } from "./quote.routes";
import { historyRoutes } from "./history.routes";
import { gainsRoutes } from "./gains.routes";

const routes = Router();

routes.use("/stocks", quoteRoutes, historyRoutes, gainsRoutes);

// routes.get("/stocks/:stock_name/history");

// routes.get("/stocks/:stock_name/compare");

// routes.get("/stocks/:stock_name/gains");

export { routes };

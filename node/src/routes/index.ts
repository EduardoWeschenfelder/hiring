import { Router } from "express";
import { quoteRoutes } from "./quote.routes";
import { historyRoutes } from "./history.routes";
import { gainsRoutes } from "./gains.routes";
import { compareRoutes } from "./compare.routes";

const routes = Router();

routes.use("/stocks", quoteRoutes, historyRoutes, gainsRoutes, compareRoutes);

export { routes };

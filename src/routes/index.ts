import { Router } from "express";
import { urlRoutes } from "./url.routes";

export const routes = Router()

routes.use("/urls", urlRoutes)
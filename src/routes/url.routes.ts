import { Router } from "express";
import { CreateUrlController } from "../modules/Url/createUrl/CreateUrlController";
import { FindUrlController } from "../modules/Url/findUrl/FindUrlController";

export const urlRoutes = Router()

const createUrlController = new CreateUrlController()
const findUrlController = new FindUrlController()

urlRoutes.post("", createUrlController.handle)
urlRoutes.get("/:code", findUrlController.handle)
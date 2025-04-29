import { Router } from "express";
import { CreateUrlController } from "../modules/Url/createUrl/CreateUrlController";

export const urlRoutes = Router()

const createUrlController = new CreateUrlController()

urlRoutes.post("", createUrlController.handle)
urlRoutes.get("/:id", )
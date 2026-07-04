import { object, string } from "yup";
import { CreateUrlUseCase } from "./CreateUrlUseCase";
import { Request, Response } from "express";
import { validate } from "../../../utils/validate";

export class CreateUrlController {
    async handle(req: Request, res: Response) {
        const {
            urlToShorten
        } = req.body

        const schema = object({
            urlToShorten: string()
                .url("É necessário uma URL válida")
                .typeError("A URL a ser encurtada deve ser uma string")
                .required("A URL a ser encurtada é obrigatória")
        })

        const data = await validate(schema, { urlToShorten });
        
        const createUrlUseCase = new CreateUrlUseCase()
        const result = await createUrlUseCase.execute(data)
        res.json(result)
    }
}
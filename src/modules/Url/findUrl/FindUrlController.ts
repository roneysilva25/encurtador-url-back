import { Request, Response } from "express";
import { object, string } from "yup";
import { FindUrlUseCase } from "./FindUrlUseCase";
import { validate } from "../../../utils/validate";

export class FindUrlController {
    async handle(req: Request, res: Response) {
        const {
            code
        } = req.params

        const schema = object({
            code: string()
                .typeError("O código da URL encurtada deve ser uma string")
                .required("O código da URL encurtada é obrigatório")
        })

        const data = await validate(schema, { code })

        const findUrlUseCase = new FindUrlUseCase()
        const results = await findUrlUseCase.execute(data)
        res.json(results)
    }
}
import { NextFunction, Request, Response } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof Error) {
        const errObj = err as Error
        res.status(400).json({
            message: errObj.message
        })
    }

    res.status(500).json({
        message: "Houve um erro inesperado"
    })
}
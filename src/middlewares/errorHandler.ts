import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HttpError) {
        if (err.isOperational) {
            console.warn(err.message, err.errorCode, err.details)
        } else {
            console.error(err.message, err.errorCode, err.details, err.stack)
        }

        res.status(err.statusCode).json({
            message: err.message,
        });
        return;
    }

    console.error(err.message, err.stack)
    res.status(500).json({
        message: "Houve uma falha inesperada",
    });
}
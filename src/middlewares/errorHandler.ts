import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HttpError) {
        if (err.isOperational) {
            console.warn({
                message: err.message, 
                errorCode: err.errorCode, 
                details: err.details,
                statusCode: err.statusCode,
                path: req.path,
            });
        } else {
            console.error({
                message: err.message, 
                errorCode: err.errorCode, 
                details: err.details, 
                stack: err.stack,
                statusCode: err.statusCode,
                path: req.path,
            });
        }

        res.status(err.statusCode).json({
            message: err.message,
        });
        return;
    }

    console.error("Houve uma falha inesperada", {
        message: err.message, 
        stack: err.stack,
        path: req.path,
    });
    
    res.status(500).json({
        message: "Houve uma falha inesperada",
    });
}
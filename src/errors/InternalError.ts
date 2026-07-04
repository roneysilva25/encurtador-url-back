import { ErrorCodes, HttpError } from "./index";

export class InternalError extends HttpError {
    constructor(message?: string, details?: unknown) {
        super(message ?? "Erro interno.", {
            errorCode: ErrorCodes.INTERNAL_ERROR,
            statusCode: 500,
            details, 
            isOperational: false,
        });
    }
}
import { ErrorCodes, HttpError } from "./index";

export class NotFoundError extends HttpError {
    constructor(message?: string, details?: unknown) {
        super(message ?? "Recurso não encontrado.", {
            statusCode: 404,
            errorCode: ErrorCodes.NOT_FOUND,
            details,
        });
    }
}
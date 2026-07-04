import { ErrorCodes } from "./AppError";
import { HttpError } from "./HttpError";

export class ValidationError extends HttpError {
    constructor(message?: string, details?: unknown) {
        super(message ?? "Dados inválidos.", {
            statusCode: 422,
            errorCode: ErrorCodes.VALIDATION_ERROR,
            details,
        });
    }
}

import { ErrorCodes, HttpError } from "./index";

export class UnauthorizedError extends HttpError {
    constructor(message?: string, details?: unknown) {
        super(message ?? "Você não possui autorização para acessar este recurso.", {
            errorCode: ErrorCodes.UNAUTHORIZED,
            statusCode: 401,
            details,
        });
    }
}
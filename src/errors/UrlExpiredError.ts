import { ErrorCodes, HttpError } from "./index";

export class UrlExpiredError extends HttpError {
    constructor(message?: string, details?: unknown) {
        super(message ?? "URL expirada.", {
            statusCode: 410,
            errorCode: ErrorCodes.URL_EXPIRED,
            details,
        });
    }
}
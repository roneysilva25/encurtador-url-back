export const ErrorCodes = {
    URL_EXPIRED: "URL_EXPIRED",
    NOT_FOUND: "NOT_FOUND",
    UNAUTHORIZED: "UNAUTHORIZED",
    INTERNAL_ERROR: "INTERNAL_ERROR",
    VALIDATION_ERROR: "VALIDATION_ERROR",
} as const;

export type AppErrorOptions = {
    errorCode: string;
    isOperational?: boolean;
    details?: unknown;
}

export class AppError extends Error {
    public readonly errorCode: string;
    public readonly isOperational: boolean;
    public readonly details: unknown;
    
    constructor(message: string, {
        errorCode,
        isOperational = true,
        details,
    }: AppErrorOptions) {
        super(message)
        this.errorCode = errorCode;
        this.isOperational = isOperational;
        this.details = details;

        Error.captureStackTrace(this, this.constructor);
    }
}
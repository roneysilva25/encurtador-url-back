import { AppError, type AppErrorOptions } from "./index";

interface HttpErrorOptions extends AppErrorOptions {
    statusCode: number;
}

export class HttpError extends AppError {
    public readonly statusCode: number;

    constructor(message: string, options: HttpErrorOptions) {
        super(message, options);
        this.statusCode = options.statusCode;
    }
}
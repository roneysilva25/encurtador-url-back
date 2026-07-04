import { Schema, ValidationError as YupValidationError } from "yup";
import { ValidationError } from "../errors";

export async function validate<T>(schema: Schema<T>, data: unknown): Promise<T> {
    try {
        return await schema.validate(data);
    } catch (err) {
        if (err instanceof YupValidationError) {
            throw new ValidationError(err.message, { details: err.errors });
        }
        throw err;
    }
}

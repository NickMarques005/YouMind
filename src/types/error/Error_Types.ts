export type ErrorResponse = string;

export type HandleError = (message: string) => void;

export type HandleErrors = (field: string, message: string, errors: Errors) => void;

export type FieldErrorNames = string[];

export interface Errors {
    [key: string]: string;
}

export type ClearError = (field: string) => void

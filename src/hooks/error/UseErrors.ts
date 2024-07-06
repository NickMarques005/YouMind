import { useState } from "react";
import { Errors, FieldErrorNames } from "types/error/Error_Types";


export const UseErrors = (initialFields: FieldErrorNames) => {

    const CreateInitialErrors = (fields: FieldErrorNames): Errors => {
        const initialErrors: Errors = {};
        fields.forEach((field) => {
            initialErrors[field] = "";
        });
        return initialErrors;
    };

    const [errors, setErrors] = useState<Errors>(CreateInitialErrors(initialFields));

    const HandleErrors = (field: string, message: string, errors: Errors) => {
        console.log("HANDLE ERRORS");
        console.log(field, message);
        console.log(errors);
        if (errors.hasOwnProperty(field)) {
            setErrors(prevErrors => ({ ...prevErrors, [field]: message }));
        }
    };

    const ClearError = (field: string) => {
        if (errors.hasOwnProperty(field)) {
            setErrors(prevErrors => ({ ...prevErrors, [field]: "" }));
        }
    };

    const ClearAllErrors = () => {
        setErrors(CreateInitialErrors(initialFields));
    };

    return { errors, HandleErrors, ClearError, ClearAllErrors };
}
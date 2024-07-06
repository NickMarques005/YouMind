import { useState } from "react"


export const UseResponseError = () => {
    const [responseError, setResponseError] = useState('');

    const ClearResponseError = () => {
        setResponseError("");
    }

    const HasError = (error: string) => {
        return !!error; 
    }

    const HandleResponseError = (value: string) => {
        setResponseError(value);
    }

    return { responseError, HasError, HandleResponseError, ClearResponseError}
}
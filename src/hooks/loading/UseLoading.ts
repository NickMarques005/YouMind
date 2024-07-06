import { useState } from "react"

export const UseLoading = (value?: boolean) => {
    const initialValue = value ? value : false;

    const [loading, setLoading] = useState(initialValue);

    return { loading, setLoading }
}
import { useState } from "react";

export const UseHandleProfileDetails = () => {
    const [showGenderOptions, setShowGenderOptions] = useState(false);

    const handleGenderOptions = (value: boolean) => {
        setShowGenderOptions(value);
    }

    return { showGenderOptions, handleGenderOptions }
}
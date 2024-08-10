import { useState } from "react";
import { UserDataToUpdate } from "./UseUpdateProfileData";

interface UseHandleProfileDetailsProps {
    userDataToUpdate: UserDataToUpdate;
}

export const UseHandleProfileDetails = ({ userDataToUpdate }: UseHandleProfileDetailsProps) => {
    const [showGenderOptions, setShowGenderOptions] = useState(false);

    const handleGenderOptions = (value: boolean) => {
        setShowGenderOptions(value);
    }

    return { showGenderOptions, handleGenderOptions }
}
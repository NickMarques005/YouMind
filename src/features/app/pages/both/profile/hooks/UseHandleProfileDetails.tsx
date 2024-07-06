import { useState } from "react"
import { UpdateUserData } from "types/user/User_Types";
import { UserDataToUpdate } from "./UseUpdateProfileData";
import { FormatStringToISODate } from "@utils/date/DateFormatting";
import { FormatDate } from "@utils/user/DataFormatting";


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
import { FormData } from "types/auth/Form_Types";
import { useEffect, useState } from "react";
import { UserType } from "types/user/User_Types";
import { ClearError } from "types/error/Error_Types";

export const UseLoginFormData = (userType: UserType, ClearError: ClearError) => {

    const initialState = {
        email: '',
        password: '',
    };

    const [formData, setFormData] = useState<FormData>(initialState);
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (value: string, field: keyof FormData, error: string) => {
        if (error) {
            ClearError(field);
        }

        setFormData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    }

    const handlePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return { formData, showPassword, handleInputChange, handlePasswordVisibility, }
}
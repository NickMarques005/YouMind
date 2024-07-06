import { useState } from 'react';
import { FormatCRM, FormatPhone } from '@utils/user/DataFormatting';
import { UserType } from 'types/user/User_Types';
import { FormData } from 'types/auth/Form_Types';
import { ClearError } from 'types/error/Error_Types';

export const UseRegisterFormData = (userType: UserType, ClearError: ClearError) => {

    const initialState = {
        name: '',
        email: '',
        password: '',
        phone: '',
        ...userType === 'doctor' && { doctor_crm: '' }
    };

    const [formData, setFormData] = useState<FormData>(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [prevPhone, setPrevPhone] = useState('');

    const handleInputChange = (value: string, field: keyof FormData, error: string) => {
        if (error) {
            ClearError(field);
        }

        let formattedValue = value;

        switch (field) {
            case "phone":
                formattedValue = FormatPhone(value, prevPhone);
                setPrevPhone(formattedValue);
                break;
            case "doctor_crm":
                formattedValue = FormatCRM(value);
                break;
            default:
                break;
        }

        setFormData(prevData => ({
            ...prevData,
            [field]: formattedValue,
        }));
    };

    const handlePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return { formData, handleInputChange, handlePasswordVisibility, showPassword };
};
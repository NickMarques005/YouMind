import { MessageIcon } from '@components/modals/message/types/type_message_modal';
import { HandleValidation } from '@features/auth/hooks/UseValidation';
import { UseAuthService } from '@hooks/api/UseAuthService';
import { EmailValidation } from '@utils/user/DataValidation';
import { SetStateAction, useEffect, useState } from 'react';
import { FormData } from 'types/auth/Form_Types';
import { ClearError, Errors, HandleError } from 'types/error/Error_Types';
import { UserType } from 'types/user/User_Types';

export const UseForgotPassword = (HandleResponseError: HandleError,
    setLoading: React.Dispatch<SetStateAction<boolean>>,
    userType: UserType,
    HandleMessage: (msg: string, messageType: MessageIcon) => void,
    isVisible: boolean,
    HandleErrors: (field: string, message: string, errors: Errors) => void,
    errors: Errors,
    ClearError: ClearError,) => {

    const [email, setEmail] = useState('');
    const { performForgotPass } = UseAuthService(setLoading);

    const HandleEmailChange = (value: string) => {
        ClearError('email');
        setEmail(value);
    }

    const handleSendEmail = async () => {
        const formData: FormData = { email }
        const validationErrors = HandleValidation(formData, userType);

        if (validationErrors !== true) {
            Object.entries(validationErrors).forEach(([field, message]) => {
                HandleErrors(field, message, errors);
            });
            return;
        }

        try {
            const validateEmail = EmailValidation(email);
            if (!validateEmail) {
                return console.log("Email inválido");
            }

            if (!userType) return HandleResponseError("Error: tipo de usuário indefinido");

            const data = {
                email: email
            }

            const response = await performForgotPass(data, userType);
            if (response.success) {
                console.log(response);
                const message = response.message;
                const type  = response.type;
                if (message) {
                    HandleMessage(message, type as MessageIcon);
                }

                return;
            }

            if (response.error) {
                const responseError = response.error;
                console.log(responseError);
                HandleResponseError(responseError);
            }
        }
        catch (err) {
            console.log("Login Error: ", err);
            const error = `Request Error: ${err}`;
            HandleResponseError(error);
        }
    };

    useEffect(() => {
        if (email) return setEmail('');
    }, [isVisible]);

    return {
        email,
        HandleEmailChange,
        handleSendEmail
    };
};
import { UserType } from 'types/user/User_Types';
import { FormData } from 'types/auth/Form_Types';
import { HandleValidation } from '@features/auth/hooks/UseValidation';
import { Errors, HandleErrors } from 'types/error/Error_Types';
import { UseAuthService } from '@hooks/api/UseAuthService';
import { UseNavigateOnSuccess } from '@hooks/navigation/UseNavigateSuccess';
import { UnformatPhoneNumber } from '@utils/user/DataFormatting';

export const UseSignUp = (formData: FormData, userType: UserType, HandleErrors: HandleErrors, errors: Errors, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setResponseError: (value: string) => void) => {
    const { authNavigateOnSuccess } = UseNavigateOnSuccess();
    const { performRegister } = UseAuthService(setLoading);

    const HandleSignUp = async () => {
        const validationForm = HandleValidation(formData, userType);

        if (validationForm !== true) {
            Object.entries(validationForm).forEach(([field, message]) => {
                HandleErrors(field, message, errors);
            });
            return;
        }

        const registerData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: UnformatPhoneNumber(formData.phone as string),
            ...userType === 'doctor' && {doctor_crm: formData.doctor_crm}
        }

        try {
            if(!userType) return setResponseError("Error: tipo de usuário indefinido");

            const response = await performRegister(registerData, userType);
            if (response.success) {
                console.log(response.message);
                authNavigateOnSuccess('otp', { data: { 
                    userId: response.data?._id,
                    type: response.data?.type
                }, message: response.message, type: response.type});
            }

            if (response.error) {
                const responseError = response.error;
                console.log(responseError);
                setResponseError(responseError);
            }
        }
        catch (err) {
            console.log("SignUp Error: ", err);
            const error = `Request Error: ${err}`;
            setResponseError(error);
        }
    }

    return { HandleSignUp };
};


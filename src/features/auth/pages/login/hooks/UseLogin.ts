import { HandleValidation } from "@features/auth/hooks/UseValidation";
import { Errors, HandleErrors } from "types/error/Error_Types";
import { FormData } from "types/auth/Form_Types";
import { UserType } from "types/user/User_Types"
import { UseAuthService } from "@hooks/api/UseAuthService";
import { UseNavigateOnSuccess } from "@hooks/navigation/UseNavigateSuccess";
import { MessageIcon } from "@components/modals/message/types/type_message_modal";

type OTPVerification = {
    otp?: boolean;
    _id?: string;
    type?: string;
}

interface AuthProps {
    formData: FormData;
    userType: UserType;
    rememberMe: boolean;
}

interface ErrorHandling {
    HandleErrors: HandleErrors;
    errors: Errors;
}

interface LoadingControl {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ResponseHandling {
    HandleResponseError: (value: string) => void;
}

interface UseLoginProps {
    authProps: AuthProps;
    errorHandling: ErrorHandling;
    loadingControl: LoadingControl;
    responseHandling: ResponseHandling;
}


export const UseLogin = ({
    authProps,
    errorHandling,
    loadingControl,
    responseHandling,
}: UseLoginProps) => {

    const { formData, userType, rememberMe } = authProps;
    const { errors, HandleErrors } = errorHandling;
    const { HandleResponseError } = responseHandling;
    const { setLoading } = loadingControl;
    const validationForm = HandleValidation(formData, userType);

    const { performLogin } = UseAuthService(setLoading);
    const { authNavigateOnSuccess } = UseNavigateOnSuccess();

    const HandleLogin = async () => {

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
            phone: formData.phone,
            ...userType === 'doctor' && { doctor_crm: formData.doctor_crm }
        }

        try {
            if (!userType) return HandleResponseError("Error: tipo de usuário indefinido");

            const response = await performLogin(registerData, userType);
            if (response.success) {
                console.log(response);
                console.log("AUTENTICADO!!");
            }

            if (response.error) {
                if (response.data) {
                    const data: OTPVerification = response.data;
                    console.log(data);
                    authNavigateOnSuccess('otp', {
                        data: {
                            userId: response.data?._id,
                            type: response.data?.type
                        },
                        message: response.message,
                        type: response.type
                    });
                    return;
                }

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
    }

    return { HandleLogin }
}
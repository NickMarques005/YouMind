import { HandleError } from 'types/error/Error_Types';
import { Keyboard } from 'react-native';
import { UseAuthService } from '@hooks/api/UseAuthService';
import { SetStateAction } from 'react';
import { UserType } from 'types/user/User_Types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AuthStackParamList } from '../components/OtpForm';
import { UseNavigateOnSuccess } from '@hooks/navigation/UseNavigateSuccess';

export interface OtpReceiveParams {
        params: {
            data: {
                userId: string;
                type: string;
            }
        }
}

const UseVerifyAccount = (setResponseError: HandleError, setLoading: React.Dispatch<SetStateAction<boolean>>, userType: UserType) => {
    const route = useRoute<RouteProp<AuthStackParamList, 'otp'> & { params?: OtpReceiveParams }>();

    const { performValidateOTP } = UseAuthService(setLoading);
    const { authNavigateOnSuccess } = UseNavigateOnSuccess();

    const isObjValid = (obj: Record<number, string>) => {
        return Object.values(obj).every((val) => val.trim());
    };

    const SubmitOTP = async (OTP: Record<number, string>) => {
        Keyboard.dismiss();
        if (!isObjValid(OTP)) {

            setResponseError('Complete todos os campos para enviar o OTP!');
            return;
        }

        console.log('OTP válido: ', OTP);
        let otpResult = '';

        Object.values(OTP).forEach(value => {
            otpResult += value;
        })

        try {
            if (!userType) return setResponseError("Error: tipo de usuário indefinido");

            console.log("Dados: ", route.params);

            const { params } = route.params;
            if (!params || !params.data || !params.data.type || !params.data.userId) {
                return setResponseError("Dados de usuário para verificação de conta inválidos. Tente novamente");
            }

            const { data } = params;

            const otpData = {
                otp: otpResult,
                userId: data.userId,
            }

            console.log("OTP DATA: ", otpData);

            const response = await performValidateOTP(otpData, data.type)
            if (response.success) {
                console.log(response.message);
                return authNavigateOnSuccess('login', { message: response.message, type: response.type })
            }

            if (response.error) {
                const responseError = response.error;
                console.log(responseError);
                setResponseError(responseError);
            }
        }
        catch (err) {
            console.log("Otp Error: ", err);
            const error = `Request Error: ${err}`;
            setResponseError(error);
        }


    };

    return { isObjValid, SubmitOTP };
};

export default UseVerifyAccount;
import { UseAuthService } from '@hooks/api/UseAuthService';
import { SetStateAction, useState } from 'react';
import { HandleError } from 'types/error/Error_Types';
import { UserType } from 'types/user/User_Types';
import { AuthStackParamList } from '../components/OtpForm';
import { OtpReceiveParams } from './UseVerifyAccount';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MessageIcon } from '@components/modals/message/types/type_message_modal';

const UseResendOTP = (HandleError: HandleError, 
    setLoading: React.Dispatch<SetStateAction<boolean>>, 
    userType: UserType, 
    HandleMessage: (msg: string, messageType: MessageIcon) => void,) => {
    const route = useRoute<RouteProp<AuthStackParamList, 'otp'> & { params?: OtpReceiveParams }>();

    const [showResendOtp, setShowResendOtp] = useState(false);
    const { performRenewOTP } = UseAuthService(setLoading);

    const HandleResendOTP = async () => {

        console.log("RESEND OTP!");
        try {
            if (!userType) return HandleError("Error: tipo de usuário indefinido");
            const { params } = route.params;
            if (!params || !params.data || !params.data.type || !params.data.userId) {
                return HandleError("Dados de usuário para verificação de conta inválidos. Tente novamente");
            }

            const { data } = params;

            const otpData = {
                userId: data.userId,
            }

            const response = await performRenewOTP(otpData, userType);
            if (response.success) {
                if (response.message) {
                    const message = response.message;
                    const type = response.type;
                    console.log("Mensagem: ", message);
                    console.log("Tipo: ", type);
                    HandleMessage(message, type as MessageIcon);
                }
                return;
            }

            if (response.error) {
                const responseError = response.error;
                console.log(responseError);
                return HandleError(responseError);
            }
        }
        catch (err) {
            console.log("SignUp Error: ", err);
            const error = `Request Error: ${err}`;
            HandleError(error);
        }
    };

    return { showResendOtp, setShowResendOtp, HandleResendOTP };
};

export default UseResendOTP;
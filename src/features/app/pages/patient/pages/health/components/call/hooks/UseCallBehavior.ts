import { useEffect, useState } from "react";
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

interface UseCallBehaviorParams {
    HandleResponseAppError: (value: string) => void;
}

const useCallBehavior = ({ HandleResponseAppError }: UseCallBehaviorParams) => {

    const makeCall = (number: string) => {
        try {
            console.log("MAKE CALL!!");
            RNImmediatePhoneCall.immediatePhoneCall(number);
        } catch (err) {
            const error = err as Error;
            console.error('Falha ao realizar a chamada:', err);
            HandleResponseAppError(`Falha ao realizar a chamada: ${error.message}`);
        }
    }

    return { makeCall }
}

export default useCallBehavior;
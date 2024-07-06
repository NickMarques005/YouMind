import { useState, useRef, RefObject, useEffect } from 'react';
import { TextInput } from 'react-native';

const useOTPInput = (inputLength: number) => {

    const [OTP, setOTP] = useState<Record<number, string>>(() =>
        Array.from({ length: inputLength }, () => '').reduce((acc, _, i) => ({ ...acc, [i]: '' }), {})
    );

    const inputReferences: RefObject<TextInput>[] = Array.from({ length: inputLength }, () => useRef<TextInput>(null));

    const [nextInputIndex, setNextInputIndex] = useState(0);

    useEffect(() => {
        if (inputReferences[nextInputIndex] && inputReferences[nextInputIndex].current) {
            inputReferences[nextInputIndex].current?.focus();
        }
    }, [nextInputIndex]);

    const handleChangeOTP = (text: string, index: number) => {
        const newOTP = { ...OTP };
        newOTP[index] = text;
        setOTP(newOTP);

        const lastInputIndex = inputLength - 1;

        if (text) {
            if (index < lastInputIndex) {
                setNextInputIndex(index + 1);
            }
        } else {
            if (index > 0) {
                setNextInputIndex(index - 1);
            }
        }
    };

    return { OTP, inputReferences, nextInputIndex, handleChangeOTP };
};

export default useOTPInput;
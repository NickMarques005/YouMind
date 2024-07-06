import React, { SetStateAction, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import OtpInputs from './OtpInputs';
import { otp_form_style } from '../styles/OtpForm';
import useOTPInput from '../hooks/UseOTPInput';
import UseVerifyAccount from '../hooks/UseVerifyAccount';
import CustomButton from '@components/button/CustomButton';
import { RouteProp, useRoute } from '@react-navigation/native';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';
import { UseNavigateOnSuccess } from '@hooks/navigation/UseNavigateSuccess';
import DefaultLoading from '@components/loading/DefaultLoading';

interface OtpFormProps {
    HandleError: (value: string) => void;
    setLoading: React.Dispatch<SetStateAction<boolean>>;
    loading: boolean;
}

export type AuthStackParamList = {
    otp: {
        data?: any;
    }
}

const OtpForm: React.FC<OtpFormProps> = ({ HandleError, setLoading, loading }) => {

    const TOTAL_INPUTS = 4;
    const { userType } = UseAuth();
    const styles = otp_form_style();
    const { OTP, inputReferences, nextInputIndex, handleChangeOTP } = useOTPInput(TOTAL_INPUTS);
    const { SubmitOTP } = UseVerifyAccount(HandleError, setLoading, userType);
    const inputs = Array(TOTAL_INPUTS).fill('');

    return (
        <View style={styles.formOtp}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>PIN enviado ao seu e-mail! Por favor, verifique seu endereço de e-mail.</Text>
            </View>
            <OtpInputs inputs={inputs} OTP={OTP} onInputChange={handleChangeOTP} inputRefs={inputReferences} />
            <View style={styles.buttonContainer} >
                <CustomButton loading={
                    loading ? <DefaultLoading color={"white"} size={30} /> : undefined
                } disabled={loading} onPress={() => SubmitOTP(OTP)} buttonStyle={styles.button}>
                    <Icon name="checkmark-outline" style={styles.submitIcon} size={30} color="#FFF" />
                </CustomButton>
            </View>

        </View>
    );
};

export default OtpForm;
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '@components/button/CustomButton';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { resend_otp_style } from '../styles/ResendOtp';
import ResendButton from './ResendButton';
import UseResendOTP from '../hooks/UseResendOTP';
import { UseLoading } from '@hooks/loading/UseLoading';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';
import { MessageIcon } from '@components/modals/message/types/type_message_modal';

interface ResendOTPProps {
    HandleError: (value: string) => void;
    validateLoading: boolean;
    HandleMessage: (msg: string, messageType: MessageIcon) => void;
}

const ResendOtp = ({ HandleError, validateLoading, HandleMessage }: ResendOTPProps) => {
    const styles = resend_otp_style();
    const { userType } = UseAuth();
    const { loading, setLoading } = UseLoading();
    const { HandleResendOTP, setShowResendOtp, showResendOtp } = UseResendOTP(HandleError, setLoading, userType, HandleMessage);
    
    return (
        <View style={styles.container}>
            <View style={styles.viewCallResend}>
                <Text style={styles.textCallResend}>Não recebeu o código?</Text>
                <CustomButton
                    title="Reenviar"
                    onPress={() => setShowResendOtp(prev => !prev)}
                    buttonStyle={styles.buttonCallResend}
                    textStyle={styles.textButtonCallResend}
                    disabled={loading}
                />
            </View>

            <ResendButton
                onPress={() => HandleResendOTP()}
                loading={loading}
                visible={showResendOtp}
                validateLoading={validateLoading}
            />
        </View>
    );
};

export default ResendOtp;
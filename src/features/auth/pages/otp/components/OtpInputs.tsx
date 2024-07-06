import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { otp_inputs_style } from '../styles/OtpInputs';
import CustomTextInput from '@components/text_input/CustomInput';

interface OtpInputsProps {
    inputs: string[];
    OTP: Record<number, string>;
    onInputChange: (text: string, index: number) => void;
    inputRefs: React.RefObject<TextInput>[];
}

const OtpInputs: React.FC<OtpInputsProps> = ({ inputs, OTP, onInputChange, inputRefs }) => {
    const styles = otp_inputs_style();

    return (
        <View style={styles.otpContainer}>
            {inputs.map((input, index) => (
                <TextInput
                    key={index.toString()}
                    keyboardType='numeric'
                    maxLength={1}
                    style={styles.input}
                    value={OTP[index]}
                    onChangeText={(text) => onInputChange(text, index)}
                    ref={inputRefs[index]}
                    placeholder={'*'}
                    placeholderTextColor={"rgba(183, 118, 207, 0.2)"}
                />
            ))}
        </View>
    );
};

export default OtpInputs;
import React, { useState } from 'react';
import { View } from 'react-native';
import CustomButton from '@components/button/CustomButton';
import { register_form_style } from '../styles/Form';
import images from '@assets/images';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';
import RegisterInputs from './RegisterInputs';
import { UseRegisterFormData } from '../hooks/UseFormData';
import { UseSignUp } from '../hooks/UseSignUp';
import { GetRegisterFormFields } from '@features/auth/hooks/UseFormFields';
import DefaultLoading from '@components/loading/DefaultLoading';
import { ClearError, Errors } from 'types/error/Error_Types';

interface FormProps {
    HandleErrors: (field: string, message: string, errors: Errors) => void;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    errors: Errors;
    ClearError: ClearError;
    setResponseError: (value: string) => void;
}

const Form = ({ HandleErrors, setLoading, loading, errors, ClearError, setResponseError }: FormProps) => {
    const { userType } = UseAuth();
    const styles = register_form_style(userType);
    const registerButton = userType === 'doctor' ? images.generic_images.auth.doctor.doctor_button_auth : images.generic_images.auth.patient.patient_button_auth;
    const formFields = GetRegisterFormFields(userType);
    const { formData, handleInputChange, handlePasswordVisibility, showPassword } = UseRegisterFormData(userType, ClearError);
    const { HandleSignUp } = UseSignUp(formData, userType, HandleErrors, errors, setLoading, setResponseError);

    return (
        <View style={styles.form}>
            <View style={styles.inputsMainView}>
                <RegisterInputs 
                    formFields={formFields}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handlePasswordVisibility={handlePasswordVisibility}
                    showPassword={showPassword}
                    styles={styles}
                    iconColor={userType === 'doctor' ? "#58878c" : "#7c5a8f"}
                    placeholderColor={`${userType === 'doctor' ? 'rgba(76, 108, 120, 0.5)' : 'rgba(110, 76, 120, 0.5)'}`}
                    editable={!loading}
                    errors={errors}
                />
            </View>
            <CustomButton
                title="CADASTRAR"
                onPress={HandleSignUp}
                buttonStyle={styles.registerButton}
                textStyle={styles.registerButtonText}
                image={registerButton}
                imageStyle={styles.imageButton}
                disabled={loading}
                loading={
                    loading ? <DefaultLoading color ={"white"} size={30}/> : undefined
                }
            />
        </View>
    );
};

export default Form;
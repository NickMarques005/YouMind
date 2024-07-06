import React from 'react';
import { View, Text } from 'react-native';
import CustomButton from '@components/button/CustomButton';
import images from '@assets/images';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';
import { login_form_style } from '../styles/Form';
import { GetLoginFormFields } from '@features/auth/hooks/UseFormFields';
import { UseLoginFormData } from '../hooks/UseFormData';
import { TouchableOpacity } from 'react-native';
import LoginInputs from './LoginInputs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { UseLogin } from '../hooks/UseLogin';
import { ClearError, Errors, HandleErrors } from 'types/error/Error_Types';
import DefaultLoading from '@components/loading/DefaultLoading';

interface AuthProps {
    rememberMe: boolean;
    HandleRememberMe: () => void;
    HandleForgotPassModalVisibility: () => void;
}

interface ErrorsControl {
    errors: Errors;
    ClearError: ClearError;
    HandleErrors: HandleErrors;
}

interface LoadingControl {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ResponseHandling {
    HandleResponseError: (value: string) => void;
}

interface FormProps {
    auth: AuthProps;
    errorHandling: ErrorsControl;
    loadingControl: LoadingControl;
    responseHandling: ResponseHandling;
}

const Form = ({ auth, errorHandling, loadingControl, responseHandling }: FormProps) => {
    const { rememberMe, HandleRememberMe, HandleForgotPassModalVisibility } = auth;
    const { HandleErrors, errors, ClearError } = errorHandling;
    const { loading, setLoading } = loadingControl;
    const { HandleResponseError } = responseHandling;

    const { userType } = UseAuth();

    const { formData, showPassword, handlePasswordVisibility, handleInputChange } = UseLoginFormData(userType, ClearError);
    const { HandleLogin } = UseLogin({
        authProps: { formData, userType, rememberMe },
        errorHandling: { HandleErrors, errors },
        loadingControl: { setLoading },
        responseHandling: { HandleResponseError }
    }
    );

    const styles = login_form_style(userType);
    const formFields = GetLoginFormFields(userType);
    const loginButton = userType === 'doctor' ? images.generic_images.auth.doctor.doctor_button_auth : images.generic_images.auth.patient.patient_button_auth;

    return (
        <View style={styles.form}>
            <View style={styles.inputsMainView}>
                <LoginInputs
                    styles={{
                        viewInput: styles.viewInput,
                        input: styles.input,
                        passwordIcon: styles.passwordIcon
                    }}
                    visualProps={{
                        iconColor: userType === 'doctor' ? "#58878c" : "#7c5a8f",
                        placeholderColor: `${userType === 'doctor' ? 'rgba(76, 108, 120, 0.5)' : 'rgba(110, 76, 120, 0.5)'}`,
                    }}
                    functionalProps={{
                        formFields: formFields,
                        formData: formData,
                        handleInputChange: handleInputChange,
                        handlePasswordVisibility: handlePasswordVisibility,
                        showPassword: showPassword,
                        editable: !loading,
                        errors: errors
                    }}
                />
                <View style={styles.userOptionsView}>
                    <View style={styles.userRememberMeView}>
                        <TouchableOpacity disabled={loading} style={[styles.userRememberMeButton, rememberMe ? styles.RememberMeActive : null, { opacity: loading ? 0.5 : 1 }]} onPress={() => HandleRememberMe()}>
                            {
                                rememberMe ?
                                    <MaterialCommunityIcons
                                        name="check"
                                        size={20}
                                        color={userType === 'doctor' ? "#58878c" : "#7c5a8f"}
                                    />
                                    : ""
                            }
                        </TouchableOpacity>
                        <Text style={styles.userRememberMeText}>
                            Lembre de mim
                        </Text>
                    </View>
                    <View style={styles.userForgotPassView}>
                        <TouchableOpacity disabled={loading} onPress={() => HandleForgotPassModalVisibility()} style={[styles.userForgotPassButton, { opacity: loading ? 0.5 : 1 }]}>
                            <Text style={styles.userForgotPassText}>Esqueceu a senha?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <CustomButton
                title={"ENTRAR"}
                textStyle={styles.loginButtonText}
                image={loginButton}
                imageStyle={styles.imageButton}
                buttonStyle={styles.loginButton}
                onPress={HandleLogin}
                disabled={loading}
                loading={
                    loading ? <DefaultLoading color={"white"} size={30} /> : undefined
                }
            />
        </View>
    )
}

export default Form;
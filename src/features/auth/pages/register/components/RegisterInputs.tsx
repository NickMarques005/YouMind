import React from 'react';
import {TouchableOpacity } from 'react-native';
import CustomTextInput from '@components/text_input/CustomInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FormField } from '@features/auth/hooks/UseFormFields';
import { FormData } from 'types/auth/Form_Types';
import { ClearError, Errors } from 'types/error/Error_Types';

interface RegisterInputsProps {
    formFields: FormField[];
    formData: FormData;
    handleInputChange: (value: string, field: keyof FormData, error: string) => void;
    handlePasswordVisibility: () => void;
    showPassword: boolean;
    styles: any; 
    iconColor: string;
    placeholderColor: string;
    editable: boolean;
    errors: Errors;
}

const RegisterInputs: React.FC<RegisterInputsProps> = ({
    formFields,
    formData,
    handleInputChange,
    handlePasswordVisibility,
    showPassword,
    styles,
    iconColor,
    placeholderColor,
    editable,
    errors
}) => {

    return (
        <>
            {
            formFields.map((field) => (
                <CustomTextInput
                    key={field.key}
                    viewStyle={styles.viewInput}
                    inputStyle={styles.input}
                    placeholder={field.placeholder}
                    placeholderTextColor={placeholderColor}
                    editable={editable}
                    secureTextEntry={field.isPassword ? !showPassword : false}
                    value={formData[field.key]}
                    onChangeText={(value) => handleInputChange(value, field.key, errors[field.key])}
                    keyboardType={field.key === 'phone' ? 'phone-pad' : field.key === 'email' ? 'email-address' : 'default'}
                    maxLength={field.key === 'phone' ? 15 : undefined}
                    iconBefore={field.icon}
                    iconBeforeStyle={{ width: 25, height: 25, marginRight: 10 }}
                    onIconAfterPress={field.isPassword ? handlePasswordVisibility : undefined}
                    iconAfterComponent={field.isPassword && (
                        <TouchableOpacity style={styles.passwordIcon} onPress={handlePasswordVisibility}>
                            <MaterialCommunityIcons
                                name={showPassword ? 'eye' : 'eye-off'}
                                size={27}
                                color={iconColor} 
                            />
                        </TouchableOpacity>
                    )}
                    error={errors[field.key]}
                    autoCapitalize={field.key === 'email' ? 'none' : undefined}
                    autoComplete={field.key === 'email' ? 'email' : undefined}
                    autoCorrect={field.key === 'email' ? false : undefined}
                />
            ))}
        </>
    );
};

export default RegisterInputs;

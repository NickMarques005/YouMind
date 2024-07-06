import CustomTextInput from '@components/text_input/CustomInput'
import { FormField } from '@features/auth/hooks/UseFormFields';
import React from 'react'
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FormData } from 'types/auth/Form_Types';
import { Errors } from 'types/error/Error_Types';

interface InputStyles {
    viewInput: object;
    input: object;
    passwordIcon: object;
}

interface InputVisualProps {
    iconColor: string;
    placeholderColor: string;
}

interface InputFunctionalProps {
    formFields: FormField[];
    formData: FormData;
    handleInputChange: (value: string, field: keyof FormData, error: string) => void;
    handlePasswordVisibility: () => void;
    showPassword: boolean;
    editable: boolean;
    errors: Errors;
}

interface LoginInputsProps {
    styles: InputStyles;
    visualProps: InputVisualProps;
    functionalProps: InputFunctionalProps;
}

const LoginInputs: React.FC<LoginInputsProps> = ({ styles, visualProps, functionalProps}) => {
    
    const { formFields, formData, handleInputChange, handlePasswordVisibility, showPassword, editable, errors } = functionalProps;
    const { iconColor, placeholderColor } = visualProps;
    
    return (
        <>
            {
                formFields.map((field) => (
                    <CustomTextInput
                        key={field.key}
                        viewStyle={styles.viewInput}
                        editable={editable}
                        inputStyle={styles.input}
                        placeholder={field.placeholder}
                        placeholderTextColor={placeholderColor}
                        secureTextEntry={field.isPassword ? !showPassword : false}
                        value={formData[field.key as keyof FormData]}
                        onChangeText={(value) => handleInputChange(value, field.key, errors[field.key])}
                        keyboardType={`${field.key === 'phone' ? 'numeric' : field.key === 'email' ? 'email-address' : 'default'}`}
                        maxLength={field.key === 'phone' ? 15 : undefined}
                        iconBefore={field.icon}
                        iconBeforeStyle={{ width: 25, height: 25, marginRight: 10 }}
                        iconAfterStyle={styles.passwordIcon}
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
                ))
            }
        </>
    )
}

export default LoginInputs;
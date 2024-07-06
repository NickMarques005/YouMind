import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { CustomButtonProps } from './types/type_custom_button';

const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    onPress,
    buttonStyle,
    textStyle,
    image,
    imageStyle,
    disabled,
    children,
    loading,
}) => {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[{}, buttonStyle, disabled && { opacity: 0.5 }]}>
            {image && <Image source={image} style={[{}, imageStyle]} />}
            {
                loading ? (
                    loading
                ) : (
                    <>
                        {title && <Text style={[{}, textStyle]}>{title}</Text>}
                        {children}
                    </>
                )
            }
        </TouchableOpacity>
    );
};

export default CustomButton;
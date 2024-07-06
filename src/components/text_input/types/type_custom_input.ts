import { ImageSourcePropType, ImageStyle, StyleProp, TextInputProps, TextStyle, ViewStyle } from "react-native";

export interface CustomTextInputProps extends TextInputProps {
    viewStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    placeholder?: string;
    placeholderTextColor?: string;
    secureTextEntry?: boolean;
    value: string | undefined;
    onChangeText: (text: string) => void;
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'number-pad' | 'phone-pad' | 'name-phone-pad' | 'decimal-pad' | 'twitter' | 'web-search' | 'visible-password';
    maxLength?: number;
    iconBefore?: ImageSourcePropType;
    iconBeforeStyle?: StyleProp<ImageStyle>;
    iconAfter?: ImageSourcePropType;
    iconAfterStyle?: StyleProp<ImageStyle>;
    onIconAfterPress?: () => void;
    iconAfterComponent?: React.ReactNode;
    editable?: boolean;
    error?: string;
    customDisabled?: boolean;
    customLoading?: boolean;
    backgroundColor?: string;
}
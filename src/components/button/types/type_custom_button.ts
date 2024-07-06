import React from "react";
import { ImageSourcePropType, ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native";

export interface CustomButtonProps {
    title?: string;
    onPress: () => void;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    image?: ImageSourcePropType;
    imageStyle?: StyleProp<ImageStyle>;
    disabled?: boolean;
    children?: React.ReactNode;
    loading?: JSX.Element;
}

import { ImageSourcePropType, ImageStyle, StyleProp, ViewStyle } from "react-native";


export interface CustomHeaderProps {
    leftButtonPress?: () => void;
    rightButtonPress?: () => void;
    leftButtonIcon?: ImageSourcePropType;
    rightButtonIcon?: ImageSourcePropType;
    headerImage?: ImageSourcePropType;
    gradientColors?: string[];
    gradientStart?: { x: number; y: number };
    gradientEnd?: { x: number; y: number };
    leftStyleButtonIcon?: StyleProp<ViewStyle>;
    leftStyleImageIcon?: StyleProp<ImageStyle>;
    rightStyleButtonIcon?: StyleProp<ViewStyle>;
    rightStyleImageIcon?: StyleProp<ImageStyle>;
    styleLogo?: StyleProp<ImageStyle>;
    disabledLeftButton?: boolean;
    disabledRightButton?: boolean;
}
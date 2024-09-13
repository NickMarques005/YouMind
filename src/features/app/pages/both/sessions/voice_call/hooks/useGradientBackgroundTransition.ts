import { useEffect } from "react";
import { useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { interpolateColors } from "@shopify/react-native-skia";
import { CallStatus, gradientCallColors } from "@utils/design/Color";
import { UserType } from "types/user/User_Types";

interface UseGradientBackgroundTransitionParams {
    callStatus: CallStatus,
    userType: UserType
}

export const useGradientBackgroundTransition = ({ callStatus, userType}: UseGradientBackgroundTransitionParams) => {
    const colorsIndex = useSharedValue(0);
    const { gradientsStart: startColors, gradientsEnd: endColors } = gradientCallColors(userType);

    const changeColors = (status: CallStatus) => {
        let nextIndex;
        switch (status) {
            case "call":
                nextIndex = 2;
                break;
            case "receiving":
                nextIndex = 1;
                break;
            case "waiting":
                nextIndex = 1;
                break;
            default:
                nextIndex = 1;
        }

        colorsIndex.value = withTiming(nextIndex, {
            duration: 1500,
        });
    };

    const gradientColors = useDerivedValue(() => {
        return [
            interpolateColors(colorsIndex.value, [0, 1, 2], startColors),
            interpolateColors(colorsIndex.value, [0, 1, 2], endColors),
        ];
    });

    useEffect(() => {
        changeColors(callStatus);
    }, [callStatus]);

    return gradientColors;
};
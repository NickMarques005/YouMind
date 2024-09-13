import React from "react";
import { Canvas, LinearGradient, Fill, vec } from "@shopify/react-native-skia";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { CallStatus } from "@utils/design/Color";
import { UserType } from "types/user/User_Types";
import { useGradientBackgroundTransition } from "../hooks/useGradientBackgroundTransition";

interface VoiceCallBackgroundProps {
    callStatus: CallStatus;
    userType: UserType;
    children?: React.ReactNode;
}

const VoiceCallBackground = ({ callStatus, userType, children }: VoiceCallBackgroundProps) => {
    const { width, height } = useWindowDimensions();
    const gradientColors = useGradientBackgroundTransition({ callStatus, userType });

    return (
        <View style={{ ...StyleSheet.absoluteFillObject }}>
            <Canvas style={styles.canva}>
                <Fill>
                    <LinearGradient
                        start={vec(0, 0)}
                        end={vec(width, height)}
                        colors={gradientColors}
                    />
                </Fill>
            </Canvas>
            <View style={styles.overlay}>
                {children}
            </View> 
        </View>

    );
};

const styles = StyleSheet.create({
    mainBackground: {
        flex: 1
    },
    canva: {
        flex: 1,
        width: "100%"
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default VoiceCallBackground;
import React from "react";
import { View, StyleSheet } from "react-native";
import { UseForm } from "@features/app/providers/sub/UserProvider";
import { UserType } from "types/user/User_Types";
import VoiceCallBackground from "./components/VoiceCallBackground";
import { responsiveSize, screenHeight } from "@utils/layout/Screen_Size";
import useVoiceCallBehavior from "./hooks/useVoiceCallBehavior";
import VoiceCallButtonContainer from "./components/VoiceCallButtonContainer";
import VoiceCallHeader from "./components/VoiceCallHeader";
import VoiceCallUserDetails from "./components/VoiceCallUserDetails";
import { usePriority } from "@features/app/providers/bridge/PriorityProvider";

const VoiceCallSession = () => {
    const { userData } = UseForm();
    const { removePriority } = usePriority();
    const { callStatus, handleCallStatus, handleLeaveCall } = useVoiceCallBehavior({ removePriority });
    const backIconSize = responsiveSize * 0.16;
    const avatarOtherUserIconSize = responsiveSize * 0.4;
    const circleSize = avatarOtherUserIconSize * 2.1;
    const callButtonSize = responsiveSize * 0.1;

    const avatar = null;

    return (
        <View style={styles.container}>
            <VoiceCallBackground
                callStatus={callStatus}
                userType={userData?.type as UserType}
            >
                <View style={{
                    width: '100%',
                    height: '100%',
                    paddingVertical: responsiveSize * 0.05,
                }}>
                    <VoiceCallHeader
                        onBackPress={handleLeaveCall}
                        backIconSize={backIconSize}
                    />
                    <VoiceCallUserDetails
                        avatar={avatar}
                        avatarOtherUserIconSize={avatarOtherUserIconSize}
                        userData={userData}
                    />
                    <VoiceCallButtonContainer
                    
                    />
                    <View style={{}}>
                        {
                            //Container de video chamada
                        }
                    </View>
                </View>
            </VoiceCallBackground>
        </View>
    );
};

// Estilos para o componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    canvas: {
        flex: 1,
        width: "100%",
    },
    userContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    outerCircle: {
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        backgroundColor: '#dadbe3',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 25,
        overflow: 'hidden',
        borderColor: 'white',
        borderWidth: 10,
    },
    avatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
});

export default VoiceCallSession;
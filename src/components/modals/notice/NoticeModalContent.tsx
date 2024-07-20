import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '@components/button/CustomButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Notice } from 'types/notice/Notice_Types';
import images from '@assets/images';
import { responsiveSize } from '@utils/layout/Screen_Size';

interface NoticeContentProps {
    notice: Notice;
    closeModal: () => void;
    handleConfirm: (notice: Notice) => Promise<void>
    userType?: string;
    noticeLoading: boolean;
    handleDontShow: (notice: Notice, dontShowState: boolean) => Promise<void>;
}

const NoticeContent: React.FC<NoticeContentProps> = ({
    notice, closeModal,
    handleConfirm, userType,
    noticeLoading, handleDontShow }) => {
    const { message, type, icon, dontshow, acceptText, declineText } = notice;
    const [dontShowState, setDontShowState] = useState<boolean>(false);
    const styles = noticeStyles(userType);
    const gradientDefault = buttonDefaultGradient(userType);
    const gradientCancel = buttonCancelGradient(userType);
    const youMindLogo = images.generic_images.logo.logo_mobile_default;
    const youMindLogoSize = responsiveSize * 0.22;

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                {
                    icon ?
                        <Icon name={icon} size={50} color={userType === 'doctor' ? "#4ea6a0" : "#8a4ea6"} />
                        :
                        <Image
                            style={{ width: youMindLogoSize, height: youMindLogoSize, borderRadius: youMindLogoSize, borderWidth: 5, borderColor: userType === 'doctor' ? "#4ea6a0" : "#8a4ea6" }}
                            source={youMindLogo}
                        />
                }

            </View>
            <View style={styles.messageView}>
                <Text style={styles.message}>
                    {message}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.answerNoticeButtonsContainer}>
                    <LinearGradient
                        colors={gradientCancel.colors}
                        start={gradientCancel.start}
                        end={gradientCancel.end}
                        style={styles.buttonGradient}>
                        <CustomButton
                            title={declineText || "Cancelar"}
                            onPress={() => {
                                handleDontShow(notice, dontShowState);
                                closeModal();
                            }}
                            buttonStyle={styles.button}
                            textStyle={styles.buttonText}
                        />
                    </LinearGradient>

                    <LinearGradient
                        colors={gradientDefault.colors}
                        start={gradientDefault.start}
                        end={gradientDefault.end}
                        style={styles.buttonGradient}>
                        <CustomButton
                            title={acceptText || "OK"}
                            onPress={() => {
                                handleConfirm(notice);
                                handleDontShow(notice, dontShowState);
                                closeModal();
                            }}
                            buttonStyle={styles.button}
                            textStyle={styles.buttonText}
                        />
                    </LinearGradient>
                </View>
                {
                    dontshow &&
                    <View style={styles.dontShowButtonsContainer}>
                        <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', padding: '3%', backgroundColor: userType === 'doctor' ? "#e9f1f5" : "#f3e9f5" }}>
                            <Text style={{ color: userType === 'doctor' ? "#4ea6a0" : "#8a4ea6" }}>Não mostrar novamente</Text>
                            <View style={{ borderWidth: 1.5, opacity: 0.7, width: 20, height: 20, borderColor: userType === 'doctor' ? "#4ea6a0" : "#8a4ea6", justifyContent: 'center', alignItems: 'center', }}>
                                <TouchableOpacity onPress={() => setDontShowState(!dontShowState)} style={{ width: '100%', height: '100%', backgroundColor: '#fcfaff' }}>
                                    {dontShowState && <Icon name="check" size={15} color={userType === 'doctor' ? "#4ea6a0" : "#8a4ea6"} />}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }

            </View>
        </View>
    );
};

export default NoticeContent;

const noticeStyles = (userType?: string) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: '8%',
        gap: 30,
    },
    messageView: {
        width: '100%',
        paddingHorizontal: '5%',
        alignItems: 'center',
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
        color: userType === 'doctor' ? '#417880' : '#704180',
    },
    iconContainer: {
        padding: 5,
    },
    buttonContainer: {

    },
    answerNoticeButtonsContainer: {
        paddingVertical: '5%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 15,
    },
    dontShowButtonsContainer: {
        width: '100%',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    buttonGradient: {
        flex: 1,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});

const buttonDefaultGradient = (userType?: string) => {
    return {
        colors: userType === 'doctor' ? ['#5d9eba', '#329fa1'] : ['#9d5dba', '#8d32a1'],
        start: { x: 0, y: 0 },
        end: { x: 0.8, y: 1 }
    };
}

const buttonCancelGradient = (userType?: string) => {
    return {
        colors: userType === 'doctor' ? ['#869496', '#618b91'] : ['#928696', '#896191'],
        start: { x: 0, y: 0 },
        end: { x: 0.8, y: 1 }
    };
}
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '@components/button/CustomButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DefaultLoading from '@components/loading/DefaultLoading';
import { defaultIconMap } from '@utils/icon/mainIcons';
import { DefaultIconTypeKey } from 'types/icon/Icon_Types';

interface VerificationModalProps {
    message: string;
    closeModal: () => void;
    titleCancel: string;
    titleConfirm: string;
    handleConfirm: () => void;
    handleDecline?: () => void;
    icon?: DefaultIconTypeKey;
    userType?: string;
    loading?: boolean;
    notClose?: boolean;
}

const VerificationModalContent = ({
    message, closeModal,
    titleCancel, titleConfirm,
    handleConfirm, handleDecline,
    icon, userType, loading, notClose }: VerificationModalProps) => {
    const styles = verificationStyles(userType);
    const gradientCancel = buttonCancelGradient(userType);
    const gradientDefault = buttonDefaultGradient(userType);
    const iconName = icon && defaultIconMap[icon] ? defaultIconMap[icon] : "info";

    return (
        <View style={styles.container}>
            <View style={styles.messageView}>
                <Text style={styles.message}>
                    {message}
                </Text>
            </View>
            <View style={styles.iconContainer}>
                <Icon name={iconName} size={50} color={userType === 'doctor' ? "#4ea6a0" : "#8a4ea6"} />
            </View>
            <View style={styles.buttonContainer}>
                <LinearGradient
                    colors={gradientCancel.colors}
                    start={gradientCancel.start}
                    end={gradientCancel.end}
                    style={styles.buttonGradient}>
                    <CustomButton
                        title={titleCancel}
                        onPress={() => {
                            if (handleDecline) {
                                handleDecline();
                            }
                            closeModal();
                        }}
                        disabled={loading}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                    />
                </LinearGradient>

                <LinearGradient
                    colors={gradientDefault.colors}
                    start={gradientDefault.start}
                    end={gradientDefault.end}
                    style={[styles.buttonGradient, { opacity: loading ? 0.5 : 1 }]}>
                    <CustomButton
                        title={titleConfirm}
                        onPress={() => {
                            handleConfirm();
                            if (!notClose) {
                                closeModal();
                            }
                        }}
                        disabled={loading}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                        loading={loading ? <DefaultLoading size={24} color={'white'} /> : undefined}
                    />
                </LinearGradient>
            </View>
        </View>
    );
}

export default VerificationModalContent;

const verificationStyles = (userType?: string) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            gap: 30,
            paddingVertical: 15,
        },
        messageView: {
            width: '100%',
            paddingTop: 15,
            paddingHorizontal: 10,
            alignItems: 'center',
        },
        message: {
            fontSize: 18,
            textAlign: 'center',
            color: userType === 'doctor' ? '#417880' : '#704180'
        },
        iconContainer: {
            padding: 5,
        },
        buttonContainer: {
            paddingTop: 10,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            gap: 15,
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
        }
    });
}

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
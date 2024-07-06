import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '@components/button/CustomButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface VerificationModalProps {
    message: string;
    closeModal: () => void;
    titleCancel: string;
    titleConfirm: string;
    handleConfirm: () => void;
    icon?: string;
    userType?: string;
}

const VerificationModalContent = ({ message, closeModal, titleCancel, titleConfirm, handleConfirm, icon, userType }: VerificationModalProps) => {
    const styles = verificationStyles(userType);
    const gradientCancel = buttonCancelGradient(userType);
    const gradientDefault = buttonDefaultGradient(userType);

    return (
        <View style={styles.container}>
            <View style={styles.messageView}>
                <Text style={styles.message}>
                    {message}
                </Text>
            </View>
            <View style={styles.iconContainer}>
                <Icon name={icon || "info"} size={50} color={userType === 'doctor' ? "#4ea6a0" : "#8a4ea6"} />
            </View>
            <View style={styles.buttonContainer}>
                <LinearGradient
                    colors={gradientCancel.colors}
                    start={gradientCancel.start}
                    end={gradientCancel.end}
                    style={styles.buttonGradient}>
                    <CustomButton
                        title={titleCancel}
                        onPress={closeModal}
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
                        title={titleConfirm}
                        onPress={() => {
                            handleConfirm();
                            closeModal();
                        }}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
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
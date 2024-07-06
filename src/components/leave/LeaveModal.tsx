import React from 'react';
import { View, Text, Modal, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { LinearGradient } from 'expo-linear-gradient';
import images from '@assets/images';

const LeaveModal = ({ visible, onConfirm, onCancel }) => {
    
    const leave_icon = images.generic_images.leave.leave_icon;
    
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.leaveTitle}>Deseja sair do aplicativo YouMind?</Text>
                    
                    <View style={styles.leaveImgView}>
                        <Image style={styles.leaveImg} source={leave_icon}/>
                    </View>
                    
                    <View style={styles.buttonContainer}>
                        <LinearGradient colors={['#886b8c', '#8591d4']}
                            start={{ x: 0.1, y: 0 }}
                            end={{ x: 1, y: 0 }} style={[styles.buttonLeaveTemplate]} >
                            <TouchableOpacity style={styles.buttonLeaveTouch} onPress={() => onCancel()}>
                                <Text style={[styles.buttonLeaveText, {color: '#e8ddeb'}]}>Cancelar</Text>
                            </TouchableOpacity>

                        </LinearGradient>
                        <LinearGradient colors={['#ab32a5', '#742980']}
                            start={{ x: 0.1, y: 0 }}
                            end={{ x: 1, y: 0 }} style={styles.buttonLeaveTemplate} >
                            <TouchableOpacity style={styles.buttonLeaveTouch} onPress={() => onConfirm()}>
                                <Text style={[styles.buttonLeaveText, {color: '#f8dbff'}]}>Sair</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        width: screenWidth * 0.8,
        padding: 25,
        borderRadius: 20,
        justifyContent: 'space-between'
    },
    leaveTitle: {
        fontSize: 22,
        textAlign: 'center'
    },
    leaveImgView: {
        width: '100%',
        marginVertical: 35,
        alignItems: 'center'
    },
    leaveImg: {
        width: 50,
        height: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        gap: 10,
    },
    buttonLeaveTemplate: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: 'blue',
        width: '47%',
        borderRadius: 10,
    },
    buttonLeaveTouch: {
        width: '100%',
        alignItems: 'center',

    },
    buttonLeaveText: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
});

export default LeaveModal;
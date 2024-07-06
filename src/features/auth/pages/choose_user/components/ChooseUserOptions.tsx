import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import images from '@assets/images';
import { choose_options_style } from '../styles/ChooseUserOptions';
import { UseAuthNavigation } from '@features/auth/hooks/UseAuthNatigation';
import { UseTypeChoice } from '../hooks/UseHandleType';

const ChooseUserOptions = () => {

    const styles = choose_options_style();
    const { navigateToAuthScreen } = UseAuthNavigation();
    const { HandleTypeChoice } = UseTypeChoice(navigateToAuthScreen);

    return (
        <View style={styles.chooseUser_contentView}>
            <View style={styles.chooseUser_buttonsMainView}>
                <View style={styles.chooseUser_ButtonsContainer}>
                    <LinearGradient colors={['#4d2448', '#823d94', '#729edb']}
                        start={{ x: 0, y: 0.7 }} end={{ x: 1, y: 1 }} style={styles.chooseUser_buttonStandard}>
                        <TouchableOpacity style={styles.chooseUser_buttonTouch} onPress={() => { HandleTypeChoice('patient')}}>
                            <View style={{ transform: [{ rotate: '-45deg' }], width: '53%', height: '40%' }}>
                                <LottieView style={{ width: '100%', height: '100%' }} source={images.animations.patient_illustration} autoPlay loop />
                            </View>
                            <Text style={[styles.chooseUser_buttonText, styles.chooseUser_buttonTextPatient]}>Paciente</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient colors={['#d9ae77', '#57afb5', '#326660']}
                        start={{ x: 0.7, y: 0 }} end={{ x: 1, y: 1 }} style={styles.chooseUser_buttonStandard}>
                        <TouchableOpacity style={styles.chooseUser_buttonTouch} onPress={() => HandleTypeChoice('doctor')}>
                            <View style={{ transform: [{ rotate: '-60deg', }], width: '53%', height: '40%' }}>
                                <LottieView style={{ width: '100%', height: '100%' }} source={images.animations.doctor_illustration} autoPlay loop />
                            </View>
                            <Text style={[styles.chooseUser_buttonText, styles.chooseUser_buttonTextDoctor]}>Doutor</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </View>
    );
};

export default ChooseUserOptions;
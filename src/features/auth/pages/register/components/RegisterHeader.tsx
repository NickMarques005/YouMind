import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { register_header_style } from '../styles/Header';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';
import images from '@assets/images';
import { UseAuthNavigation } from '@features/auth/hooks/UseAuthNatigation';
import CustomButton from '@components/button/CustomButton';

interface RegisterHeader {
    loading: boolean;
}

const Header = ({ loading }: RegisterHeader) => {
    const { userType } = UseAuth();

    const backButtonImg = images.generic_images.back.arrow_back_white;
    const backgroundHeader = userType === 'doctor' ? images.generic_images.auth.doctor.doctor_background_auth : images.generic_images.auth.patient.patient_background_auth
    const styles = register_header_style();
    const { navigateToAuthScreen } = UseAuthNavigation();

    return (
        <View style={styles.mainHeader}>
            <LinearGradient colors={userType === 'doctor' ? ['#cdbea0', '#57afb5', '#326660'] : ['#4d2448', '#823d94', '#729edb']}
                start={{ x: 0.7, y: 0 }}
                end={{ x: 1, y: 0.3 }} style={styles.backgroundView}>
                <View style={styles.backgroundChildView}>
                    <Image style={{ bottom: '-1%', right: -30, width: '85%', height: '69%', transform: [{ rotate: '-12deg' }] }} source={backgroundHeader} />
                </View>
            </LinearGradient>

            <View style={styles.headerContainer}>
                <CustomButton
                    onPress={() => navigateToAuthScreen('choose_type')}
                    buttonStyle={styles.backArrowButton}
                    imageStyle={styles.backArrowImg}
                    image={backButtonImg}
                    disabled={loading}
                    />
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>Cadastrar</Text>
                </View>
            </View>
        </View>
    );
};

export default Header;
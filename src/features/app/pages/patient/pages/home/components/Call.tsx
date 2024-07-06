import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Image } from 'react-native';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import LinearGradient from 'react-native-linear-gradient';
import images from '@assets/images';
import { PatientScreenName } from 'types/navigation/Navigation_Types';
import { HealthPage, UseHealthPage } from '@features/app/providers/patient/HealthProvider';

interface CallProps {
    navigateTo: (screenName: PatientScreenName) => void;
}

const Call = ({ navigateTo }: CallProps) => {
    const { handleCurrentHealthPage } = UseHealthPage();
    const handleGoToOption = (tab: PatientScreenName, page: HealthPage) => {
        console.log("GO TO page: ", page);
        handleCurrentHealthPage(page);
        navigateTo(tab);
    }

    const call_icon = images.app_patient_images.home.icon_call;
    const call_bg = images.app_patient_images.home.bg_home_content_3;

    return (
        <View style={styles.container}>
            <ImageBackground
                source={call_bg}
                style={styles.backgroundImage_Telefone}
            >
                <View style={{height: '100%', width: '60%', paddingVertical: '5%',
                    paddingHorizontal: '5%',  }}>
                    <Text style={styles.telefoneCall_Title}>Precisa de ajuda?</Text>
                    <View style={styles.telefoneCall_View}>
                        <Text style={styles.telefoneCall_Text}>Ligue agora para CVV </Text>
                        <LinearGradient colors={['#b462e3', '#6d1370']} style={styles.telefoneCall_Linear}>
                            <TouchableOpacity onPress={() => handleGoToOption('Saúde', "Call")} style={styles.telefoneCall_Button}>
                                <Text style={styles.telefoneCall_TextButton}>CHAMAR</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
                <View style={{flex: 1, justifyContent: 'center', paddingRight: '5%' }}>
                    <Image
                        source={call_icon}
                        style={styles.iconImage_Telefone}
                    />
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: '#fff2ff',
        minHeight: screenHeight * 0.2,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5,
    },
    backgroundImage_Telefone: {
        height: screenHeight * 0.22,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    iconImage_Telefone: {
        width: screenWidth * 0.3,
        height: screenWidth * 0.3,
        alignSelf: 'flex-end'
    },
    telefoneCall_View: {
        flex: 1,
        paddingVertical: '5%',
        alignItems: 'flex-start',
        
    },
    telefoneCall_Title: {
        fontWeight: '800',
        textTransform: 'uppercase',
        fontSize: 17,
        color: '#b347ad',
        marginBottom: '2%',
        textAlign: 'center'
    },
    telefoneCall_Text: {
        fontSize: 16,
        color: 'purple',
        marginBottom: '4%',
        alignSelf: 'center'
    },
    telefoneCall_Button: {
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    telefoneCall_Linear: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        borderRadius: 50,
    },
    telefoneCall_TextButton: {
        fontSize: 17,
        fontWeight: '300',
        color: 'white'
    },
});

export default Call;
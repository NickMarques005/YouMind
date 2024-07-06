import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size'
import { UseForm } from '@features/app/providers/sub/UserProvider'
import WaveCall from './components/WaveCall'
import images from '@assets/images'
import TitleSection from './components/TitleSection'
import CallHelpButton from './components/CallHelpButton'

const Call = () => {
    const { userData } = UseForm();
    const handleCall = () => {
        console.log("CALL FUNCTION!");
    }

    const callIllustration = images.app_patient_images.health.call.call_illustration;
    const helpButton = images.app_patient_images.health.call.call_help_button;


    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.contentView}>
                <LinearGradient colors={['#4d2448', '#733982']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 0, y: 1 }} style={styles.viewBackground}>
                    {
                        [...Array(3).keys()].map((_, index) => {
                            return <WaveCall index={index} viewStyle={styles.viewWave} key={index} />
                        })
                    }
                </LinearGradient>
                <TitleSection handleCall={handleCall} callIllustration={callIllustration} helpButton={helpButton}/>
            </View>
        </SafeAreaView>
    )
}

export default Call;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
    },
    contentView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    mainImg: {

    },
    viewTitle: {
        width: screenWidth * 1.5,
        height: '80%',
        borderRadius: 280,
        top: -80,
        zIndex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10,
    },
    viewWave: {
        top: -90,
        position: 'absolute',
        width: screenWidth * 1,
        height: '80%',
        borderRadius: 200,
        zIndex: 1,
        backgroundColor: '#b14eba'
    },
    viewBackground: {
        flex: 1,
        width: '100%',
    },
    viewTitleContent: {
        height: '70%',
        width: '60%',

    },
    viewTitleInfo: {
        display: 'flex',
        gap: 30,
    },
    designCircle: {
        position: 'absolute',
        borderRadius: 180,
        left: -40,
        bottom: -80,
        width: '110%',
        height: screenHeight * 0.45,
        zIndex: 1,
    },
    title: {
        zIndex: 2,
    },
    textTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#f1e1f2',
        textTransform: 'uppercase',
        width: '70%',
        lineHeight: 40,
    },
    viewTextInfo: {
        gap: 10,
        zIndex: 2,
    },
    textInfo: {
        fontSize: 18,
        color: 'white',
        opacity: 0.7
    },
    textBoldInfo: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        opacity: 0.7
    },
    ViewHealthIllustration: {
        position: 'absolute',
        top: 0,
        right: -60,

    },
    HealthIllustration: {
        opacity: 0.2,
        width: screenWidth * 0.85,
        height: screenHeight * 0.4,
        
    },
    ViewButtonHelp: {
        position: 'absolute',
        bottom: -30,
        right: screenWidth * 0.34,
        elevation: 14,
    },
    ButtonHelp: {
        width: 80,
        height: 80,
    },
});
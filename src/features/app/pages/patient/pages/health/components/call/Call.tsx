import { SafeAreaView, StyleSheet, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size'
import WaveCall from './components/WaveCall'
import images from '@assets/images'
import TitleSection from './components/TitleSection'
import useCallHandling from './hooks/UseCallHandling'
import useCallBehavior from './hooks/UseCallBehavior'
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider'

const Call = () => {
    const { HandleResponseAppError } = UseGlobalResponse();
    const { makeCall } = useCallBehavior({ HandleResponseAppError });
    const { handleCallCVV } = useCallHandling({ makeCall });

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
                <TitleSection handleCall={handleCallCVV} callIllustration={callIllustration} helpButton={helpButton}/>
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
    }
});
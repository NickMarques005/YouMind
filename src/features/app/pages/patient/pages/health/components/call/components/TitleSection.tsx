import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import CallHelpButton from './CallHelpButton';
import { screenWidth } from '@utils/layout/Screen_Size';

interface TitleSection {
    callIllustration: any;
    handleCall: () => void;
    helpButton: any;
}

const TitleSection = ({ callIllustration, handleCall, helpButton }: TitleSection) => {


    return (
        <LinearGradient colors={['#4d2448', '#9c33a3', '#ad559d']} start={{ x: 0.1, y: 0 }} end={{ x: 0.3, y: 1 }} style={styles.viewTitle}>
            <View style={styles.viewTitleContent}>
                <View style={styles.viewTitleInfo}>
                    
                    <View style={styles.title}>
                        <Text style={styles.textTitle}>Mantenha-se sempre saudável</Text>
                    </View>
                    <View style={styles.viewTextInfo}>
                        <Text style={styles.textInfo}>Não está se sentindo bem? Não lute sozinho. Ligue para o Centro de Valorização a Vida e compartilhe seus sentimentos.</Text>
                        <Text style={styles.textBoldInfo}>Sua saúde mental é importante!</Text>
                    </View>
                    <View style={styles.ViewHealthIllustration}>
                        <Image style={styles.HealthIllustration} source={callIllustration} />
                    </View>
                </View>
                <View style={styles.callButtonView}>
                <CallHelpButton onPress={handleCall} helpButton={helpButton} />
                </View>
                
            </View>
        </LinearGradient>
    )
}

export default TitleSection

const styles = StyleSheet.create({
    viewTitle: {
        position: 'absolute',
        width: '140%',
        height: '90%',
        borderRadius: 280,
        top: -80,
        zIndex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10,
    },
    viewTitleContent: {
        height: '70%',
        width: screenWidth * 0.8,
        justifyContent: 'space-between',
    },
    viewTitleInfo: {
        display: 'flex',
        gap: 30,
    },
    title: {
        width: '100%',
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
    },
    HealthIllustration: {
        opacity: 1,
        width: '85%',
        height: '40%',
    },
    callButtonView: {
        width: '100%',
        alignItems: 'center'
    }
});
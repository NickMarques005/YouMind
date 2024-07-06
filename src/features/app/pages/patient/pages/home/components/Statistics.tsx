import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { screenWidth } from '@utils/layout/Screen_Size';
import LinearGradient from 'react-native-linear-gradient';

const Statistics = ({ progress }: { progress: number }) => {
    const handleGoToOption = (option: string, page: string | undefined) => {
        console.log("GO TO");
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.statisticsQuestions_View}>
                <AnimatedCircularProgress
                    size={140}
                    width={30}
                    rotation={0}
                    fill={progress}
                    tintColor="#bc32d1"
                    backgroundColor="#b09bc2"
                >
                    {(fill) => (
                        <Text style={styles.percentageQuestions_Text}>{`${Math.round(fill)}%`}</Text>
                    )}
                </AnimatedCircularProgress>
            </View>
            <LinearGradient colors={['#b462e3', '#6d1370']} style={styles.infoQuestions_View}>
                <TouchableOpacity onPress={() => handleGoToOption("healthScreen", "Questionários")} style={styles.infoQuestions_Touchable}>
                    <Text style={styles.statisticsQuestions_Text}>Questionários Respondidos</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: screenWidth * 0.52,
        height: '100%',
        borderBottomLeftRadius: 70,
    },
    statisticsQuestions_View: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '70%',
        marginTop: 10,
    },
    statisticsQuestions_Text: {
        fontSize: 14,
        fontWeight: '300',
        color: 'white',
        textAlign: 'center'
    },
    percentageQuestions_Text: {
        fontWeight: '900',
        fontSize: 24,
        color: '#a055cf'
    },
    infoQuestions_View: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '20%',
        width: screenWidth * 0.4,
        borderRadius: 20,
        marginLeft: 23,
    },
    infoQuestions_Touchable: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Statistics;
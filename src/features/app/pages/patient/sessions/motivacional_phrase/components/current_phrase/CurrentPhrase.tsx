import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DailyMotivationalPhrase } from 'types/motivational_phrase/MotivationalPhrase_Types'
import CurrentPhraseHeader from './components/CurrentPhraseHeader';
import TextAnimator from '@components/text/TextAnimator';
import { UserPatient } from 'types/user/User_Types';
import { useCurrentPhraseBehavior } from './hooks/useCurrentPhraseBehavior';
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size';
import { formatRelativeDate, formatRelativeTime } from '@utils/date/DateFormatting';
import useCurrentPhraseAnimation from './hooks/useCurrentPhraseAnimation';
import Animated from 'react-native-reanimated';
import { LoadingStructure } from 'types/loading/Loading_Types';
import { useCurrentPhraseHandling } from './hooks/useCurrentPhraseHandling';

interface CurrentPhraseProps {
    userData: UserPatient;
    handleBackSessionPriority: () => void;
    handleEnableAllPhrases: () => void;
    viewingLoading: LoadingStructure;
    currentPhrase?: DailyMotivationalPhrase;
}

const CurrentPhrase = ({ 
    userData, handleBackSessionPriority, 
    handleEnableAllPhrases, currentPhrase, viewingLoading }: CurrentPhraseProps) => {
    const buttonOkSize = responsiveSize * 0.2;
    const { formatUserGreetings } = useCurrentPhraseBehavior();
    const { animatedOkButtonStyle, animatedTextStyle, startButtonAnimation
    } = useCurrentPhraseAnimation({ buttonSize: buttonOkSize, currentPhrase });
    const { handleViewVerification } = useCurrentPhraseHandling({ viewingLoading });
    return (
        <View style={{ flex: 1 }}>
            <CurrentPhraseHeader
                onBackPress={handleBackSessionPriority}
                onMotivationalPress={handleEnableAllPhrases}
            />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ top: "-10%" }}>
                    {
                        currentPhrase &&
                        <View style={{ gap: 25, width: '90%' }}>
                            <TextAnimator
                                content={formatUserGreetings(userData.name)}
                                durationForEachWord={500}
                                textStyle={styles.title}
                            />
                            <TextAnimator
                                content={currentPhrase.text}
                                durationForEachWord={700}
                                textStyle={styles.textPhrase}
                                onFinish={
                                    () => { 
                                        startButtonAnimation();
                                        handleViewVerification(currentPhrase);
                                    }
                                    }
                            />
                        </View>
                    }
                </View>
            </View>
            <View style={{ width: '100%', height: 'auto', alignItems: 'center', justifyContent: 'center', gap: 25 }}>
                {
                    currentPhrase &&
                    <Animated.Text style={[{ fontWeight: '800', fontSize: 22, color: 'rgba(255, 255, 255, 0.7)' }, animatedTextStyle]}>
                        {
                            `Frase de ${formatRelativeDate(currentPhrase.usedAt)}`
                        }
                    </Animated.Text>
                }
                <Animated.View style={[{
                    width: '100%', height: buttonOkSize,
                    backgroundColor: '#9e60a1',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center'
                }, animatedOkButtonStyle]}>
                    <TouchableOpacity onPress={() => handleBackSessionPriority() } style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: '600', color: 'white' }}>OK</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    )
}

export default CurrentPhrase

const styles = StyleSheet.create({
    textPhrase: {
        fontSize: 24,
        color: '#ebe4ed',
        textAlign: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Menlo',
    }
});
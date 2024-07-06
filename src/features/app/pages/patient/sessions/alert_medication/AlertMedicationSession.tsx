import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import LinearGradient from 'react-native-linear-gradient';
import images from '@assets/images';
import { useMedicationIcon } from '@hooks/medications/UseMedicationIcon';
import LottieView from 'lottie-react-native';
import { GestureDetector, GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import DefaultLoading from '@components/loading/DefaultLoading';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { UseLoading } from '@hooks/loading/UseLoading';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import { useMedicationPendingBehavior } from './hooks/useMedicationPendingBehavior';
import { useAlarmHandling } from './hooks/useAlarmHandling';
import { useSwipeAnimation } from './hooks/useSwipeAnimation';
import { FormatDateToSpeakDate } from '@utils/date/DateFormatting';

const AlertMedicationSession = () => {
    const { loading, setLoading } = UseLoading();
    const { HandleResponseAppError, HandleResponseAppSuccess } = UseGlobalResponse();
    const { medicationPending, navigateToAppScreen, isConfirming,
        setIsConfirming, confirmed, setConfirmed, translateX, confirmProgress,
        declined, setDeclined, clearMedicationPending } = useMedicationPendingBehavior();

    if (!medicationPending) {
        navigateToAppScreen('main_page');
        return null;
    }
    const { mainIcon } = useMedicationIcon(medicationPending?.medication.type);
    const { handleSwipeEnd, } = useAlarmHandling({
        setIsConfirming, confirmProgress, setLoading,
        isConfirming, HandleResponseAppError, HandleResponseAppSuccess, declined, 
        setDeclined, confirmed, medicationPending, navigateToAppScreen, setConfirmed, clearMedicationPending
    });

    const { swipeGesture, animatedStyle } = useSwipeAnimation({ translateX, confirmProgress, handleSwipeEnd, confirmed, declined, isConfirming, setIsConfirming });

    return (
        <LinearGradient colors={['#260725', '#422137']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }} style={styles.alertMedicationContainer}>
            <GestureHandlerRootView style={styles.main}>
                <View style={styles.headerView}>
                    <View style={{ width: '100%', height: '30%', }}>
                        <LottieView style={{ flex: 1, }} source={images.animations.alert} autoPlay loop />
                    </View>
                    <View style={{ width: '100%', marginTop: '10%', alignItems: 'center' }}>
                        <Text style={{ fontSize: 42, fontWeight: '900', letterSpacing: 2, color: '#d6abe0' }}>{medicationPending?.currentSchedule}</Text>
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#a07ea6', fontWeight: '500' }}>{`Dia ${FormatDateToSpeakDate(new Date())}`}</Text>
                    </View>
                </View>
                <View style={styles.contentView}>
                    <View style={{ width: '100%', marginVertical: '10%', alignItems: 'center' }}>
                        <View style={{ height: 170, width: 170, padding: '12%', borderRadius: screenWidth * 0.5, alignItems: 'center', justifyContent: 'center', backgroundColor: '#703f6e', elevation: 5, }}>
                            <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={mainIcon} />
                        </View>
                    </View>
                    <View style={{ width: '100%', flex: 1, gap: 10 }}>
                        <Text style={{ fontSize: 24, textAlign: 'center', fontWeight: '600', color: 'white' }}>{medicationPending?.medication.name}</Text>
                        <Text style={{ fontSize: 22, textAlign: 'center', color: '#ead8ed' }}>
                            {
                                `Tomar ${medicationPending.medication.dosage}${medicationPending.medication.type === 'Líquido' ? 'ml' : 'mg'}`
                            }
                        </Text>
                    </View>
                </View>
                <View style={styles.swipeButtonView}>
                    <GestureDetector gesture={swipeGesture}>
                        <View style={styles.swipeButton}>
                            {
                                !isConfirming && !confirmed && !declined &&
                                <LottieView style={[styles.directionAnimation, { transform: [{ scaleX: -1 }] }]} source={images.animations.arrows} autoPlay loop />
                            }
                            <Animated.View style={[styles.swipeTrigger, animatedStyle]}>
                                {
                                    isConfirming ?
                                        <DefaultLoading size={32} color={'#5763b5'} />
                                        :
                                        declined ? (
                                            <MaterialIcons name="cancel" size={32} color="white" />
                                        ) :
                                            confirmed ? (
                                                <MaterialIcons name="check" size={32} color="#57c979" />
                                            ) : (
                                                <MaterialIcons name="alarm" size={32} color="#9b86a6" />
                                            )
                                }
                            </Animated.View>
                        </View>
                    </GestureDetector>
                </View>
            </GestureHandlerRootView>
        </LinearGradient>
    )
}

export default AlertMedicationSession

const styles = StyleSheet.create({
    alertMedicationContainer: {
        height: screenHeight,
        flex: 1,
    },
    main: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: '10%',
        paddingTop: '8%',
        paddingBottom: '17%'
    },
    headerView: {
        width: '100%',
        height: screenHeight * 0.26,
        justifyContent: 'center',
    },
    contentView: {
        flex: 1,
        minHeight: '40%',
    },
    swipeButtonView: {
        width: '100%',
        height: '13%',
    },
    swipeButton: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(143, 99, 148, 0.4)',
        borderRadius: 100,
        padding: '2%',
        elevation: 20,
    },
    swipeTrigger: {
        zIndex: 2,
        width: '26%',
        height: '100%',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    directionAnimation: {
        height: '45%',
        opacity: 0.3,
        width: '50%',
        position: 'absolute',
        alignSelf: 'center',
        bottom: '30%',
    }
});
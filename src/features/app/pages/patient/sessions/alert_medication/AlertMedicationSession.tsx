import { StyleSheet, View } from 'react-native';
import React from 'react';
import { screenHeight } from '@utils/layout/Screen_Size';
import LinearGradient from 'react-native-linear-gradient';
import { useMedicationIcon } from '@hooks/medications/UseMedicationIcon';
import { UseLoading } from '@hooks/loading/UseLoading';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import { useMedicationPendingBehavior } from './hooks/useMedicationPendingBehavior';
import { useAlarmHandling } from './hooks/useAlarmHandling';
import { useSwipeAnimation } from './hooks/useSwipeAnimation';
import { usePriority } from '@features/app/providers/bridge/PriorityProvider';
import AlertMedicationHeader from './components/AlertMedicationHeader';
import AlertMedicationContent from './components/AlertMedicationContent';
import SwipeConfirmation from './components/SwipeConfirmation';

const AlertMedicationSession = () => {
    const { setLoading } = UseLoading();
    const { removePriority } = usePriority();
    const { HandleResponseAppError, HandleResponseAppSuccess } = UseGlobalResponse();
    const { medicationPending, isConfirming, handleLeaveAlert,
        setIsConfirming, confirmed, setConfirmed, translateX, confirmProgress,
        declined, setDeclined, clearMedicationPending, formattedTime } = useMedicationPendingBehavior({ removePriority });

    const { mainIcon } = useMedicationIcon(medicationPending?.medication.type);
    const { handleSwipeEnd, } = useAlarmHandling({
        setIsConfirming, confirmProgress, confirmed, medicationPending, declined, isConfirming,
        setLoading, HandleResponseAppError, HandleResponseAppSuccess,
        setDeclined, removePriority, setConfirmed, clearMedicationPending
    });

    const { swipeGesture, animatedStyle } = useSwipeAnimation({ translateX, confirmProgress, handleSwipeEnd, confirmed, declined, isConfirming, setIsConfirming });

    return (
        <LinearGradient colors={['#260725', '#422137']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }} style={styles.alertMedicationContainer}>
            <View style={styles.main}>
                <AlertMedicationHeader
                    currentSchedule={medicationPending?.currentSchedule}
                    handleLeaveAlert={handleLeaveAlert}
                    formattedTime={formattedTime}
                />
                <AlertMedicationContent
                    medication={medicationPending?.medication}
                    mainIcon={mainIcon}
                />
                <SwipeConfirmation
                    swipeGesture={swipeGesture}
                    animatedStyle={animatedStyle}
                    isConfirming={isConfirming}
                    confirmed={confirmed}
                    declined={declined}
                />
            </View>
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
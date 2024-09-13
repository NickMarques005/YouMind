import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { responsiveSize, screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { useMotivationalPhrase } from '@features/app/providers/patient/MotivationalPhraseProvider';
import CurrentPhrase from './components/current_phrase/CurrentPhrase';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import images from '@assets/images';
import { usePriority } from '@features/app/providers/bridge/PriorityProvider';
import { useMotivationalPhraseSessionBehavior } from './hooks/useMotivationalPhraseSessionBehavior';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { UserPatient, UserType } from 'types/user/User_Types';
import { useAllPhrasesModal } from './hooks/useAllPhrasesModal';
import GenericModal from '@components/modals/generic/GenericModal';
import AllPhrases from './components/all_phrases/AllPhrases';
import { UseLoading } from '@hooks/loading/UseLoading';

const MotivationalPhraseSession = () => {
    const { removePriority } = usePriority();
    const { userData } = UseForm();
    const { state: motivationalPhraseState } = useMotivationalPhrase();
    const viewingLoading = UseLoading();
    const { isAllPhrasesModalVisible, handleAllPhrasesModal } = useAllPhrasesModal();
    const { handleBackSessionPriority, currentPhrase,
        handleCurrentPhrase } = useMotivationalPhraseSessionBehavior({ removePriority, phrases: motivationalPhraseState.phrases });

    const backgroundSize = responsiveSize;
    return (
        <View style={{ width: screenWidth, height: screenHeight, alignItems: 'center' }}>
            <LinearGradient colors={['#532261', '#22112b']} style={{ flex: 1, width: '100%' }} >
                <View style={{ flex: 1, zIndex: 2, }}>
                    <CurrentPhrase
                        userData={userData as UserPatient}
                        handleBackSessionPriority={handleBackSessionPriority}
                        handleEnableAllPhrases={handleAllPhrasesModal}
                        currentPhrase={currentPhrase}
                        viewingLoading={viewingLoading}
                    />
                </View>

                <View style={{ opacity: 0.2, position: 'absolute', width: screenWidth, height: screenHeight }}>
                    <LottieView style={{ width: '100%', height: '100%' }} speed={0.7} source={images.animations.wave_fiber} autoPlay loop />
                </View>
                <View style={{ position: 'absolute', bottom: 0, width: '100%', height: screenHeight * 0.4, opacity: 0.4, zIndex: 1 }}>

                    <LottieView
                        style={{
                            top: -backgroundSize * 0.48,
                            right: backgroundSize * 0.5,
                            width: backgroundSize * 2,
                            height: backgroundSize,
                            transform: [{ rotate: '-90deg' }]
                        }}
                        source={images.animations.wave_background}
                        autoPlay
                        loop
                    />
                </View>
            </LinearGradient>
            {
                isAllPhrasesModalVisible &&
                <GenericModal
                    isVisible={isAllPhrasesModalVisible}
                    onClose={handleAllPhrasesModal}
                    userType={userData?.type as UserType}
                    containerStyle={styles.modalContainerStyle}
                >
                    <AllPhrases
                        closeModal={handleAllPhrasesModal}
                        phrases={motivationalPhraseState.phrases} 
                        handleCurrentPhrase={handleCurrentPhrase}
                        />
                </GenericModal>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainerStyle: {
        backgroundColor: 'rgba(124, 84, 135, 0.9)'
    }
});

export default MotivationalPhraseSession;
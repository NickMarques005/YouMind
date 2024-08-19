import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from './components/ExplanationHeader';
import ExplanationContent from './components/ExplanationContent';
import NextButton from './components/NextButton';
import { screenHeight } from '@utils/layout/Screen_Size';
import UseDisableInit from './hooks/UseDisableInit';
import EnableInitModal from '@components/modals/init/EnableInitModal';
import { UseInit } from '@features/root/providers/InitProvider';

const Explanation = () => {

    const { showDisableInitModal, ShowDisableInitModal, HideDisableInitModal } = UseDisableInit();
    const { HandleInitStatus } = UseInit();

    return (
        <View style={explanation_style.mainContainer}>

            <Header />
            <ScrollView style={{ flex: 1 }}>
                <View style={{ paddingTop: '25%' }}>
                    <ExplanationContent />
                    <NextButton showModal={ShowDisableInitModal} />
                </View>

            </ScrollView>
            {
                showDisableInitModal &&
                <EnableInitModal
                    isVisible={showDisableInitModal}
                    onClose={HideDisableInitModal}
                    message="Deseja desabilitar a mensagem de boas-vindas ao aplicativo YouMind?"
                    buttonTextLeft="Sim"
                    ButtonActionLeft={() => HandleInitStatus(true)}
                    buttonTextRight="Não"
                    ButtonActionRight={() => HandleInitStatus()}
                    iconSize={60}
                    iconName="help-circle-outline"
                />
            }

        </View >

    );
};

const explanation_style = StyleSheet.create({
    mainContainer: {
        height: screenHeight,
        flex: 1
    }
});

export default Explanation; 
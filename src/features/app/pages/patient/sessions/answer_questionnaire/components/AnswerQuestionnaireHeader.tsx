import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import images from '@assets/images';
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size';

interface AnswerQuestionnaireHeaderProps {
    backIcon: any;
    handleConfirmBackToAppModal: () => void;
    handleIntroduction: () => void;
}

const AnswerQuestionnaireHeader = ({ backIcon, handleConfirmBackToAppModal, handleIntroduction}: AnswerQuestionnaireHeaderProps) => {
    const iconSize = responsiveSize * 0.1;

    return (
        <View style={{ height: screenHeight * 0.1, width: '100%', justifyContent: 'space-between', flexDirection: 'row', }}>
            <TouchableOpacity style={{ height: iconSize, width: iconSize }} onPress={handleConfirmBackToAppModal}>
                <Image source={backIcon} style={{ height: iconSize, width: iconSize }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ height: iconSize, width: iconSize, alignItems: 'center', justifyContent: 'center' }} onPress={handleIntroduction}>
                <MaterialIcons
                    name="help-outline"
                    color="white"
                    size={35}
                    style={styles.icon} />
            </TouchableOpacity>
        </View>
    )
}

export default AnswerQuestionnaireHeader

const styles = StyleSheet.create({
    icon: {
        flex: 1,
        textAlign: 'center',
        aspectRatio: 1,
    },
});
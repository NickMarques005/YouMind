import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { responsiveSize } from '@utils/layout/Screen_Size';

const NoQuestionnaireToAnswer = () => {
    const noAnswerQuestionnaireIconSize = responsiveSize * 0.4;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: '100%', padding: '15%', alignItems: 'center' }}>
                <MaterialCommunityIcons name="clipboard-off" size={noAnswerQuestionnaireIconSize} color="rgba(255, 255, 255, 0.8)" />
            </View>
            <View style={{ gap: 20 }}>
                <Text style={{ textAlign: 'center', fontSize: 28, fontWeight: '600', color: 'white' }}>
                    Oops!
                </Text>
                <Text style={{ textAlign: 'center', fontSize: 22, color: 'rgba(255, 255, 255, 0.7)' }}>
                    Não há questionário para ser respondido.
                </Text>
            </View>

        </View>
    )
}

export default NoQuestionnaireToAnswer;

const styles = StyleSheet.create({})
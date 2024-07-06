import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import images from '@assets/images'
import { responsiveSize } from '@utils/layout/Screen_Size';

const NoHistoryQuestionnaire = () => {

    const noCurrentQuestionnaires = images.app_doctor_images.analysis.no_current_questionnaires;
    const iconSize = responsiveSize * 0.3;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 15 }}>
            <Image style={{width: iconSize, height: iconSize }} source={noCurrentQuestionnaires}/>
            <Text style={{width: '80%', textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#2d667b' }}>Nenhum histórico de questionários encontrado</Text>
        </View>
    )
}

export default NoHistoryQuestionnaire

const styles = StyleSheet.create({})
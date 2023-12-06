import React, { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { screenHeight, screenWidth } from '../../screen_size/Screen_Size';
import { LinearGradient } from 'expo-linear-gradient';
import { Treatment } from '../../../contexts/TreatmentContext';


interface TreatmentsProps {
    treatment: Treatment,
    handleTreatmentClick: ((treatment: Treatment) => void) | undefined;
}

function Treatments({ treatment, handleTreatmentClick }: TreatmentsProps) {
    
    
    return (
        <View style={styleTreatments.treatmentMainContainer}>
            <TouchableOpacity onPress={() => handleTreatmentClick ? handleTreatmentClick(treatment) : console.log(treatment)} style={styleTreatments.treatmentButton}>
                <View style={styleTreatments.treatmentImgView}>
                    <Image style={{ width: 85, height: 85 }} source={require('../../../assets/global/chat/treatment_icon.png')} />
                </View>
                <View style={styleTreatments.treatmentContentView}>
                    <Text style={styleTreatments.treatmentContentText}>
                        {treatment.name.split(' ')[0]}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styleTreatments = StyleSheet.create({
    treatmentMainContainer: {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    treatmentButton: {
        width: '100%',
        alignItems: 'center',
        gap: 6
    },
    treatmentImgView: {
        display: 'flex',
    },
    treatmentContentView: {

    },
    treatmentContentText: {
        fontSize: 16,
        color: '#424c6b',
        fontWeight: 'bold'
    }
})

export default Treatments
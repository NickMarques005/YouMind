import React, { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import images from '@assets/images';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';
import { formatName } from '@utils/treatment/formatTreatment';

interface OnGoingTreatmentTemplateProps {
    treatment: TreatmentInfoTemplate,
    handleSelectTreatment: ((treatment: TreatmentInfoTemplate) => void) | undefined;
}

const OnGoingTreatmentTemplate = ({ treatment, handleSelectTreatment }: OnGoingTreatmentTemplateProps) => {
    
    const treatmentIcon = images.app_doctor_images.treatment.treatment_icon;
    const formattedName = treatment.name ? formatName(treatment.name) : treatment.name;

    return (
        <View style={styles.treatmentMainContainer}>
            <TouchableOpacity onPress={() => handleSelectTreatment ? handleSelectTreatment(treatment) : console.log(treatment)} style={styles.treatmentButton}>
                <View style={styles.treatmentImgView}>
                    <Image style={{ width: 85, height: 85 }} source={treatmentIcon} />
                </View>
                <View style={styles.treatmentContentView}>
                    <Text style={styles.treatmentContentText}>
                        {formattedName}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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

export default OnGoingTreatmentTemplate;
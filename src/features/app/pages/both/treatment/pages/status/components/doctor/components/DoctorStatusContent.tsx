import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { TreatmentStatusScreenName } from 'types/treatment/Status_Types';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';

interface DoctorStatusContentProps {
    handleStatusNavigation: ((screenName: TreatmentStatusScreenName) => void) | undefined;
    currentTreatments?: TreatmentInfoTemplate[];
    endedTreatments?: TreatmentInfoTemplate[];
}

const DoctorStatusContent = ({
    handleStatusNavigation,
    currentTreatments,
    endedTreatments
}: DoctorStatusContentProps) => {

    const treatmentIconSize = responsiveSize * 0.08;
    const treatmentTextSize = responsiveSize * 0.07;
    const doctorStatusContentStyle = styles(treatmentIconSize, treatmentTextSize);

    return (
        <View style={doctorStatusContentStyle.doctorContentContainer}>
            <View style={{ flex: 1, gap: 10, }}>
                <TouchableOpacity style={doctorStatusContentStyle.treatmentButton} onPress={() => handleStatusNavigation && handleStatusNavigation('treatmentEnded')}>

                    <View style={doctorStatusContentStyle.iconButtonContainer}>
                        <FontAwesome5 name="check-circle" size={treatmentIconSize} color="#d2f8fc" />
                    </View>

                    <Text style={doctorStatusContentStyle.dataTitle}>Tratamentos Encerrados</Text>
                    <View style={doctorStatusContentStyle.iconTreatmentListView}>
                        <Text style={doctorStatusContentStyle.iconTreatmentListText}>
                            {
                                endedTreatments && endedTreatments?.length !== 0 ? endedTreatments.length : 0
                            }
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={doctorStatusContentStyle.treatmentButton} onPress={() => handleStatusNavigation && handleStatusNavigation('treatmentOnGoing')}>

                    <View style={doctorStatusContentStyle.iconButtonContainer}>
                        <FontAwesome5 name="hourglass-half" size={treatmentIconSize} color="#d2f8fc" />
                    </View>

                    <Text style={doctorStatusContentStyle.dataTitle}>Tratamentos em Andamento</Text>
                    <View style={doctorStatusContentStyle.iconTreatmentListView}>
                        <Text style={doctorStatusContentStyle.iconTreatmentListText}>
                            {
                                currentTreatments && currentTreatments?.length !== 0 ? currentTreatments.length : 0
                            }
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = (treatmentIconSize: number, treatmentTextSize: number) => {
    return StyleSheet.create({
        doctorContentContainer: {
            flex: 1,
            marginTop: 20,
        },
        iconButtonContainer: {
            width: treatmentIconSize,
            height: treatmentIconSize,
            alignItems: 'center'
        },
        dataTitle: {
            maxWidth: '75%',
            fontSize: 18,
            fontWeight: 'bold',
            color: '#d2f8fc'
        },
        treatmentButton: {
            flexDirection: 'row',
            width: '100%',
            backgroundColor: 'rgba(97, 165, 173, 0.5)',
            borderRadius: 15,
            gap: 10,
            height: screenHeight * 0.12,
            alignItems: 'center',
            padding: 15,
            marginBottom: treatmentTextSize / 2
        },
        iconTreatmentListView: {
            position: 'absolute',
            right: treatmentTextSize / 4,
            top: - treatmentTextSize / 2,
            width: treatmentTextSize * 2,
            height: treatmentTextSize * 2,
            backgroundColor: 'white',
            borderRadius: treatmentTextSize * 2,
            alignItems: 'center',
            justifyContent: 'center',
        },
        iconTreatmentListText: {
            fontSize: treatmentTextSize,
            color: 'rgba(97, 165, 173, 1)',
            fontWeight: '500'
        }
    });

}
export default DoctorStatusContent;
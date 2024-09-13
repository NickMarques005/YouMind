import images from '@assets/images';
import { UseMedications } from '@features/app/providers/patient/MedicationProvider';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useCurrentMedication } from '@features/app/providers/patient/CurrentMedicationProvider';
import { UseTreatment } from '@features/app/providers/sub/TreatmentProvider';

const CurrentMedicine = () => {
    const { treatment_state } = UseTreatment();
    const { medications } = UseMedications();
    const { nextMedication, alertText } = useCurrentMedication();
    let nameParts;
    if (nextMedication) {
        nameParts = nextMedication.name.split(' ');
    }

    const currentmed = images.app_patient_images.home.icon_med3;
    const currentMedBg = images.app_patient_images.home.bg_home_content_2;


    return (
        <View style={styles.medicines_View}>
            <ImageBackground
                source={currentMedBg}
                style={styles.backgroundImage_CurrentMedicine}
            >
                <View style={{ flex: 1, justifyContent: 'center', paddingLeft: '10%', }}>
                    <Image
                        source={currentmed}
                        style={styles.iconImage_Pills}
                    />
                </View>
                {
                    treatment_state.treatments.length === 0 ?
                        <View style={styles.noPillsAlert_View}>
                            <Text style={styles.noPillsAlert_Title}>Não há medicamentos..</Text>
                            <View style={{ width: '100%', marginBottom: '5%' }}>
                                <Text style={styles.noPillsAlert_Text}>Quando você estiver em um tratamento o próximo medicamento a ser tomado será mostrado aqui!</Text>
                            </View>
                        </View> :
                        nextMedication ?
                            <View style={styles.pillsAlert_View}>
                                <Text style={styles.pillsAlert_Title}>Próxima Medicação</Text>
                                <View style={{ width: '100%', marginBottom: '5%' }}>
                                    <Text style={styles.pillsAlert_Text}>{`${nameParts && nameParts[0]}`}</Text>
                                    <Text style={styles.pillsAlert_Text}>{`${nameParts && nameParts[1]}`}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', padding: '3%', backgroundColor: 'rgba(138, 96, 134, 0.4)', borderRadius: 10, maxWidth: '94%', }}>
                                    <MaterialIcons name="access-time-filled" size={22} color="#5f3463" />
                                    <Text style={styles.pillsAlertHour_Text}>{alertText}</Text>
                                </View>
                            </View>
                            :
                            <View style={styles.noPillsAlert_View}>
                                <Text style={styles.noPillsAlert_Title}>{ medications.length !== 0 ? "Sem agendamentos" : "Sem medicamentos"}...</Text>
                                <View style={{ width: '100%', marginBottom: '5%' }}>
                                    <Text style={styles.noPillsAlert_Text}>
                                        {
                                            medications.length !== 0 ?
                                            `Quando agendar seus medicamentos, o próximo a ser tomado será mostrado aqui!`
                                            :
                                            `Quando houver medicamentos, o próximo a ser tomado será mostrado aqui!`
                                        }
                                    </Text>
                                </View>
                            </View>
                }
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    medicines_View: {
        overflow: 'hidden',
        flexDirection: 'column',
        minHeight: screenHeight * 0.2,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    backgroundImage_CurrentMedicine: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        gap: 10,
    },
    iconImage_Pills: {
        width: screenWidth * 0.3,
        height: screenWidth * 0.3,
        alignSelf: 'center',
    },
    pillsAlert_Title: {
        fontWeight: '800',
        textTransform: 'uppercase',
        fontSize: 17,
        color: '#b347ad',
        marginBottom: '4%'
    },
    noPillsAlert_Title: {
        fontWeight: '800',
        textTransform: 'uppercase',
        fontSize: 17,
        color: '#b347ad',
        marginBottom: '4%',
        textAlign: 'center'
    },
    pillsAlert_View: {
        width: '60%',
        alignItems: 'flex-end',
        paddingVertical: '8%',
        paddingHorizontal: '5%',
    },
    noPillsAlert_View: {
        width: '64%',
        alignItems: 'center',
        paddingVertical: '8%',
        paddingHorizontal: '5%',
    },
    pillsAlert_Text: {
        fontSize: 16,
        textAlign: 'right',
        color: 'purple',
        fontWeight: '500'
    },
    noPillsAlert_Text: {
        fontSize: 16,
        textAlign: 'center',
        color: 'purple',
        fontWeight: '500'
    },
    pillsAlertHour_Text: {
        fontSize: 16,
        fontWeight: '600',
        color: '#5f3463'
    },
});



export default CurrentMedicine;
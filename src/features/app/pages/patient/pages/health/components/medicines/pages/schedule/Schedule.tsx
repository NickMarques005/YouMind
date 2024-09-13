import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, Image, ImageBackground, ImageSourcePropType } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { UseMedications } from '@features/app/providers/patient/MedicationProvider';
import NoCurrentMedications from './components/NoCurrentMedications';
import { Medication, MedicationType } from 'types/app/patient/health/Medicine_Types';
import images from '@assets/images';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { UseMedicationNavigation } from '../../hooks/UseMedicationNavigation';
import DefaultModal from '@components/modals/default/DefaultModal';
import { UseLoading } from '@hooks/loading/UseLoading';
import { useScheduleBehavior } from './hooks/UseScheduleBehavior';
import MedicationItem from './components/MedicationItem';
import RemoveMedication from './components/RemoveMedication';
import { useScheduleHandling } from './hooks/UseScheduleHandling';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';

const Schedule = () => {
    const { medications } = UseMedications();
    const { navigateToMedicationScreen } = UseMedicationNavigation();
    const { HandleResponseAppError, HandleResponseAppSuccess } = UseGlobalResponse();
    const removeLoading = UseLoading();
    const {
        clearCurrentMedication, handleCurrentMedication,
        currentMedication, handleSelectedMedication } = useScheduleBehavior();
    const { handleDeleteMedication } = useScheduleHandling({ 
        setLoading: removeLoading.setLoading, 
        HandleResponseAppError, 
        HandleResponseAppSuccess 
    });

    const backIcon = images.generic_images.back.arrow_back_white;
    const current_medications_illustration = images.app_patient_images.health.medicines.current_medications_illustration;
    const addIcon = images.generic_images.add.add_icon;

    const capsuleIcon = images.app_patient_images.health.medicines.capsule_medication;
    const pillIcon = images.app_patient_images.health.medicines.pill_medication;
    const liquidIcon = images.app_patient_images.health.medicines.liquid_medication;
    
    const removeCapsule = images.app_patient_images.health.medicines.remove_capsule;
    const removePill = images.app_patient_images.health.medicines.remove_pill;
    const removeLiquid = images.app_patient_images.health.medicines.remove_liquid;

    const iconVerification = (type: MedicationType, remove?: boolean): ImageSourcePropType => {
        switch (type) {
            case "Comprimido":
                if(remove) return removePill;
                return pillIcon;
            case "Cápsula":
                if(remove) return removeCapsule;
                return capsuleIcon;
            case "Líquido":
                if(remove) return removeLiquid;
                return liquidIcon;
            default:
                if(remove) return removeCapsule;
                return capsuleIcon;
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <ImageBackground source={current_medications_illustration}
                    style={{ width: '110%', height: '110%', position: 'absolute', right: '-16%', bottom: '5%', opacity: 0.6 }}
                    resizeMode="contain" />
                <View style={{ width: '100%', height: '30%', justifyContent: 'space-between', }}>
                    <TouchableOpacity onPress={() => navigateToMedicationScreen('main_medication')} style={{ height: '100%', width: 50, padding: '2%' }}>
                        <Image source={backIcon} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', flex: 1, paddingVertical: '5%' }}>
                    <View style={{}}>
                        <Text style={styles.headerTitle}>Meus Medicamentos</Text>
                    </View>
                    <View style={{ width: '55%', flex: 1 }}>
                        <Text style={styles.headerSubTitle}>Gerencie suas medicações com confiança</Text>
                    </View>
                </View>
            </View>
            <View style={styles.content}>
                <View style={{ position: 'absolute', width: 70, height: 70, borderRadius: screenWidth * 0.1, top: '-10%', elevation: 8, alignSelf: 'center', zIndex: 5, }}>
                    <LinearGradient colors={['#c265b5', '#e89bc0']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }} style={{ height: '100%', width: '100%', borderRadius: screenWidth * 0.1, }}>
                        <TouchableOpacity onPress={() => navigateToMedicationScreen('add_medication')} style={{ width: '100%', height: '100%', padding: '30%', }}>
                            <Image source={addIcon} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
                {medications.length > 0 ? (
                    <FlatList
                        data={medications}
                        renderItem={
                            ({ item }) =>
                            <MedicationItem item={item}
                                icon={iconVerification(item.type)}
                                handleCurrentMedication={handleCurrentMedication}
                                navigateToUpdateMedication={() => handleSelectedMedication(item)}
                            />
                        }
                        keyExtractor={(item) => item._id}
                        contentContainerStyle={styles.medicationList}
                    />
                ) : (
                    <NoCurrentMedications />
                )}
            </View>
            {
                currentMedication &&
                <DefaultModal disableGestures={false} onClose={clearCurrentMedication} isVisible={!!currentMedication}>
                    <RemoveMedication closeModal={clearCurrentMedication} medication={currentMedication} removeMedication={handleDeleteMedication} loading={removeLoading.loading} removeIcon={iconVerification(currentMedication.type, true)} />
                </DefaultModal>
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: screenHeight * 0.3,
        padding: 20,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: '#782474',
        overflow: 'hidden'
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f1e1f2',
    },
    headerSubTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#e3d3e0',
        textAlign: 'left'
    },
    content: {
        flex: 1,
    },
    medicationList: {
        paddingTop: '2%',
        paddingHorizontal: '6%',
    },
    medicationItem: {
        backgroundColor: '#f9f9f9',
        borderRadius: 15,
        marginBottom: '4%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    medicationName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4d2448',
    },
    medicationDetails: {
        fontSize: 14,
        color: '#666',
    },
    addMedicationButtonContainer: {
        position: 'absolute',
        bottom: '2%',
        right: '2%',
        opacity: 0.9,
        width: screenWidth * 0.5,
        height: screenHeight * 0.1,
        alignSelf: 'flex-end',
    },
    addMedicationButton: {},
    addMedicationGradient: {
        height: '100%',
        borderRadius: 80,
        paddingVertical: '7%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: '5%',
    },
    addMedicationIcon: {
        flex: 1,
        resizeMode: 'contain',
    },
    addMedicationText: {
        fontSize: 16,
        textAlign: 'left',
        color: 'white',
        fontWeight: '500',
        flex: 1,
    },
});

export default Schedule;
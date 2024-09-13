import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DefaultLoading from '@components/loading/DefaultLoading';
import { SearchUserData } from 'types/treatment/Search_Types';
import { screenHeight } from '@utils/layout/Screen_Size';

interface SelectedUserSolicitationButtonProps {
    selectedUser: SearchUserData;
    solicitationLoading: { loading: boolean };
    handleModalSolicitation: (visible: boolean) => void;
    isDoctorTreatment?: boolean;
    iconIsTreatmentRunningSize: number;
    iconInTreatmentSize: number;
    iconInTreatment: any;
    treatmentUserIcon: any;
}

const SelectedUserSolicitationButton = ({
    selectedUser,
    solicitationLoading,
    handleModalSolicitation,
    isDoctorTreatment,
    iconIsTreatmentRunningSize,
    iconInTreatmentSize,
    treatmentUserIcon,
    iconInTreatment
}: SelectedUserSolicitationButtonProps) => {

    return (
        <>
            {!selectedUser.is_treatment_running || isDoctorTreatment ? (
                <View style={styles.initTreatment_Container}>
                    <LinearGradient
                        colors={
                            selectedUser.type === 'patient'
                                ? ['#914183', '#b565a9']
                                : ['#417c91', 'rgba(64, 76, 168, 0.7)']
                        }
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={[styles.handleTreatment_View, { opacity: solicitationLoading.loading ? 0.5 : 1 }]}
                    >
                        <TouchableOpacity
                            disabled={solicitationLoading.loading}
                            onPress={() => handleModalSolicitation(true)}
                            style={styles.initTreatment_Button}
                        >
                            {solicitationLoading.loading ? (
                                <DefaultLoading size={25} color={'white'} />
                            ) : (
                                <Text style={styles.initTreatment_Text}>Iniciar Tratamento</Text>
                            )}
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            ) : (
                <LinearGradient
                    colors={
                        selectedUser.type === 'patient'
                            ? ['transparent', '#43264a']
                            : ['#417c91', 'rgba(64, 76, 168, 0.7)']
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.alreadyInTreatment_View}
                >
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Text style={[styles.initTreatment_Text, { width: '70%', textAlign: 'center' }]}>
                            {`O paciente já está em tratamento no momento com:`}
                        </Text>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            paddingHorizontal: '5%',
                            paddingVertical: '2%',
                            borderRadius: 10,
                            backgroundColor: 'rgba(40, 26, 46, 0.3)',
                            gap: 20,
                        }}
                    >
                        {selectedUser.doctor && (
                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ paddingRight: '3%' }}>
                                    <Image
                                        style={{
                                            height: iconIsTreatmentRunningSize,
                                            width: iconIsTreatmentRunningSize,
                                            borderRadius: iconIsTreatmentRunningSize,
                                            borderWidth: 2,
                                            borderColor: selectedUser.type === 'patient' ? '#b780c4' : '#417c91',
                                        }}
                                        source={
                                            selectedUser.doctor.avatar
                                                ? { uri: selectedUser.doctor.avatar }
                                                : treatmentUserIcon
                                        }
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: 'white' }}>{selectedUser.doctor.name}</Text>
                                    <Text style={{ color: 'white', opacity: 0.6, fontSize: 12 }}>
                                        {
                                            selectedUser.doctor.private ? "Possui perfil privado" :
                                                selectedUser.doctor.email
                                        }
                                    </Text>
                                </View>
                            </View>
                        )}
                        <View style={{ width: iconInTreatmentSize, height: iconInTreatmentSize, padding: '2.5%' }}>
                            <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={iconInTreatment} />
                        </View>
                    </View>
                </LinearGradient>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    initTreatment_Container: {
        backgroundColor: 'transparent',
        borderRadius: 50,
        marginHorizontal: '8%',
        paddingVertical: 20
    },
    handleTreatment_View: {
        width: '100%',
        alignItems: 'center',
        height: screenHeight * 0.1,
        borderRadius: 50,
    },
    initTreatment_Button: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    initTreatment_Text: {
        fontSize: 18,
        color: 'white'
    },
    alreadyInTreatment_View: {
        display: 'flex',
        gap: 15,
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        paddingVertical: '3.5%',
        paddingHorizontal: '4%',
    },
    alreadyInTreatment_Text: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    alreadyInTreatment_MiniText: {
        fontSize: 16,
        color: 'rgba(191, 191, 214, 0.8)',
    }
});

export default SelectedUserSolicitationButton;
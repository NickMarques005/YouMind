import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DefaultLoading from '@components/loading/DefaultLoading';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';
import { UserData } from 'types/user/User_Types';

interface EndTreatmentButtonProps {
    currentTreatment?: TreatmentInfoTemplate;
    userData?: UserData;
    loading: boolean;
    handleEndTreatment: (id: string, type: string) => Promise<void>;
    handleCloseTreatmentVerification: (handleAccept: () => void, message?: string, acceptMessage?: string) => void;
}

const EndTreatmentButton: React.FC<EndTreatmentButtonProps> = ({
    currentTreatment,
    userData,
    loading,
    handleEndTreatment,
    handleCloseTreatmentVerification,
}) => {
    return (
        <LinearGradient colors={['#52a2ab', '#407d82', '#2a5f61']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }} style={{ width: '100%', borderRadius: 50, marginBottom: 25, }}>
            <TouchableOpacity
                onPress={() => currentTreatment && userData?.type && handleCloseTreatmentVerification(
                    () => handleEndTreatment(currentTreatment._id, userData.type),
                    `Gostaria de encerrar o tratamento do paciente ${currentTreatment?.name}?`,
                    "Encerrar"
                )}
                style={{ paddingVertical: 25, width: '100%', alignItems: 'center', justifyContent: 'center' }}
            >
                {loading ? (
                    <DefaultLoading size={25} color={'white'} />
                ) : (
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#f5f7f7' }}>
                        ENCERRAR TRATAMENTO
                    </Text>
                )}
            </TouchableOpacity>
        </LinearGradient>
    );
};

export default EndTreatmentButton;
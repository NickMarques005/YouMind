import { Text, View } from 'react-native'
import React from 'react'
import { SearchUserData } from 'types/treatment/Search_Types'
import { UserData } from 'types/user/User_Types';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '@components/button/CustomButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { buttonCancelGradient, buttonDefaultGradient, confirm_solicitation_modal_style } from '../styles/confirm_solicitation_modal_style';

interface ConfirmSolicitationModalProps {
    userSearch: SearchUserData;
    userData: UserData;
    handleTreatmentSolicitation: (receiver_email: string, type: string, onSuccess?: () => void) => Promise<void>;
    closeModal: () => void;
}

const ConfirmSolicitationModal = ({ userData, userSearch, handleTreatmentSolicitation, closeModal }: ConfirmSolicitationModalProps) => {
    
    const styles = confirm_solicitation_modal_style(userData.type)
    const gradientCancel = buttonCancelGradient(userData.type);
    const gradientDefault = buttonDefaultGradient(userData.type);
    const genderPronoun = userSearch.gender === 'Feminino' ? "a" : "o";
    const genderPreposition = userSearch.gender === 'Feminino' ? "à" : "ao";
    const receiverName = userSearch.name;

    return (
        <View style={styles.container}>
            <View style={styles.messageView}>
                <Text style={styles.message}>
                    {
                        `Gostaria de iniciar tratamento com ${genderPronoun} paciente ${receiverName}? Será enviada uma solicitação ${genderPreposition} ${receiverName} para confirmar a ação.`
                    }
                </Text>
            </View>
            <View style={styles.iconContainer}>
                <Icon name="healing" size={50} color={ userData.type === 'doctor' ? "#4ea6a0" : "#8a4ea6"} /> 
            </View>
            <View style={styles.buttonContainer}>
                <LinearGradient
                    colors={gradientCancel.colors}
                    start={gradientCancel.start}
                    end={gradientCancel.end}
                    style={styles.buttonGradient}>
                    <CustomButton
                        title={"Cancelar"}
                        onPress={closeModal}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                    />
                </LinearGradient>

                <LinearGradient
                    colors={gradientDefault.colors}
                    start={gradientDefault.start}
                    end={gradientDefault.end}
                    style={styles.buttonGradient}>
                    <CustomButton
                        title={"Enviar"}
                        onPress={() => {
                            handleTreatmentSolicitation(userSearch.email, userData.type)
                            closeModal();
                        }}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                    />
                </LinearGradient>
            </View>
        </View>
    )
}

export default ConfirmSolicitationModal;


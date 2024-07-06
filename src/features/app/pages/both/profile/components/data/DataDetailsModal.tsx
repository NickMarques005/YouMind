import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import CustomTextInput from '@components/text_input/CustomInput';
import images from '@assets/images';
import { UserData } from 'types/user/User_Types';
import { UseUpdateProfileData } from '../../hooks/UseUpdateProfileData';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { data_details_style } from '../../styles/data/data_details_style';
import { FormatPhone } from '@utils/user/DataFormatting';
import { FormatISOToStringDate } from '@utils/date/DateFormatting';
import { UseLoading } from '@hooks/loading/UseLoading';
import { UseHandleProfileDetails } from '../../hooks/UseHandleProfileDetails';

import ChooseGender from './ChooseGender';
import DefaultLoading from '@components/loading/DefaultLoading';
import { MessageIcon } from '@components/modals/message/types/type_message_modal';

interface DataDetailsModalProps {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    closeModal: () => void;
    userData?: UserData;
    HandleResponseAppError: (value: string) => void;
    HandleResponseAppSuccess: (message: string, messageType: MessageIcon) => void;
}

const DataDetailsModal: React.FC<DataDetailsModalProps> = ({ loading, setLoading, closeModal, userData, HandleResponseAppError, HandleResponseAppSuccess }) => {
    const { UpdateSpecificDataInUser } = UseForm();
    const { userDataToUpdate, handleChangeText, handleUpdateProfileData, isButtonEnabled, prevPhone, handleChangeGender } = UseUpdateProfileData({ userData, setLoading, closeModal, HandleResponseAppError, updateProfileData: UpdateSpecificDataInUser, HandleResponseAppSuccess });
    const { showGenderOptions, handleGenderOptions } = UseHandleProfileDetails({ userDataToUpdate });
    const styles = data_details_style(userData?.type);
    const genderIcon = userData?.type === 'doctor' ? images.app_doctor_images.profile.icon_gender : images.app_patient_images.profile.icon_gender;

    return (
        <View style={styles.container}>
            {
                showGenderOptions ?
                    <ChooseGender userType={userData?.type} goBack={() => handleGenderOptions(false)} setGender={handleChangeGender} userDataToUpdate={userDataToUpdate} />
                    :
                    <>
                        <View style={styles.header}>
                            <Text style={styles.title}>Editar Perfil</Text>
                        </View>
                        <View style={styles.inputsContainer}>
                            <View style={styles.viewInputTemplate}>
                                <Text style={styles.textInputTemplate}>Nome</Text>
                                <CustomTextInput
                                    value={userDataToUpdate.name}
                                    inputStyle={styles.input}
                                    viewStyle={styles.viewInput}
                                    onChangeText={(text) => handleChangeText('name', text)}
                                    placeholder="Nome"
                                    editable={!loading}
                                />
                            </View>
                            <View style={styles.viewInputTemplate}>
                                <Text style={styles.textInputTemplate}>Data de nascimento</Text>
                                <CustomTextInput
                                    value={userDataToUpdate.birth}
                                    inputStyle={styles.input}
                                    viewStyle={styles.viewInput}
                                    keyboardType={'number-pad'}
                                    onChangeText={(text) => handleChangeText('birth', text)}
                                    editable={!loading}
                                    placeholder="Data de Nascimento"
                                />
                            </View>
                            <View style={styles.viewInputTemplate}>
                                <Text style={styles.textInputTemplate}>Gênero</Text>
                                <CustomTextInput
                                    value={userDataToUpdate.gender}
                                    inputStyle={styles.input}
                                    viewStyle={styles.viewInput}
                                    onChangeText={(text) => console.log(text)}
                                    customDisabled={true}
                                    placeholder="Gênero"
                                    iconAfter={genderIcon}
                                    onIconAfterPress={() => handleGenderOptions(true)}
                                    iconAfterStyle={styles.iconCalendar}
                                    customLoading={loading}
                                />
                            </View>
                            <View style={styles.viewInputTemplate}>
                                <Text style={styles.textInputTemplate}>Telefone</Text>
                                <CustomTextInput
                                    value={userDataToUpdate.phone ? FormatPhone(userDataToUpdate.phone.toString(), prevPhone) : ''}
                                    inputStyle={styles.input}
                                    viewStyle={styles.viewInput}
                                    onChangeText={(text) => handleChangeText('phone', text)}
                                    placeholder="Telefone"
                                    keyboardType={'phone-pad'}
                                    maxLength={15}
                                    editable={!loading}
                                />
                            </View>

                        </View>

                        <TouchableOpacity disabled={!isButtonEnabled || loading} style={[styles.button, { opacity: loading ? 0.5 : isButtonEnabled ? 1 : 0.5 }]} onPress={() => handleUpdateProfileData(userDataToUpdate)}>
                            {
                                loading ?
                                    <DefaultLoading color={'white'} size={20} />
                                    :
                                    <Text style={styles.buttonText}>Confirmar Alterações</Text>}
                        </TouchableOpacity>
                    </>
            }
        </View >
    );
};

export default DataDetailsModal;
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import images from '@assets/images';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { UseProfileNavigation } from '../../hooks/UseProfileNavigation';
import { profile_data_style } from '../../styles/data/profile_data_style';
import DefaultModal from '@components/modals/default/DefaultModal';
import UploadImageModal from './UploadImageModal';
import DataDetailsModal from './DataDetailsModal';
import { UseLoading } from '@hooks/loading/UseLoading';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';

const ProfileData = () => {
    const { userData } = UseForm();
    const dataDetailsLoading = UseLoading();
    const avatarLoading = UseLoading();
    const { navigateToProfileScreen } = UseProfileNavigation();
    const [isUploadModalVisible, setUploadModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const { HandleResponseAppError, HandleResponseAppSuccess } = UseGlobalResponse();

    const styles = profile_data_style(userData?.type);

    const backIcon = userData?.type === 'doctor' ? images.generic_images.back.arrow_back_doctor : images.generic_images.back.arrow_back_patient;
    const imageDefault = userData?.type === 'doctor' ? images.app_doctor_images.profile.doctor_profile_icon : images.app_patient_images.profile.user_profile_icon;

    useEffect(() => {
        console.log("USER DATA UPDATE: ", userData)
    }, [userData]);

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ paddingBottom: '10%'}}>
                <View style={styles.screenProfileData}>
                    <View style={styles.headerProfileData}>
                        <TouchableOpacity onPress={() => navigateToProfileScreen('main_profile')} style={styles.exitProfileData_Button}>
                            <Image style={{ height: 35, width: 35 }} source={backIcon} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.accountView}>
                        <View style={styles.accountUserPhotoView}>
                            <View style={styles.accountButton}>
                                <Image
                                    style={styles.accountImage}
                                    source={userData?.avatar ? { uri: userData?.avatar } : imageDefault}
                                />
                            </View>
                            <TouchableOpacity style={styles.cameraIcon} onPress={() => setUploadModalVisible(true)}>
                                <Ionicons name="camera" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.accountUserTextView}>
                            <Text style={styles.accountUserText}>{userData && userData.name}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.profileMainOptionsView}>
                    <View style={styles.headerProfileOptionsView}>
                        <Text style={{ color: userData?.type === 'doctor' ? '#446580' : '#6b4480', fontSize: 16, fontWeight: 'bold' }}>Seus Dados Pessoais</Text>
                        <TouchableOpacity style={styles.editProfileDataButton} onPress={() => setEditModalVisible(true)}>
                            <MaterialIcons name="edit" size={24} color={userData?.type === 'doctor' ? 'rgba(90, 151, 166, 0.7)' : "rgba(149, 90, 166, 0.7)"} />
                            <Text style={styles.editProfileDataButtonText}>Editar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.profileOptionsView, { borderTopLeftRadius: 20, borderTopRightRadius: 20 }]}>
                        <View style={styles.profileOptionView}>
                            <MaterialIcons name="email" size={24} color="white" />
                            <View style={styles.profileOptionTemplate}>
                                <Text style={{ color: 'white', fontSize: 16, }}>E-mail</Text>
                                <Text style={{ color: userData?.type === 'doctor' ? '#d0e7f5' : '#ebd0f5', fontSize: 14 }}>{userData && userData.email}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.profileOptionsView, {}]}>
                        <View style={styles.profileOptionView}>
                            <MaterialIcons name="cake" size={24} color="white" />
                            <View style={styles.profileOptionTemplate}>
                                <Text style={{ color: 'white', fontSize: 16, }}>Data de nascimento</Text>
                                <Text style={{ color: userData?.type === 'doctor' ? '#d0e7f5' : '#ebd0f5', fontSize: 14 }}>{userData && userData.birth ? userData.birth : 'Não especificada'}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.profileOptionsView, {}]}>
                        <View style={styles.profileOptionView}>
                            <MaterialIcons name="wc" size={24} color="white" />
                            <View style={styles.profileOptionTemplate}>
                                <Text style={{ color: 'white', fontSize: 16, }}>Gênero</Text>
                                <Text style={{ color: userData?.type === 'doctor' ? '#d0e7f5' : '#ebd0f5', fontSize: 14 }}>{userData && userData.gender ? userData.gender : 'Prefiro não informar'}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.profileOptionsView, { borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }]}>
                        <View style={styles.profileOptionView}>
                            <Ionicons name="call" size={24} color="white" />
                            <View style={styles.profileOptionTemplate}>
                                <Text style={{ color: 'white', fontSize: 16, }}>Telefone</Text>
                                <Text style={{ color: userData?.type === 'doctor' ? '#d0e7f5' : '#ebd0f5', fontSize: 14 }}>{userData && userData.phone}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            {isUploadModalVisible &&
                <DefaultModal disableGestures={avatarLoading.loading} userType={userData?.type} isVisible={isUploadModalVisible} onClose={() => setUploadModalVisible(false)}>
                    <UploadImageModal loading={avatarLoading.loading} setLoading={avatarLoading.setLoading} closeModal={() => setUploadModalVisible(false)} />
                </DefaultModal>
            }
            {
                isEditModalVisible &&
                    <DefaultModal disableGestures={dataDetailsLoading.loading} userType={userData?.type} isVisible={isEditModalVisible} onClose={() => setEditModalVisible(false)}>
                        <DataDetailsModal loading={dataDetailsLoading.loading} setLoading={dataDetailsLoading.setLoading} HandleResponseAppSuccess={HandleResponseAppSuccess} HandleResponseAppError={HandleResponseAppError} userData={userData} closeModal={() => setEditModalVisible(false)}/>
                    </DefaultModal>
            }
        </ScrollView>
    );
};

export default ProfileData;
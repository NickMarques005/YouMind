import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import images from '@assets/images';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { UseProfileNavigation } from '../../hooks/UseProfileNavigation';
import { profile_data_style } from '../../styles/data/profile_data_style';
import DefaultModal from '@components/modals/default/DefaultModal';
import UploadImageModal from './components/UploadImageModal';
import DataDetailsModal from './components/DataDetailsModal';
import { UseLoading } from '@hooks/loading/UseLoading';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import { responsiveSize } from '@utils/layout/Screen_Size';
import LinearGradient from 'react-native-linear-gradient';
import { useProfileDataBehavior } from './hooks/UseProfileDataBehavior';
import { FormatToPhoneNumber } from '@utils/user/DataFormatting';

const ProfileData = () => {
    const { userData } = UseForm();
    const dataDetailsLoading = UseLoading();
    const avatarLoading = UseLoading();
    const { HandleResponseAppError, HandleResponseAppSuccess } = UseGlobalResponse();
    const { isEditModalVisible, isUploadModalVisible, handleEditModalVisible,
        handleUploadModalVisible, goToRestrictions, goToMainProfile } = useProfileDataBehavior();
    const backIconSize = responsiveSize * 0.09;
    const restrictionIconSize = responsiveSize * 0.12;
    const styles = profile_data_style(userData?.type, backIconSize);

    const backIcon = userData?.type === 'doctor' ? images.generic_images.back.arrow_back_doctor : images.generic_images.back.arrow_back_patient;
    const imageDefault = userData?.type === 'doctor' ? images.app_doctor_images.profile.doctor_profile_icon : images.app_patient_images.profile.user_profile_icon;

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.profileMainContainer}>
                <View style={styles.screenProfileData}>
                    <View style={styles.headerProfileData}>
                        <TouchableOpacity onPress={goToMainProfile} style={styles.exitProfileData_Button}>
                            <Image style={{ height: backIconSize, width: backIconSize }} source={backIcon} />
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
                            <TouchableOpacity style={styles.cameraIcon} onPress={handleUploadModalVisible}>
                                <Ionicons name="camera" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.accountUserTextView}>
                            <Text style={styles.accountUserText}>{userData && userData.name}</Text>
                        </View>
                    </View>
                </View>

                {
                    //Restrição de Perfil
                }
                <View style={styles.restrictionProfileView}>
                    <View style={styles.restrictionContainerIcon}>
                        <LinearGradient colors={userData?.type === 'doctor' ? ['#298787', '#4d8999'] : ['#822a6a', '#b049c9']}
                            style={{
                                width: restrictionIconSize,
                                height: restrictionIconSize,
                                borderRadius: restrictionIconSize / 2,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {
                                userData?.private ? (
                                    <MaterialCommunityIcons name="shield-lock" size={restrictionIconSize / 1.5} color="white" />
                                ) : (
                                    <MaterialIcons name="public" size={restrictionIconSize / 1.5} color="white" />
                                )
                            }
                        </LinearGradient>
                    </View>
                    <View style={styles.restrictionContainerTitle}>
                        <Text style={styles.restrictionTitleText}>
                            {
                                userData?.private ? `Você restringiu seu perfil ${userData?.private_treatment ? 'para todos' : ''}`
                                    :
                                    "Seu perfil está público"
                            }
                        </Text>
                        <TouchableOpacity onPress={goToRestrictions}>
                            <Text style={styles.learnMoreText}>
                                {`Saiba mais`}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.profileMainOptionsView}>
                    <View style={styles.headerProfileOptionsView}>
                        <Text style={{ color: userData?.type === 'doctor' ? '#446580' : '#6b4480', fontSize: 16, fontWeight: 'bold' }}>Seus Dados Pessoais</Text>
                        <TouchableOpacity style={styles.editProfileDataButton} onPress={handleEditModalVisible}>
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
                                <Text style={{ color: userData?.type === 'doctor' ? '#d0e7f5' : '#ebd0f5', fontSize: 14 }}>{userData && FormatToPhoneNumber(userData.phone)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            {isUploadModalVisible &&
                <DefaultModal
                    disableGestures={avatarLoading.loading}
                    userType={userData?.type}
                    isVisible={isUploadModalVisible}
                    onClose={handleUploadModalVisible}>
                    <UploadImageModal
                        loading={avatarLoading.loading}
                        setLoading={avatarLoading.setLoading}
                        closeModal={handleUploadModalVisible}
                    />
                </DefaultModal>
            }
            {
                isEditModalVisible &&
                <DefaultModal
                    disableGestures={dataDetailsLoading.loading}
                    userType={userData?.type} isVisible={isEditModalVisible}
                    onClose={handleEditModalVisible}>
                    <DataDetailsModal
                        loading={dataDetailsLoading.loading}
                        setLoading={dataDetailsLoading.setLoading}
                        HandleResponseAppSuccess={HandleResponseAppSuccess}
                        HandleResponseAppError={HandleResponseAppError}
                        userData={userData}
                        closeModal={handleEditModalVisible}
                    />
                </DefaultModal>
            }
        </ScrollView>
    );
};

export default ProfileData;
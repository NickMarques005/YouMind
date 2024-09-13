import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size'
import { SearchUserData } from 'types/treatment/Search_Types';
import { UserData, UserType } from 'types/user/User_Types';
import images from '@assets/images';
import { UseLoading } from '@hooks/loading/UseLoading';
import { UseSolicitation } from './hooks/UseSolicitation';
import DefaultModal from '@components/modals/default/DefaultModal';
import ConfirmSolicitationModal from './solicitation/ConfirmSolicitationModal';
import DefaultLoading from '@components/loading/DefaultLoading';
import SearchUserInfo from './components/SearchUserInfo';
import SearchDoctorTreatments from './components/SearchDoctorTreatments';
import { useSelectedUserHandling } from './hooks/useSelectedUserHandling';
import { useSelectedUserBehavior } from './hooks/useSelectedUserBehavior';
import SelectedUserHeader from './components/SelectedUserHeader';
import SelectedUserSolicitationButton from './components/SelectedUserSolicitationButton';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { RouteProp, useRoute } from '@react-navigation/native';
import { TreatmentStackNavigation } from 'types/navigation/Navigation_Types';
import { UseTreatmentNavigation } from '@features/app/pages/both/treatment/hooks/UseTreatmentNavigation';
import { useSelectedUser } from './hooks/useSelectedUser';

const SelectedUserToStartTreatment = () => {
    const { userData } = UseForm();
    const { navigateToTreatmentScreen } = UseTreatmentNavigation();
    const fetchSelectedDataLoading = UseLoading();
    const solicitationLoading = UseLoading();
    const route = useRoute<RouteProp<TreatmentStackNavigation, 'selected_user'> & { params?: SearchUserData }>();
    const selectedUserParams = route.params?.params;
    if (!selectedUserParams) {
        console.log("Houve um erro: parametro inválido ", selectedUserParams);

        useEffect(() => {
            navigateToTreatmentScreen('main_treatment');
        }, []);

        return
        <>
        </>;
    }
    const { searchUserData } = useSelectedUser({ user: selectedUserParams });

    const { handleShowDoctorTreatments, showDoctorTreatments, selectedUser, handleBackSearch, handleSelectedUser } = useSelectedUserBehavior({ searchUserData });
    const { } = useSelectedUserHandling({ fetchLoading: fetchSelectedDataLoading, selectedUser, handleSelectedUser });

    const { handleModalSolicitation, modalSolicitation, handleTreatmentSolicitation } = UseSolicitation({ setLoading: solicitationLoading.setLoading });

    const isDoctorTreatment = (userData && selectedUser?.total_treatments && selectedUser.total_treatments.some(treatment => treatment.email === userData.email));
    const userIcon = selectedUser?.type === 'doctor' ? images.app_doctor_images.profile.doctor_profile_icon : images.app_patient_images.profile.user_profile_icon;
    const treatmentUserIcon = selectedUser?.type === 'patient' ? images.app_patient_images.chat.doctor_icon_chat : images.app_doctor_images.chat.user_icon_chat;
    const backIcon = images.generic_images.back.arrow_back_white;
    const backIconSize = responsiveSize * 0.08;
    const iconUserSize = responsiveSize * 0.4;
    const iconIsTreatmentRunningSize = responsiveSize * 0.12;
    const iconInfoSize = responsiveSize * 0.1;
    const iconTreatmentUserSize = responsiveSize * 0.1;
    const iconInTreatmentSize = responsiveSize * 0.2;
    const iconRestrictionSize = responsiveSize * 0.2;

    const iconInTreatment = images.app_doctor_images.treatment.in_treatment;
    const iconSearchEmail = images.generic_images.search.email_icon;
    const iconSearchPhone = images.generic_images.search.phone_icon;
    const iconSearchGender = images.generic_images.search.gender_icon;
    const iconSearchBirth = images.generic_images.search.birth_icon;
    const iconTreatments = images.generic_images.search.treatment_icon;

    return (
        <LinearGradient colors={[`${userData?.type == "doctor" ? "#573452" : "#344357"}`, `${userData?.type == "patient" ? 'rgba(100, 36, 107, 1)' : "rgba(24, 63, 71, 1)"}`]}
            start={{ x: 0, y: 0.4 }}
            end={{ x: 0, y: 1 }} style={{ width: '100%', flex: 1, }}>
            <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ }}>
                <SelectedUserHeader
                    selectedUser={selectedUser}
                    solicitationLoading={solicitationLoading}
                    backIcon={backIcon}
                    backIconSize={backIconSize}
                    userIcon={userIcon}
                    iconUserSize={iconUserSize}
                    handleBackSearch={handleBackSearch}
                />
                <View style={styles.selectedUserTreatment_Container}>
                    <LinearGradient colors={selectedUser.type === 'doctor' ? ["#437a7d", 'rgba(98, 126, 138, 0.3)'] : ["#8a6283", "#7d4373", "rgba(148, 112, 142, 0.2)"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }} style={[styles.selectedUserTreatment_Gradient]}>
                        <View style={{ flex: 1, }}>
                            {
                                showDoctorTreatments ?
                                    <SearchDoctorTreatments
                                        selectedUser={selectedUser}
                                        userType={userData?.type as UserType}
                                        handleBack={handleShowDoctorTreatments}
                                        treatmentUserIcon={treatmentUserIcon}
                                    />
                                    :
                                    <>
                                        <View style={styles.selectedUserContent_View}>
                                            <View style={styles.selectedUserNameTreatment_View}>
                                                <Text style={styles.selectedUserNameTreatment_Text}>{userData?.type as UserType === 'patient' ? `Dr. ${selectedUser.name}` : selectedUser.name}</Text>
                                            </View>
                                            {
                                                fetchSelectedDataLoading.loading ?
                                                    <View style={{ paddingVertical: '6%' }}>
                                                        <DefaultLoading size={25} color={'white'} />
                                                    </View>
                                                    :
                                                    <SearchUserInfo
                                                        selectedUser={selectedUser}
                                                        userType={userData?.type as UserType}
                                                        iconInfoSize={iconInfoSize}
                                                        iconSearchBirth={iconSearchBirth}
                                                        iconSearchEmail={iconSearchEmail}
                                                        iconSearchGender={iconSearchGender}
                                                        iconSearchPhone={iconSearchPhone}
                                                        iconTreatments={iconTreatments}
                                                        iconTreatmentUserSize={iconTreatmentUserSize}
                                                        treatmentUserIcon={treatmentUserIcon}
                                                        iconRestrictionSize={iconRestrictionSize}
                                                        handlePress={handleShowDoctorTreatments}
                                                    />
                                            }
                                        </View>
                                        {
                                            !fetchSelectedDataLoading.loading &&
                                            <SelectedUserSolicitationButton
                                                selectedUser={selectedUser}
                                                solicitationLoading={solicitationLoading}
                                                handleModalSolicitation={handleModalSolicitation}
                                                iconInTreatment={iconInTreatment}
                                                iconInTreatmentSize={iconInTreatmentSize}
                                                iconIsTreatmentRunningSize={iconIsTreatmentRunningSize}
                                                treatmentUserIcon={treatmentUserIcon}
                                                isDoctorTreatment={isDoctorTreatment}
                                            />
                                        }
                                    </>
                            }

                        </View>
                    </LinearGradient>
                </View>
            </ScrollView>

            {
                modalSolicitation && userData && selectedUser &&
                <DefaultModal
                    isVisible={modalSolicitation}
                    onClose={() => handleModalSolicitation(false)}
                    disableGestures={solicitationLoading.loading}
                >
                    <ConfirmSolicitationModal
                        selectedUser={selectedUser}
                        handleTreatmentSolicitation={handleTreatmentSolicitation}
                        userData={userData}
                        closeModal={() => handleModalSolicitation(false)}
                    />
                </DefaultModal>
            }
        </LinearGradient>
    )
}

export default SelectedUserToStartTreatment;

const styles = StyleSheet.create({
    headerSelectedUser_View: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '35%',
    },
    backView: {
        display: 'flex',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: '6%',
    },
    selectedUserTreatment_BackButton: {
    },
    selectedUserTreatmentImg_View: {
    },
    selectedUserIcon_View: {
        overflow: 'hidden',
        elevation: 18,
    },
    selectedUserTreatment_Container: {
        display: 'flex',
        width: '100%',
        minHeight: screenHeight * 0.6
    },
    selectedUserTreatment_Gradient: {
        flex: 1,
        paddingTop: '10%',
        width: '100%',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        justifyContent: 'space-between',
    },
    selectedUserContent_View: {
        width: '100%',
        flex: 1,
        paddingHorizontal: '10%',
    },
    selectedUserNameTreatment_View: {
        display: 'flex',
        width: '100%',
        paddingBottom: '4%',
        marginBottom: '4%',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(255, 255, 255, 0.6)',
        alignItems: 'center'
    },
    selectedUserNameTreatment_Text: {
        fontSize: 24,
        color: 'white',
        fontWeight: '500',
    },

    selectedUserInfoTreatment_View: {
        width: '100%',
        flex: 1,
        justifyContent: 'space-between',
    },
    selectedUserInfoTemplateContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingBottom: '1.5%',
    },
    selectedUserTextTemplate: {
        fontSize: 16,
        color: 'rgba(197, 203, 209, 0.8)',
    },
    treatmentItem: {
        alignItems: 'center',
    },
    treatmentAvatar: {
    },
    treatmentName: {
        color: 'white',
        fontSize: 12,
        marginBottom: '3%',
    },
    treatmentsContainer: {
        alignItems: 'center',
    },
    initTreatment_Container: {
        backgroundColor: 'transparent',
        borderRadius: 50,
        marginHorizontal: '8%',
        paddingVertical: '3.5%',
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
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size'
import { SearchUserData } from 'types/treatment/Search_Types';
import { UserData } from 'types/user/User_Types';
import images from '@assets/images';
import { UseLoading } from '@hooks/loading/UseLoading';
import { UseSolicitation } from '../hooks/UseSolicitation';
import DefaultModal from '@components/modals/default/DefaultModal';
import ConfirmSolicitationModal from './ConfirmSolicitationModal';
import DefaultLoading from '@components/loading/DefaultLoading';
import LoadingScreen from '@components/loading/LoadingScreen';
import { FormatISOToStringDate } from '@utils/date/DateFormatting';


interface StartTreatmentProps {
    userSearch: SearchUserData;
    userData?: UserData;
    userType?: string;
    handleBackSearch: (userSearchData: SearchUserData) => void;
}

const StartTreatment = ({ userSearch, userData, userType, handleBackSearch }: StartTreatmentProps) => {

    const { loading, setLoading } = UseLoading();
    const { handleModalSolicitation, modalSolicitation, handleTreatmentSolicitation } = UseSolicitation({ setLoading });
    const isDoctorTreatment = (userData && userSearch.total_treatments && userSearch.total_treatments.some(treatment => treatment.email === userData.email));
    const userIcon = userSearch.type === 'doctor' ? images.app_doctor_images.chat.doctor_icon_chat : images.app_patient_images.chat.user_icon_chat;
    const treatmentUserIcon = userType === 'patient' ? images.app_patient_images.chat.doctor_icon_chat : images.app_doctor_images.chat.user_icon_chat;
    const backIcon = images.generic_images.back.arrow_back_white;
    const iconUserSize = responsiveSize * 0.4;
    const iconInfoSize = responsiveSize * 0.1;
    const iconTreatmentUserSize = responsiveSize * 0.1;

    const iconInTreatment = images.app_doctor_images.treatment.in_treatment;
    const iconSearchUser = images.generic_images.search.user_icon;
    const iconSearchEmail = images.generic_images.search.email_icon;
    const iconSearchPhone = images.generic_images.search.phone_icon;
    const iconSearchGender = images.generic_images.search.gender_icon;
    const iconSearchBirth = images.generic_images.search.birth_icon;
    const iconTreatments = images.generic_images.search.treatment_icon;
    
    return (
        <View style={{ width: '100%', flex: 1, }}>
            <View style={styles.staticContentTreatment_View}>
                <View style={styles.userSearchTreatment_Header}>
                    <TouchableOpacity disabled={loading} onPress={() => handleBackSearch(userSearch)} style={[styles.userSearchTreatment_BackButton, { opacity: loading ? 0.5 : 1 }]}>
                        <Image style={{ height: '100%', width: '100%', resizeMode: 'contain' }} source={backIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.userSearchTreatmentImg_View}>
                    <View style={[styles.userSearchIcon_View, { backgroundColor: `${userSearch.type === "doctor" ? "rgba(108, 181, 212, 0.2)" : "rgba(157, 108, 212, 0.2)"}` }]}>
                        <Image style={{ width: iconUserSize, height: iconUserSize }} source={userSearch.avatar ? { uri: userSearch.avatar } : userIcon} />
                    </View>
                </View>
            </View>
            <View style={styles.userSearchTreatment_Container}>
                <LinearGradient colors={userSearch.type === 'doctor' ? ["#437a7d", 'rgba(98, 126, 138, 0.1)'] : ["#8a6283", "#7d4373", "rgba(148, 112, 142, 0.2)"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }} style={[styles.userSearchTreatment_Gradient]}>
                    <View style={styles.userSearchContent_View}>
                        <View style={styles.userSearchNameTreatment_View}>
                            <Text style={styles.userSearchNameTreatment_Text}>{userType === 'patient' ? `Dr. ${userSearch.name}` : userSearch.name}</Text>
                        </View>
                        <View style={styles.userSearchInfoTreatment_View}>
                            <View style={styles.userSearchInfoTemplateContainer}>
                                <Image style={{ width: iconInfoSize, height: iconInfoSize }} source={iconSearchEmail} />
                                <Text style={styles.userSearchTextTemplate}>
                                    {userSearch.email}
                                </Text>
                            </View>
                            <View style={styles.userSearchInfoTemplateContainer}>
                                <Image style={{ width: iconInfoSize, height: iconInfoSize }} source={iconSearchPhone} />
                                <Text style={styles.userSearchTextTemplate}>
                                    {userSearch.phone}
                                </Text>
                            </View>
                            <View style={styles.userSearchInfoTemplateContainer}>
                                <Image style={{ width: iconInfoSize, height: iconInfoSize }} source={iconSearchBirth} />
                                <Text style={styles.userSearchTextTemplate}>
                                    {userSearch.birth ? FormatISOToStringDate(userSearch.birth) : "Não informado"}
                                </Text>
                            </View>
                            <View style={styles.userSearchInfoTemplateContainer}>
                                <Image style={{ width: iconInfoSize, height: iconInfoSize }} source={iconSearchGender} />
                                <Text style={styles.userSearchTextTemplate}>
                                    {userSearch.gender ? userSearch.gender : "Não informado"}
                                </Text>
                            </View>
                            {
                                userSearch.total_treatments || userSearch.doctor ?
                                    <View style={styles.userSearchInfoTemplateContainer}>
                                        <Image style={{ width: iconInfoSize, height: iconInfoSize }} source={iconTreatments} />
                                        <View style={{ paddingVertical: '2%', paddingHorizontal: '4%', borderRadius: 10, flex: 1, backgroundColor: userSearch.type === 'doctor' ? 'rgba(26, 45, 46, 0.3)' : 'rgba(40, 26, 46, 0.3)' }}>
                                            <Text style={styles.treatmentName}>
                                                {userSearch.total_treatments ? "Tratamentos" : "Doutor"}
                                            </Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 5, width: '95%', overflow: 'hidden' }}>
                                                {
                                                    userSearch.total_treatments && (
                                                        userSearch.total_treatments.map((treatment, index) => (
                                                            <View key={index} style={styles.treatmentItem}>
                                                                <Image
                                                                    style={{ height: iconTreatmentUserSize, width: iconTreatmentUserSize, borderRadius: iconTreatmentUserSize, borderWidth: 2, borderColor: userType === 'patient' ? '#43264a' : '#417c91' }}
                                                                    source={treatment.avatar ? { uri: treatment.avatar } : userIcon}
                                                                />
                                                            </View>
                                                        ))
                                                    )
                                                }
                                                {
                                                    userSearch.doctor && (
                                                        <View style={styles.treatmentItem}>
                                                            <Image
                                                                style={{ height: iconTreatmentUserSize, width: iconTreatmentUserSize, borderRadius: iconTreatmentUserSize, borderWidth: 2, borderColor: userType === 'patient' ? '#43264a' : '#417c91' }}
                                                                source={userSearch.doctor.avatar ? { uri: userSearch.doctor.avatar } : userIcon}
                                                            />
                                                        </View>
                                                    )
                                                }
                                            </View>
                                        </View>
                                    </View>
                                : ""
                            }
                        </View>

                    </View>
                    {
                        !userSearch.is_treatment_running || isDoctorTreatment ?
                            <View style={styles.initTreatment_Container}>
                                <LinearGradient colors={userSearch.type === 'patient' ? ["#914183", "#b565a9"] : ["#417c91", 'rgba(64, 76, 168, 0.7)']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1 }} style={[styles.handleTreatment_View, { opacity: loading ? 0.5 : 1 }]}>
                                    <TouchableOpacity disabled={loading} onPress={() => handleModalSolicitation(true)} style={styles.initTreatment_Button}>
                                        {
                                            loading ?
                                                <DefaultLoading size={25} color={'white'} />
                                                :
                                                <Text style={styles.initTreatment_Text}>Iniciar Tratamento</Text>
                                        }
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                            :
                            <LinearGradient colors={userSearch.type === 'patient' ? ["transparent", "#43264a"] : ["#417c91", 'rgba(64, 76, 168, 0.7)']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }} style={styles.alreadyInTreatment_View}>
                                <Text style={[styles.initTreatment_Text, { width: '60%', textAlign: 'center' }]}>{isDoctorTreatment ? "Esse médico já está executando tratamento com você" : `Usuário já está em tratamento no momento`}</Text>
                                <Image style={{ width: 80, height: 80, }} source={iconInTreatment} />
                            </LinearGradient>
                    }
                </LinearGradient>
            </View>

            {
                modalSolicitation && userData &&
                <DefaultModal
                    isVisible={modalSolicitation}
                    onClose={() => handleModalSolicitation(false)}
                    disableGestures={loading}
                >
                    <ConfirmSolicitationModal
                        userSearch={userSearch}
                        handleTreatmentSolicitation={handleTreatmentSolicitation}
                        userData={userData}
                        closeModal={() => handleModalSolicitation(false)}
                    />
                </DefaultModal>
            }
        </View>
    )
}

export default StartTreatment;

const styles = StyleSheet.create({
    staticContentTreatment_View: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '30%',
        marginBottom: '10%'
    },
    userSearchTreatment_Header: {
        display: 'flex',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: '6%',
        paddingVertical: '6%',
    },
    userSearchTreatment_BackButton: {
        width: 30,
        height: 30,
    },
    userSearchTreatmentImg_View: {
        display: 'flex',
        paddingTop: 5,
    },
    userSearchIcon_View: {
        borderRadius: 100,
        overflow: 'hidden',
        elevation: 15,
    },
    userSearchTreatment_Container: {
        display: 'flex',
        width: '100%',
        flex: 1,
    },
    userSearchTreatment_Gradient: {
        flex: 1,
        paddingVertical: '10%',
        width: '100%',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        justifyContent: 'space-between',
    },
    userSearchContent_View: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: '10%',
        justifyContent: 'space-between',
        
    },
    userSearchNameTreatment_View: {
        display: 'flex',
    },
    userSearchNameTreatment_Text: {
        fontSize: 24,
        color: 'white',
        fontWeight: '500',
    },

    userSearchInfoTreatment_View: {
        width: '100%',
        flex: 1,
        justifyContent: 'space-between',
        marginVertical: '6%',
    },
    userSearchInfoTemplateContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingBottom: '1.5%',
    },
    userSearchTextTemplate: {
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
        elevation: 5,
        marginHorizontal: '8%',
    },
    handleTreatment_View: {
        width: '100%',
        alignItems: 'center',
        borderRadius: 50,
        height: screenHeight * 0.1,
    },
    initTreatment_Button: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    initTreatment_Text: {
        fontSize: 20,
        color: 'white'
    },
    alreadyInTreatment_View: {
        display: 'flex',
        gap: 25,
        width: '100%',
        height: screenHeight * 0.35,
        alignItems: 'center',

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
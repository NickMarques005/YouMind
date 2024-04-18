import React, {useEffect} from 'react';
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ConvertISODate } from '../../../functions/dates/ConvertDate';
import { NotificationData } from '../../../providers/NotificationProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { UpdateTreatment } from '../../../services/treatment/TreatmentServices';
import { UseAuth } from '../../../providers/AuthenticationProvider';
import { UseTreatment } from '../../../providers/TreatmentProvider';
import { FetchData } from '../../../services/fetchUtils/APIUtils';
import USE_ENV from '../../../services/server_url/ServerUrl';

interface ModalNotificationProps {
    visible: boolean;
    onClose: () => void;
    notificationData: NotificationData;
    handleTypeFunction: (notification: NotificationData, type_function: string) => void;
}

const ModalNotification: React.FC<ModalNotificationProps> = ({ visible, onClose, notificationData, handleTypeFunction }) => {
    const { authData } = UseAuth();
    const {treatment_state, addTreatment} = UseTreatment();
    const { fullApiServerUrl } = USE_ENV();

    useEffect(() => {
        const fetchDataAndUpdateTreatment = async () => {
            console.log("FETCH DATA");
            try {
                if (!authData || !authData.accessToken || !authData.type) {
                    console.error('Token ou tipo de autenticação ausentes.');
                    return;
                }

                const apiRequestData = {
                    route: 'getTreatment',
                    method: 'POST',
                    data: {
                        type: authData.type
                    }
                };

                const result = await FetchData(apiRequestData, {accessToken: authData.accessToken, refreshToken: authData.refreshToken}, fullApiServerUrl);

                if (result.success) {
                    console.log('Dados do tratamento:', result.data);
                    const data = result.data;
                    data.forEach((item: any) => {
                        if (!treatment_state.treatments.some(treatment => treatment.email === item.email)) {
                            addTreatment({
                                _id: item._id,
                                name: item.name,
                                email: item.email,
                            });
                        }
                    });
                } else {
                    console.log('Erro ao buscar dados do tratamento:', result.errors || result.error);
                }
            } catch (err) {
                console.log('Erro inesperado:', err);
            }
        };

        fetchDataAndUpdateTreatment();

    }, []);

    return (
        <Modal transparent={true} animationType='fade' visible={visible} onRequestClose={onClose}>
            <View style={styleNotificationModal.notificationModal_backgroundContainer}>
                <View style={{
                    borderRadius: 40,
                    elevation: 15
                }}>
                    <LinearGradient
                        colors={['#a174a1', '#5f336b']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }} style={styleNotificationModal.notificationModal_MainView}>
                        <View style={styleNotificationModal.notificationModal_headerView}>
                            <TouchableOpacity style={styleNotificationModal.closeButton} onPress={onClose}>
                                <Image
                                    style={styleNotificationModal.closeButtonImage}
                                    source={require('../../../assets/init/back/default_back_type1.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        {
                            notificationData ?
                                <View style={styleNotificationModal.notificationModal_contentView}>
                                    <View style={styleNotificationModal.notificationModal_TitleView}>
                                        <Text style={styleNotificationModal.notificationModal_Title}>{notificationData.title}</Text>
                                    </View>
                                    <View style={{ display: 'flex', gap: 5, }}>
                                        <Text style={styleNotificationModal.notificationModal_Body}>{notificationData.body}</Text>
                                        <View style={styleNotificationModal.notificationModal_DateView}>
                                            <Text style={styleNotificationModal.notificationModal_Date}>{ConvertISODate(notificationData.updatedAt)}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', paddingVertical: 15, }}>
                                        {
                                            notificationData.data?.notify_type === 'treatment' ?
                                                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                    <LinearGradient
                                                        colors={['#8863a6', '#794585']}
                                                        start={{ x: 0, y: 0 }}
                                                        end={{ x: 0, y: 1 }} style={{ width: '46%', borderRadius: 20, }}>
                                                        <TouchableOpacity onPress={() => handleTypeFunction(notificationData, 'decline')} style={{ width: '100%', alignItems: 'center', justifyContent: 'center', paddingVertical: 30 }}>
                                                            <Text style={{ color: 'white', fontSize: 18, textTransform: 'uppercase', fontWeight: 'bold' }}>
                                                                {

                                                                    notificationData.data?.buttons?.button_decline
                                                                        ?
                                                                        notificationData.data?.buttons?.button_decline
                                                                        : ""
                                                                }
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </LinearGradient>
                                                    <LinearGradient
                                                        colors={['#936db3', '#9e61ab']}
                                                        start={{ x: 0, y: 0 }}
                                                        end={{ x: 0, y: 1 }} style={{ width: '46%', borderRadius: 20 }}>
                                                        <TouchableOpacity onPress={() => handleTypeFunction(notificationData, 'accept')} style={{ width: '100%', alignItems: 'center', justifyContent: 'center', paddingVertical: 30 }}>
                                                            <Text style={{ color: 'white', fontSize: 18, textTransform: 'uppercase', fontWeight: 'bold' }}>
                                                                {notificationData.data?.buttons?.button_accept
                                                                    ?
                                                                    notificationData.data?.buttons?.button_accept
                                                                    : ""

                                                                }
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </LinearGradient>
                                                </View>
                                                :
                                                <LinearGradient
                                                    colors={['#936db3', '#9e61ab']}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 0, y: 1 }} style={{borderRadius: 20}}>
                                                    <TouchableOpacity onPress={() => onClose()} style={{ width: '100%', alignItems: 'center', justifyContent: 'center', paddingVertical: 30 }}>
                                                        <Text style={{ color: 'white', fontSize: 18, textTransform: 'uppercase', fontWeight: 'bold' }}>OK</Text>
                                                    </TouchableOpacity>
                                                </LinearGradient>
                                        }
                                    </View>
                                </View>
                                : ""
                        }
                    </LinearGradient>
                </View>
            </View>
        </Modal>
    );
};

const styleNotificationModal = StyleSheet.create({
    notificationModal_backgroundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(54, 42, 56, 0.5)'
    },
    notificationModal_MainView: {
        display: 'flex',
        borderRadius: 40,
        paddingVertical: 20,
        paddingHorizontal: 10,

    },
    notificationModal_headerView: {
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeButtonImage: {
        width: 40,
        height: 40,
    },
    notificationModal_contentView: {
        display: 'flex',
        gap: 15,
        padding: 25,
    },
    notificationModal_TitleView: {
        width: '100%',
    },
    notificationModal_Title: {
        fontSize: 22,
        textAlign: 'left',
        fontWeight: 'bold',
        color: 'white'
    },
    notificationModal_Body: {
        fontSize: 16,
        color: '#f0e6ee'
    },
    notificationModal_DateView: {

    },
    notificationModal_Date: {
        fontSize: 14,
        color: '#c2c9d1',
    },
});

export default ModalNotification;
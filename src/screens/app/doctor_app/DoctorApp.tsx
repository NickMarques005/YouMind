import React, { useEffect, useState } from 'react'
import MenuDoctor from '../../../components/application/doctor/MenuDoctor';
import { Stack } from '../../../components/stack/Stack';
import Notifications from '../../../components/notifications/components/Notifications';
import { usePushNotifications } from '../../../components/notifications/hooks/ConfigureNotification';
import { UseAuth } from '../../../contexts/AuthContext';
import { ApiRequest } from '../../../services/APIService';
import { saveNotifications } from '../../../components/notifications/hooks/SaveNotifications';
import { UpdateTreatment } from '../../../services/UpdateTreatment';
import USE_ENV from '../../../services/server_url/ServerUrl';
import UseRegisterPushToken from '../../../services/PushNotificationService';
import UseSocketService from '../../../services/socket/SocketService';
import { UseForm } from '../../../contexts/FormContext';
import { UseTreatment } from '../../../contexts/TreatmentContext';
import { FetchData } from '../../../services/fetchUtils/APIUtils';

function DoctorApp() {
    const { pushToken } = usePushNotifications();
    const { authData } = UseAuth();
    const { addTreatment, treatment_state } = UseTreatment();
    const { fullApiServerUrl, serverUrl } = USE_ENV();
    const [shouldUpdateTreatment, setShouldUpdateTreatment] = useState(false);
    console.log(pushToken);
    const socket = UseSocketService({ url: serverUrl ? serverUrl : "" });

    const { formData } = UseForm();

    const fetchDataAndUpdateTreatment = async () => {
        console.log("\nFETCH TREATMENT DATA TEST!!\n");
        try {
            if (!authData || !authData.token || !authData.type) {
                console.error('Token ou tipo de autenticação ausentes.');
                return;
            }

            const apiRequestData = {
                url: 'getTreatment',
                method: 'POST',
                data: {
                    type: authData.type
                }
            };

            const result = await FetchData(apiRequestData, authData.token, fullApiServerUrl);

            if (result.success) {
                console.log('Dados do tratamento requisitado:', result.data);
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

    //Componente do controle do socket Global
    useEffect(() => {
        if (formData.id && socket) {
            console.log("ID DOCTOR: ", formData.id);
            socket.emit('joinRoom', formData.id);

            socket.on(formData.id, (data) => {
                console.log("\nTREATMENT UPDATE!!\n");
                console.log("DATA: ", data);

                setShouldUpdateTreatment(true);
            })
        }

        return () => {
            socket?.disconnect();
        };
    }, [formData.id, socket, authData]);

    useEffect(() => {
        if (shouldUpdateTreatment) {
            fetchDataAndUpdateTreatment();
            setShouldUpdateTreatment(false);
        }
    }, [shouldUpdateTreatment]);

    console.log("SHOULD UPDATE: ", shouldUpdateTreatment);

    //Busca pelo Treatment
    UpdateTreatment(authData);

    //Configuração para Listener de Notificações
    saveNotifications();

    //Registro de Push Token:
    
    UseRegisterPushToken(authData, pushToken, `${fullApiServerUrl}`);

    return (
        <>
            <Stack.Navigator initialRouteName='mainPage' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="mainPage" component={MenuDoctor} />
                <Stack.Screen name="notifications" component={Notifications} />
            </Stack.Navigator>

        </>
    )
}

export default DoctorApp;
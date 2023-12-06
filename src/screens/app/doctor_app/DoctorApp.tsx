import React, { useEffect } from 'react'
import MenuDoctor from '../../../components/application/doctor/MenuDoctor';
import { Stack } from '../../../components/stack/Stack';
import Notifications from '../../../components/notifications/Notifications';
import { usePushNotifications } from '../../../components/notifications/ConfigureNotification';
import { UseAuth } from '../../../contexts/AuthContext';
import { ApiRequest } from '../../../services/APIService';
import { saveNotifications } from '../../../components/notifications/SaveNotifications';
import { UpdateTreatment } from '../../../services/UpdateTreatment';
import USE_ENV from '../../../services/server_url/ServerUrl';
import UseRegisterPushToken from '../../../services/PushNotificationService';

function DoctorApp() {
    const { pushToken } = usePushNotifications();
    const { authData } = UseAuth();
    const { fullApiServerUrl } = USE_ENV();
    console.log(pushToken);

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
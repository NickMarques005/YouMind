import React, { useEffect, useState } from 'react';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import ErrorApp from '@components/errors/ErrorApp';
import PatientProvider from '@features/app/providers/PatientProvider';
import DoctorProvider from '@features/app/providers/DoctorProvider';
import AppStack from '@navigation/stacks/app/AppStack';
import { UseLoading } from '@hooks/loading/UseLoading';
import LoadingScreen from '@components/loading/LoadingScreen';
import { UseGlobalResponse } from './providers/sub/ResponseProvider';
import UseUserData from './hooks/UseUserData';
import { UseSaveNotifications } from './hooks/SaveNotifications';
import { UsePushNotificationRegistration } from './hooks/UsePushNotificationRegistration';
import ErrorModal from '@components/modals/error/ErrorModal';
import { UserType } from 'types/user/User_Types';
import MessageModal from '@components/modals/message/MessageModal';
import { UseGetNotifications, UseGetQuestionnaires, UseGetTreatments } from './hooks/UseGetInitialData';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';

const AppSession = () => {
    const [reloadData, setReloadData] = useState<(() => Promise<any | boolean>) | undefined>(undefined);
    const [tryConnection, setTryConnection] = useState(true);
    const { uid } = UseAuth();
    const { userData, UpdateUserData } = UseForm();
    const { loading, setLoading } = UseLoading();
    const { HandleConnectionAppError, ClearConnectionAppError,
        ClearResponseAppError, responseAppError, responseAppSuccess,
        ClearResponseAppSuccess, connectionAppError } = UseGlobalResponse();
    console.log("\n(APP SESSION)\n");
    const { setNotificationListeners, returnNotificationListeners, RegisterPushTokenInFirebase } = UsePushNotificationRegistration({ setLoading, HandleConnectionAppError });
    const { fetchUserData } = UseUserData({ setLoading, HandleConnectionAppError, UpdateUserData, setReloadData });
    UseGetNotifications({ setLoading, HandleConnectionAppError });
    UseGetTreatments({ setLoading, HandleConnectionAppError });

    const initializeAppSession = async () => {
        try {
            const tokenKey = await RegisterPushTokenInFirebase();
            if (tokenKey) {

                setNotificationListeners();
                await fetchUserData();
            }
        } catch (error) {
            console.error("Error initializing app session: ", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("Try connection: ", tryConnection);
        if (uid && tryConnection) {
            initializeAppSession();
            setTryConnection(false);
        }

        return () => {
            returnNotificationListeners();
        }
    }, [tryConnection, uid]);

    return (
        <>
            {
                !connectionAppError ?
                    loading || !userData ?
                        <LoadingScreen />
                        :
                        <>
                            {
                                userData.type === 'patient' ?
                                    <PatientProvider>
                                        <AppStack type={userData.type} />
                                    </PatientProvider>
                                    : userData.type === 'doctor' ?
                                        <DoctorProvider>
                                            <AppStack type={userData.type} />
                                        </DoctorProvider>
                                        :
                                        ""
                            }
                            {
                                !!responseAppError &&
                                <ErrorModal
                                    isVisible={!!responseAppError && typeof responseAppError === 'string'}
                                    message={responseAppError || "Erro desconhecido"}
                                    onClose={ClearResponseAppError}
                                    userType={userData.type as UserType}
                                />
                            }
                            {
                                !!responseAppSuccess?.message &&
                                <MessageModal
                                    userType={userData.type as UserType}
                                    isVisible={!!responseAppSuccess.message && typeof responseAppSuccess.message === 'string'}
                                    message={responseAppSuccess.message}
                                    onClose={ClearResponseAppSuccess}
                                    messageType={responseAppSuccess.messageType}
                                />
                            }
                            {

                            }
                        </>
                    :
                    <ErrorApp loading={loading} error={connectionAppError} setTryConnection={setTryConnection} resolveError={ClearConnectionAppError} reloadData={setTryConnection} />
            }
        </>
    )
}

export default AppSession;
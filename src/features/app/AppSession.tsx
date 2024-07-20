import React, { useEffect, useRef, useState } from 'react';
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
import { UseGetNotifications, UseGetTreatments } from './hooks/UseGetInitialData';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';
import { useNoticeManager } from './hooks/UseNoticeManager';
import { useNotice } from './providers/sub/NoticeProvider';
import NoticeModal from '@components/modals/notice/Notice';

const AppSession = () => {
    console.log("\n(APP SESSION)\n");
    const [reloadData, setReloadData] = useState<(() => Promise<any | boolean>) | undefined>(undefined);
    const [tryConnection, setTryConnection] = useState(true);
    const initializedRef = useRef(false);

    const { uid } = UseAuth();
    const { userData, UpdateUserData } = UseForm();
    const { loading, setLoading } = UseLoading();
    const noticeLoading = UseLoading();

    const { HandleConnectionAppError, ClearConnectionAppError,
        ClearResponseAppError, responseAppError, responseAppSuccess,
        ClearResponseAppSuccess, connectionAppError } = UseGlobalResponse();
    const { selectedNotice, handleSelectedNotice, handleClearSelectedNotice } = useNotice();
    const { handleNoticeAccept, handleDontShow } = useNoticeManager({setNoticeLoading: noticeLoading.setLoading, userData})
    const { setNotificationListeners, returnNotificationListeners, RegisterPushTokenInFirebase } = UsePushNotificationRegistration({ setLoading, HandleConnectionAppError });
    const { fetchUserData } = UseUserData({ setLoading, HandleConnectionAppError, UpdateUserData, setReloadData });
    const { getNotificationsData } = UseGetNotifications({ setLoading, HandleConnectionAppError });
    const { getTreatmentsData } = UseGetTreatments({ setLoading, HandleConnectionAppError });

    const initializeAppSession = async () => {
        try {
            const tokenKey = true//await RegisterPushTokenInFirebase();
            if (tokenKey) {
                console.log("Initialize Session");
                //setNotificationListeners();
                const userData = await fetchUserData();
                if(userData)
                {
                    await getNotificationsData(userData._id);
                    await getTreatmentsData(userData);
                }
            }

        } catch (error) {
            console.error("Error initializing app session: ", error);
        }
        finally{
            setLoading(false);
        }
    };

    const resetConnection = () => {
        initializedRef.current = false;
        setTryConnection(true);
    };

    useEffect(() => {
        console.log("App session USE EFFECT FOR initiate App")
        if (uid && tryConnection && !initializedRef.current) {
            initializeAppSession();
            initializedRef.current = true;
            setTryConnection(false);
        }

        return () => {
            //returnNotificationListeners();
        }
    }, [uid]);

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
                                !!selectedNotice &&
                                <NoticeModal 
                                    userType={userData.type}
                                    selectedNotice={selectedNotice}
                                    noticeLoading={noticeLoading.loading}
                                    handleClearSelectedNotice={handleClearSelectedNotice}
                                    handleNoticeAccept={handleNoticeAccept}
                                    handleDontShow={handleDontShow}
                                />
                            }
                        </>
                    :
                    <ErrorApp loading={loading} error={connectionAppError} setTryConnection={setTryConnection} resolveError={ClearConnectionAppError} reloadData={resetConnection} />
            }
        </>
    )
}

export default AppSession;
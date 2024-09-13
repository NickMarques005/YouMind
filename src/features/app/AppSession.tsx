import React, { useEffect, useRef, useState } from 'react';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import ErrorApp from '@components/errors/ErrorApp';
import PatientProvider from '@features/app/providers/PatientProvider';
import DoctorProvider from '@features/app/providers/DoctorProvider';
import { UseLoading } from '@hooks/loading/UseLoading';
import LoadingScreen from '@components/loading/LoadingScreen';
import { UseGlobalResponse } from './providers/sub/ResponseProvider';
import UseUserData from './hooks/user/UseUserData';
import { UseSaveNotifications } from './hooks/notification/SaveNotifications';
import { UsePushNotificationRegistration } from './hooks/notification/UsePushNotificationRegistration';
import ErrorModal from '@components/modals/error/ErrorModal';
import { UserType } from 'types/user/User_Types';
import MessageModal from '@components/modals/message/MessageModal';
import { UseGetNotifications, UseGetTreatments } from './hooks/fetch/UseGetInitialData';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';
import { useNoticeManager } from './hooks/notice/UseNoticeManager';
import { useNotice } from './providers/sub/NoticeProvider';
import NoticeModal from '@components/modals/notice/Notice';
import { MessageIconTypes } from 'types/icon/Icon_Types';
import BridgeSession from './bridge/BridgeSession';
import { BridgeProvider } from './providers/bridge/BridgeProvider';

const AppSession = () => {
    console.log("\n(APP SESSION)\n");
    const [reloadData, setReloadData] = useState<(() => Promise<any | boolean>) | undefined>(undefined);
    const [tryConnection, setTryConnection] = useState(true);
    const initializedRef = useRef(false);

    const { uid } = UseAuth();
    const { userData, UpdateUserData } = UseForm();
    const initialLoading = UseLoading();
    const noticeLoading = UseLoading();

    const { HandleConnectionAppError, ClearConnectionAppError,
        ClearResponseAppError, responseAppError, responseAppSuccess,
        ClearResponseAppSuccess, connectionAppError, stateAppLoading } = UseGlobalResponse();
    const { selectedNotice, handleClearSelectedNotice } = useNotice();
    const { handleNoticeAccept, handleDontShow } = useNoticeManager({ setNoticeLoading: noticeLoading.setLoading, userData })
    const { getTreatmentsData } = UseGetTreatments({ setLoading: initialLoading.setLoading, HandleConnectionAppError });
    const { fetchUserData } = UseUserData({ setLoading: initialLoading.setLoading, HandleConnectionAppError, UpdateUserData, setReloadData });
    
    /*
    ### Notificações
    */
    const { getNotificationsData } = UseGetNotifications({ setLoading: initialLoading.setLoading, HandleConnectionAppError });
    const { setNotificationListeners, returnNotificationListeners, RegisterPushTokenInFirebase } = UsePushNotificationRegistration({ setLoading: initialLoading.setLoading, HandleConnectionAppError });
    UseSaveNotifications();

    const initializeAppSession = async () => {
        try {
            const tokenKey = await RegisterPushTokenInFirebase();
            if (tokenKey) {
                console.log("Initialize Session");
                setNotificationListeners();
                const userData = await fetchUserData();
                if (userData) {
                    await getNotificationsData(userData._id);
                    await getTreatmentsData(userData);
                }
            }
        } catch (error) {
            console.error("Error initializing app session: ", error);
        }
        finally {
            initialLoading.setLoading(false);
        }
    };

    const resetConnection = () => {
        initializedRef.current = false;
        setTryConnection(true);
    };

    useEffect(() => {
        if (uid && tryConnection && !initializedRef.current) {
            initializeAppSession();
            initializedRef.current = true;
            setTryConnection(false);
        }

        return () => {
            returnNotificationListeners();
        }
    }, [uid]);

    return (
        <>
            {
                !connectionAppError ?
                    initialLoading.loading || !userData ?
                        <LoadingScreen />
                        :
                        <>
                            {
                                userData.type === 'patient' ?
                                    <PatientProvider>
                                        <BridgeProvider>
                                            <BridgeSession />
                                        </BridgeProvider>
                                    </PatientProvider>
                                    : userData.type === 'doctor' ?
                                        <DoctorProvider>
                                            <BridgeProvider>
                                                <BridgeSession />
                                            </BridgeProvider>
                                        </DoctorProvider>
                                        :
                                        ""
                            }
                            {
                                stateAppLoading.loading ?
                                    <LoadingScreen isApp={true} />
                                    :
                                    <>
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
                                                messageType={responseAppSuccess.messageType as keyof MessageIconTypes}
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
                            }
                        </>
                    :
                    <ErrorApp loading={initialLoading.loading} error={connectionAppError} setTryConnection={setTryConnection} resolveError={ClearConnectionAppError} reloadData={resetConnection} />
            }
        </>
    )
}

export default AppSession;
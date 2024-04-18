import React from 'react';
import { NotificationProvider } from '@providers/NotificationProvider';
import LeaveModal from '@components/leave/LeaveModal';
import LoadingMainScreen from '@components/loading/LoadingMainScreen';
import { UserProvider } from '@providers/UserProvider';
import { TreatmentProvider } from '@providers/TreatmentProvider';
import { ChatProvider } from '@providers/ChatProvider';
import { MenuProvider } from '@providers/MenuProvider';
import AppSession from '@features/app/AppSession';
import AuthSession from '@features/auth/AuthSession';
import InitSession from '@features/init/InitSession';
import AppProvider from '@features/app/providers/AppProvider';

export default function MainStack({ Init, authData, loading, LeaveModalVisible, HandleLeaveDecision }) {

    return (
        <>
            {
                !Init ?
                    <InitSession />
                    :
                    loading ?
                        <LoadingMainScreen />
                        :
                        authData.accessToken ?
                            <AppProvider>
                                <AppSession/>
                            </AppProvider>
                            :
                            <AuthSession />
            }
            <LeaveModal
                visible={LeaveModalVisible}
                onConfirm={() => {
                    HandleLeaveDecision(true)
                }}
                onCancel={() => {
                    HandleLeaveDecision(false)
                }
                }
            />
        </>


    )
}
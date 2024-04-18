import React, { useState, useEffect } from 'react'
import MainStack from '@navigation/stacks/MainStack';
import { UseInit } from '@providers/InitProvider';
import { UseRoot } from '@providers/RootProvider';
import { UseAuth } from '@providers/AuthenticationProvider';
import { EventSubscriptionType, UseEvents } from '@providers/EventProvider';
import { UseEventHandlers } from '@hooks/events/UseEventHandlers';
import { EventTypes } from 'types/events/EventTypes';
import { UpdateAccessToken } from '@services/auth/TokenService';
import { BackHandler } from 'react-native';


const Root = () => {

    const { Init } = UseInit();
    const { notRoot, setNotRoot } = UseRoot();
    const { authData, loading, setAccessToken, handleLoading, loadRefreshToken } = UseAuth();

    const [showLeaveModal, setShowLeaveModal] = useState(false);

    const { UseEventSubscription, UseEventUnsubscription } = UseEvents();
    const { ErrorEvents } = UseEventHandlers();

    //INSCRIÇÃO DE EVENTOS

    useEffect(() => {

        const errors: EventSubscriptionType[] = [
            { event: EventTypes.ErrorTypes.InvalidToken, handler: ErrorEvents.HandlerInvalidToken },
            { event: EventTypes.ErrorTypes.UnauthorizedUser, handler: ErrorEvents.HandlerUnauthorizedUser }
        ]

        console.log(errors);
        UseEventSubscription(errors);

        return () => {
            UseEventUnsubscription(errors);
        }

    }, []);

    useEffect(() => {
        if (!notRoot) {
            setShowLeaveModal(true);
        }
    }, [notRoot]);

    useEffect(() => {
        const TokenVerification = async () => {

            if (authData?.refreshToken && !authData?.accessToken) {
                const newAccessToken = await UpdateAccessToken(authData.refreshToken);

                if (newAccessToken) {
                    setAccessToken(newAccessToken);
                    return;
                }
            }
        }

        TokenVerification();

    }, [authData]);

    const HandleLeaveDecision = (leave: boolean) => {
        if (leave) {
            setShowLeaveModal(false);
            setNotRoot(true);
            BackHandler.exitApp();
        }
        else {
            setShowLeaveModal(false);
            setNotRoot(true);
        }
    }

    return (
        <MainStack Init={Init} loading={loading} authData={authData} LeaveModalVisible={showLeaveModal} HandleLeaveDecision={HandleLeaveDecision} />
    )
}

export default Root;
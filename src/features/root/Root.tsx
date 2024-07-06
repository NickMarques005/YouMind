import React, { useState, useEffect } from 'react'
import MainStack from '@navigation/stacks/MainStack';
import { UseInit } from '@features/root/providers/InitProvider';
import { UseRoot } from '@features/root/providers/RootProvider';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';
import { EventSubscriptionType, UseEvents } from '@features/root/providers/EventProvider';
import { UseEventHandlers } from '@hooks/events/UseEventHandlers';
import { EventTypes } from 'types/events/EventTypes';
import { BackHandler } from 'react-native';

const Root = () => {

    const { Init } = UseInit();
    const { notRoot, setNotRoot } = UseRoot();
    const { uid, loading } = UseAuth();
    const [showLeaveModal, setShowLeaveModal] = useState(false);

    const { UseEventSubscription, UseEventUnsubscription } = UseEvents();
    const { ErrorEvents } = UseEventHandlers();

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
        <MainStack
            user={uid}
            Init={Init}
            loading={loading}
            LeaveModalVisible={showLeaveModal}
            HandleLeaveDecision={HandleLeaveDecision}
            />
            
        )
}

export default Root;
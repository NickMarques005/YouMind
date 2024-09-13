import React, { useEffect } from 'react';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import { useGetPatientInitialData } from '../pages/patient/hooks/UseGetPatientInitialData';
import { useGetDoctorInitialData } from '../pages/doctor/hooks/UseGetDoctorInitialData';
import UseGlobalSocketHandling from '@api/socket/SocketService';
import BridgeStack from '@navigation/stacks/bridge/BridgeStack';
import { UserType } from 'types/user/User_Types';
import { UseLoading } from '@hooks/loading/UseLoading';
import { BridgeProvider } from '../providers/bridge/BridgeProvider';
import RedirectModalManager from './redirect_manager/RedirectModalManager';

const BridgeSession = () => {
    const { userData } = UseForm();
    const { uid } = UseAuth();
    const typeInitialLoading = UseLoading(true);
    const { HandleConnectionAppError } = UseGlobalResponse();

    let getInitialData: (stopLoading?: boolean) => Promise<void>;

    if (userData?.type === 'patient') {
        const { getPatientInitialData } = useGetPatientInitialData({
            setLoading: typeInitialLoading.setLoading,
            HandleConnectionAppError
        });

        getInitialData = getPatientInitialData;
    }
    else {
        const { getDoctorInitialData } = useGetDoctorInitialData({
            setLoading: typeInitialLoading.setLoading,
            HandleConnectionAppError
        });

        getInitialData = getDoctorInitialData;
    }

    useEffect(() => {
        getInitialData();
    }, [uid, userData?._id]);

    return (
        <BridgeStack type={userData?.type as UserType} />
    );
};

export default BridgeSession;
import React, { useState, useEffect } from 'react'
import WithLoader from '../../hoc/withLoader';
import { RequestInitializeTreatmentData } from './Notifications';
import HandleResponse from '../../errors/HandleResponse';
import { FetchData } from '../../../services/fetchUtils/APIUtils';
import { UseAuth } from '../../../contexts/AuthContext';
import LoadingAuthScreen from '../../loading/LoadingAuthScreen';
import USE_ENV from '../../../services/server_url/ServerUrl';

export interface HandleNotificationResponse {
    handleLoading: () => void;
}

interface HandleNotificationProps {
    handleLoading: () => void;
    requestData: RequestInitializeTreatmentData | undefined;
}

function HandleNotification({ requestData, handleLoading }: HandleNotificationProps) {

    const [treatmentLoading, setTreatmentLoading] = useState(true);
    const handle_data = requestData ?? { route: '', method: '', data: { email1: '', email2: '' } };
    const notification_functions = {
        handleLoading: handleLoading,
    }

    console.log("REQUEST DATA: ", handle_data);

    const { authData } = UseAuth();
    const [data, setData] = useState<any>();
    const [errors, setErrors] = useState<string[] | undefined>(undefined);
    const [message, setMessage] = useState<string | undefined>(undefined);
    const { fullApiServerUrl } = USE_ENV();

    useEffect(() => {
        console.log("FETCH DATA!!", handle_data);
        const fetchDataWrapper = async () => {
            const result = await FetchData(handle_data, authData.accessToken?.token, fullApiServerUrl);
            if (result.success) {
                setData(result.data);
                setMessage(result.message);
                setTreatmentLoading(false);
            }
            else {
                setErrors(result.errors);
                setTreatmentLoading(false);
            }
        }

        fetchDataWrapper();

    }, []);


    return (
        <>
            {
                treatmentLoading ?
                    <LoadingAuthScreen/>
                    :
                    <HandleResponse data={data} errors={errors} message={message} additional_data={notification_functions}/>
            }
        </>
    )
}

export default HandleNotification;
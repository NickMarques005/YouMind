import React, { useState, useEffect } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import LoadingAuthScreen from '../../loading/LoadingAuthScreen';
import HandleResponse from '../../errors/HandleResponse';
import { FetchData } from '../../../services/fetchUtils/APIUtils';
import { UseAuth } from '../../../contexts/AuthContext';
import { RequestSolicitationTreatmentData } from './StartTreatment';
import { RequestSolicitation } from './CurrentTreatment';
import USE_ENV from '../../../services/server_url/ServerUrl';

interface HandleSolicitationTreatmentProps {
    handleLoading: () => void;
    requestData?: RequestSolicitation; 
}


function HandleSolicitationTreatment({handleLoading, requestData}: HandleSolicitationTreatmentProps) {
    const [solicitationLoading, setSolicitationLoading] = useState(true);
    const { fullApiServerUrl } = USE_ENV();
    
    const handle_data = requestData ?? { url: '', method: '', data: {} };
    const treatment_functions = {
        handleLoading: handleLoading,
    }


    const { authData } = UseAuth();
    const [data, setData] = useState<any>();
    const [errors, setErrors] = useState<string[] | undefined>(undefined);
    const [message, setMessage] = useState<string | undefined>(undefined);

    useEffect(() => {
        console.log("FETCH DATA!!");
        const fetchDataWrapper = async () => {
            const result = await FetchData(handle_data, authData.token, fullApiServerUrl);

            console.log("DATA: ", handle_data);
            console.log("USER: ", authData.token);
            if (result.success) {
                setData(result.data);
                setMessage(result.message);
                setSolicitationLoading(false);
            }
            else {
                setErrors(result.errors);
                setSolicitationLoading(false);
            }
        }

        fetchDataWrapper();

    }, []);


    return (
        <>
            {
                solicitationLoading ?
                    <LoadingAuthScreen />
                    :
                    <HandleResponse data={data} errors={errors} message={message} additional_data={treatment_functions}/>
            }
        </>
    )
}

export default HandleSolicitationTreatment;
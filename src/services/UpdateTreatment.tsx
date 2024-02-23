import React, { useEffect } from 'react';
import { FetchData } from './fetchUtils/APIUtils';
import { AuthData} from '../contexts/AuthContext';
import { UseTreatment } from '../contexts/TreatmentContext';
import USE_ENV from './server_url/ServerUrl';

export const UpdateTreatment = (authData: AuthData) => {
    const { treatment_state, addTreatment } = UseTreatment();
    const { fullApiServerUrl } = USE_ENV();

    useEffect(() => {
        const fetchDataAndUpdateTreatment = async () => {
            try {
                if (!authData || !authData.accessToken || !authData.type) {
                    console.error('Token ou tipo de autenticação ausentes.');
                    return;
                }

                const apiRequestData = {
                    route: 'getTreatment',
                    method: 'POST',
                    data: {
                        type: authData.type
                    }
                };

                console.log("API REQUEST TREATMENT UPDATE: ", apiRequestData);

                const result = await FetchData(apiRequestData, {accessToken: authData.accessToken, refreshToken: authData.refreshToken}, fullApiServerUrl);

                if (result.success) {
                    console.log('Dados do tratamento:', result.data);
                    const data = result.data;
                    data.forEach((item: any) => {
                        if (!treatment_state.treatments.some(treatment => treatment.email === item.email)) {
                            addTreatment({
                                _id: item._id,
                                name: item.name,
                                email: item.email,
                            });
                        }
                    });
                } else {
                    console.log('Erro ao buscar dados do tratamento:', result.errors || result.error);
                }
            } catch (err) {
                console.log('Erro inesperado:', err);
            }
        };


        fetchDataAndUpdateTreatment();
    }, [authData]);

}




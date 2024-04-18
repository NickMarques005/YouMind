import React, { useEffect, useState } from 'react';
import { UseAuth } from '@providers/AuthenticationProvider';
import { UseForm } from '@providers/UserProvider';
import ErrorApp from '@components/errors/ErrorApp';
import { UseNotifications } from '@providers/NotificationProvider';
import PatientProvider from '@features/app/providers/PatientProvider';
import DoctorProvider from '@features/app/providers/DoctorProvider';
import LoadingAuthScreen from '@components/loading/LoadingAuthScreen';
import AppStack from '@navigation/stacks/app/AppStack';

const AppSession = () => {

    const { authData, userType, updateAuthData } = UseAuth();
    const { userData, UpdateUserData } = UseForm();
    const { loadNotifications, notifications } = UseNotifications();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(undefined);

    /*useEffect(() => {
        const handleUserData = (data: UserData) => {
            if (errors || message) {
                console.log("Houve algum erro, não executar context de atualização de dados!");
                return;
            }
            console.log("Tratamento dos dados do usuário!");
            if (data) {
                console.log("USER DATA: ", data);
                const auth_data = data;
                console.log("TYPE: ", auth_data.type);

                //Atualização do tipo de usuário:
                updateAuthData({
                    ...authData,
                    type: auth_data.type,
                });

                //Atualização dos dados básicos do usuário:
                UpdateUserData({
                    ...userData,
                    id: auth_data.id,
                    name: auth_data.name,
                    email: auth_data.email,
                    phone: auth_data.phone,

                })
            }
        }

        if (data) {

            handleUserData(data);
        }

    }, []);

    useEffect(() => {
        loadNotifications({ accessToken: authData.accessToken, refreshToken: authData.refreshToken })
    }, []);*/

    const reloadData = () => {
        /*setErrors(undefined);
        setLoading(true);
        const fetchDataAgain = async () => {
            const result = await FetchData(startDataRequest, { accessToken: authData.accessToken, refreshToken: authData.refreshToken });
            if (result.success) {
                setData(result.data);
                setMessage(result.message);
                setMainLoading(false);
            }
            else {
                setErrors(result.errors);
                setMainLoading(false);
            }
        }
        fetchDataAgain();*/
        console.log("RELOAD DATA!!");
    }

    // FOCO:
    //BUSCAR DADOS DE USUÁRIO
    //CASO NAO DE CERTO A BUSCA VÁ PARA ERROR APP
    //APÓS A BUSCA DOS DADOS, BUSCAR NOTIFICAÇÕES DO USUÁRIO
    //

    return (
        <>
            {
                !error ?
                    loading ?
                        <LoadingAuthScreen />
                        :
                        authData.type === 'patient' ?
                            <PatientProvider>
                                <AppStack type={authData.type} />
                            </PatientProvider>
                            : authData.type === 'doctor' ?
                                <DoctorProvider>
                                    <AppStack type={authData.type} />
                                </DoctorProvider>
                                :
                                ""
                    :
                    <ErrorApp errors={error} reloadData={reloadData} />
            }
        </>
    )
}

export default AppSession;
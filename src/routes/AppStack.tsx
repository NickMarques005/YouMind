import React, { useEffect, useState } from 'react';
import { UseAuth } from '../contexts/AuthContext';
import { ApiRequest } from '../services/APIService';
import PatientApp from '../screens/app/patient_app/PatientApp';
import DoctorApp from '../screens/app/doctor_app/DoctorApp';
import LoadingMainScreen from '../components/loading/LoadingMainScreen';
import { BluetoothProvider } from '../contexts/BluetoothConnection';
import { CurrentDateProvider } from '../contexts/CurrentDateContext';
import { MedicineProvider } from '../contexts/MedicineContext';
import { QuestionaireProvider } from '../contexts/QuestionaireContext';
import { UseForm } from '../contexts/FormContext';
import ErrorApp from '../components/errors/ErrorApp';
import { NotificationProvider } from '../contexts/NotificationsContext';
import { NotepadProvider } from '../contexts/NotepadContext';
import { AnalysisProvider } from '../contexts/AnalysisContext';
import { HealthPageProvider } from '../contexts/HealthPageContext';
import UseSocketService from '../services/socket/SocketService';


interface UserData {
    id: string;
    name: string;
    email: string;
    phone: number | null;
    type: string;
    connected: boolean;
}

function AppStack({ data, errors, message, reloadData }: { data?: UserData, errors?: string[], message?: string, reloadData?: () => void }) {

    const { authData, updateAuthData } = UseAuth();
    const { formData, updateFormData } = UseForm();

    useEffect(() => {
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
                updateFormData({
                    ...formData,
                    id: auth_data.id,
                    name: auth_data.name,
                    email: auth_data.email,
                    phone: auth_data.phone
                })
            }
        }

        if (data) {

            handleUserData(data);
        }

    }, []);

    return (
        <>
            {
                !errors && !message ?
                    authData.type === 'patient' ?

                        <BluetoothProvider>
                            <HealthPageProvider>
                                <CurrentDateProvider>
                                    <MedicineProvider>
                                        <QuestionaireProvider>
                                            <NotificationProvider>
                                                <PatientApp />
                                            </NotificationProvider>
                                        </QuestionaireProvider>
                                    </MedicineProvider>
                                </CurrentDateProvider>
                            </HealthPageProvider>
                        </BluetoothProvider>
                        : authData.type === 'doctor' ?
                            <NotificationProvider>
                                <NotepadProvider>
                                    <AnalysisProvider>
                                        <DoctorApp />
                                    </AnalysisProvider>
                                </NotepadProvider>
                            </NotificationProvider>
                            :
                            ""
                    :
                    <ErrorApp errors={errors} message={message} reloadData={reloadData} />
            }
        </>
    )
}

export default AppStack;
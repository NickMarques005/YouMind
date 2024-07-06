import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { screenHeight } from '../../utils/layout/Screen_Size';
import { LinearGradient } from 'expo-linear-gradient';
import MidLoading from '../loading/MidLoading';
import { FetchData } from '../../services/fetchUtils/APIUtils';
import { UseAuth } from '../../features/root/providers/AuthenticationProvider';
import { UseNotepad } from '../../features/app/providers/doctor/NotepadProvider';
import USE_ENV from '../../services/server_url/ServerUrl';

interface ApiRequestNoteData {
    url: string;
    method: string;
    data?: any
}

interface HandleNoteResponseProps {
    additional_data?: { handleLoading: () => void };
    apiRequestData: ApiRequestNoteData;
}

const HandleNoteResponse: React.FC<HandleNoteResponseProps> = ({additional_data, apiRequestData }) => {
    const [addLoading, setAddLoading] = useState(true);
    const { authData } = UseAuth();
    const [data, setData] = useState<any>();
    const [errors, setErrors] = useState<string[] | undefined>(undefined);
    const [message, setMessage] = useState<string | undefined>(undefined);
    const { fullApiServerUrl } = USE_ENV();

    useEffect(() => {
        console.log("FETCH DATA!!");
        const fetchDataNote = async () => {
            const result = await FetchData(apiRequestData, authData.accessToken?.token, fullApiServerUrl);
            if (result.success) {
                setData(result.data);
                setMessage(result.message);
                setAddLoading(false);
            }
            else {
                setErrors(result.errors);
                setAddLoading(false);
            }
        }

        fetchDataNote();

    }, []);

    return (
        <View style={styleMidResponse.HandleNoteResponseContainer}>
            {
                addLoading ?
                    <MidLoading />
                    :
                    <>
                        <View style={{ width: '80%', alignItems: 'center', justifyContent: 'center', display: 'flex', gap: 35, paddingTop: 25, }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#404278', textAlign: 'center' }}>{errors ? `${errors}` : message ? message : ""}</Text>
                            <View style={{ width: '100%', alignItems: 'center' }}>
                                {
                                    message ?
                                        <Image style={{ width: 110, height: 110 }} source={require('../../assets/app_doctor/notepad/add_note_success.png')} />
                                        :
                                        <Image style={{ width: 110, height: 110 }} source={require('../../assets/init/error/error_icon.png')} />
                                }
                            </View>
                        </View>

                        <LinearGradient
                            colors={['#539ca6', '#5589a6', '#612f80']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0.8, y: 1 }} style={{ width: '100%', height: 'auto', borderRadius: 40, }}>
                            <TouchableOpacity onPress={() => additional_data?.handleLoading()} style={{ width: '100%', alignItems: 'center', paddingVertical: 20 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>OK</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </>
            }
        </View>
    );
};

const styleMidResponse = StyleSheet.create({
    HandleNoteResponseContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        zIndex: 1,
        gap: 40,
    },
    gradientContainer: {
        display: 'flex',
        gap: 45,
        width: '100%',
        borderRadius: 30,
        paddingVertical: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        elevation: 10,
    },

});

export default HandleNoteResponse;
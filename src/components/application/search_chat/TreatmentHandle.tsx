import React, { useState, useEffect } from 'react';
import { Treatment, UseTreatment } from '../../../contexts/TreatmentContext';
import { FlatList, View, Text, Image, } from 'react-native';
import Treatments from './Treatments';
import { UseAuth } from '../../../contexts/AuthContext';

interface UserTreatmentData {
    _id: string;
    name: string;
    email: string;
}



function TreatmentHandle({ data, errors, message, additional_data, reloadData }: { data?: UserTreatmentData[], errors?: Error[], message?: string, additional_data?: (treatment: Treatment) => void, reloadData?: () => void}) {
    const { treatment_state, addTreatment } = UseTreatment();
    const { authData } = UseAuth();
    const [changeTreatment, setChangetreatment] = useState(false);

    console.log("HANDLE TREATMENT!");

    useEffect(() => {
        const handleTreatmentData = (data: UserTreatmentData[]) => {
            if (errors) {
                console.log("Houve algum erro ao retornar tratamentos");
                return;
            }

            if (data) {
                console.log("DATA: ", data);

                data.forEach((item) => {
                    if (!treatment_state.treatments.some(treatment => treatment.email === item.email)) {
                        addTreatment({
                            _id: item._id,
                            name: item.name,
                            email: item.email,
                        });
                    }
                });
            }
        }

        if (data) {
            handleTreatmentData(data);
        }

    }, []);


    return (
        <>
            {
                treatment_state.treatments.length !== 0 ?
                    <FlatList
                        horizontal={true}
                        data={treatment_state.treatments}
                        contentContainerStyle={{ display: 'flex', gap: 16, paddingHorizontal: 20, }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => {
                            return (

                                <Treatments treatment={item} handleTreatmentClick={additional_data} />

                            )
                        }}
                    />
                    :
                    <View style={{ width: '100%', marginTop: 40, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 10 }}>
                        <Image style={{ width: 40, height: 40 }} source={require('../../../assets/global/chat/noTreatments_icon.png')} />
                        <Text style={{ fontSize: 16, color: 'rgba(117, 143, 156, 1)' }}>Nenhum tratamento sendo executado</Text>
                    </View>
            }
        </>
    )
}

export default TreatmentHandle
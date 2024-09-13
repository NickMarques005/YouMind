import React from 'react';
import { View, Text } from 'react-native';
import { FormatISOToStringDate } from '@utils/date/DateFormatting'; // Assumindo que as funções estão aqui
import { FormatToPhoneNumber } from '@utils/user/DataFormatting';

interface PatientAdditionalDataProps {
    title: string;
    data?: string;
    type: 'birth' | 'phone' | 'gender';
}

const PatientAdditionalData: React.FC<PatientAdditionalDataProps> = ({ title, data, type }) => {
    let formattedData = data;

    // Realiza a formatação com base no tipo
    const verifyAdditionalData = (value: string, type: 'birth' | 'phone' | 'gender') => {
        if(!data) return undefined;

        switch (type)
        {
            case 'birth':
                formattedData = FormatISOToStringDate(value);
                break;
            case 'phone':
                formattedData = FormatToPhoneNumber(value);
                break;
            default:
                return;
        }
    }
    
    data && verifyAdditionalData(data, type);

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{ fontWeight: '500', color: '#173436'}}>{title}:</Text>
            </View>
            <View>
                <Text style={{fontSize: 15, color: 'rgba(87, 120, 122, 0.9)'}}>
                    {formattedData || "Não informado"}
                </Text>
            </View>
        </View>
    );
};

export default PatientAdditionalData;
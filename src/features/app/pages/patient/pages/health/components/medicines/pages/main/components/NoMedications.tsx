import React from 'react'
import { View, Text, Image } from 'react-native';
import images from '@assets/images';
import { responsiveSize } from '@utils/layout/Screen_Size';
import { isPastDate } from '@utils/date/DateRendering';

interface NoMedicationsTodayProps {
    selectedDate: Date;
}

const NoMedicationsRegistered = () => {
    const noMedications = images.app_patient_images.health.medicines.icon_no_medicines_found;
    const iconSize = responsiveSize * 0.24;
    return (
        <View style={{ width: '100%', height: '80%', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <Image style={{ width: iconSize, height: iconSize, resizeMode: 'contain' }} source={noMedications} />
            <Text style={{ width: '80%', textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#7b2d7a' }}>Você não possui medicamentos registrados...</Text>
        </View>
    )
}

const NoMedicationsToday = ({ selectedDate }: NoMedicationsTodayProps) => {
    const noMedicationsLaterDate = images.app_patient_images.health.medicines.icon_no_medicines_today;
    const noMedicationsPastDate = images.app_patient_images.health.medicines.icon_no_medicines_found;
    const iconSize = responsiveSize * 0.24;
    const pastDate = isPastDate(selectedDate);

    return (
        <View style={{ width: '100%', height: '80%', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <Image style={{ width: iconSize, height: iconSize, resizeMode: 'contain' }} source={ pastDate ? noMedicationsPastDate : noMedicationsLaterDate} />
            <Text style={{ width: '60%', textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#7b2d7a' }}>
                {
                    pastDate ? "Não há medicamentos nessa data" : "Aproveite o dia sem medicamentos!"
                }
            </Text>
        </View>
    )
}

export default { NoMedicationsRegistered, NoMedicationsToday };
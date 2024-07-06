import { TreatmentState } from '@providers/TreatmentProvider';
import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import OnGoingTreatmentTemplate from './OnGoingTreatmentTemplate';
import images from '@assets/images';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';

interface OnGoingTreatmentListProps {
    handleSelectTreatment: (treatment: TreatmentInfoTemplate) => void
    treatment_state: TreatmentState;
}

function OnGoingTreatmentList({ treatment_state, handleSelectTreatment }: OnGoingTreatmentListProps) {

    const noTreatmentsIcon = images.app_doctor_images.treatment.no_treatments_found;

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
                                <OnGoingTreatmentTemplate treatment={item} handleSelectTreatment={handleSelectTreatment} />
                            )
                        }}
                    />
                    :
                    <View style={{ width: '100%', marginTop: 40, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 10 }}>
                        <Image style={{ width: 40, height: 40 }} source={noTreatmentsIcon} />
                        <Text style={{ fontSize: 16, color: 'rgba(117, 143, 156, 1)' }}>Nenhum tratamento sendo executado</Text>
                    </View>
            }
        </>
    )
}

export default OnGoingTreatmentList;
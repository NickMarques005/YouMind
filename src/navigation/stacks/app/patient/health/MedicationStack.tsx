import React from 'react';
import { Stack } from '@navigation/Stack';
import MainMedications from '@features/app/pages/patient/pages/health/components/medicines/pages/main/MainMedications';
import Schedule from '@features/app/pages/patient/pages/health/components/medicines/pages/schedule/Schedule';
import UpdateMedication from '@features/app/pages/patient/pages/health/components/medicines/pages/update/UpdateMedication';
import AddMedication from '@features/app/pages/patient/pages/health/components/medicines/pages/add/AddMedication';

const MedicationStack = () => {

    return (
        <>
            {
                <Stack.Navigator initialRouteName='main_medication' screenOptions={{ headerShown: false, animation: 'simple_push' }}>
                    <Stack.Screen name="add_medication" component={AddMedication}/>
                    <Stack.Screen name="main_medication" component={MainMedications} />
                    <Stack.Screen name="schedule_medication" component={Schedule}/>
                    <Stack.Screen name="update_medication" component={UpdateMedication}/>
                </Stack.Navigator>
            }
        </>
    );
};

export default MedicationStack;
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import TreatmentEndedItem from './TreatmentEndedItem';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';
import { UserDoctor } from 'types/user/User_Types';

interface TreatmentEndedListProps {
    treatments: TreatmentInfoTemplate[];
    userData: UserDoctor;
    onOpenSessions: (treatment?: TreatmentInfoTemplate) => void;
}

const TreatmentEndedList: React.FC<TreatmentEndedListProps> = ({ treatments, userData, onOpenSessions }) => {

    return (
        <View style={styles.container}>
            <FlatList
                data={treatments}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <TreatmentEndedItem treatment={item} userData={userData} onOpenSessions={onOpenSessions} />}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(146, 173, 173, 0.2)',

    },
    listContent: {
        paddingVertical: 15,
        gap: 10
    },
});

export default TreatmentEndedList;
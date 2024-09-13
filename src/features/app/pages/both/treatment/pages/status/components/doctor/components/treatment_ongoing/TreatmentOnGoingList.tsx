import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import TreatmentOnGoingItem from './TreatmentOnGoingItem';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';

interface TreatmentOnGoingListProps {
    treatments: TreatmentInfoTemplate[];
    onOpenSessions: (treatment?: TreatmentInfoTemplate) => void;
}

const TreatmentOnGoingList: React.FC<TreatmentOnGoingListProps> = ({ treatments, onOpenSessions }) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={treatments}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <TreatmentOnGoingItem treatment={item} onOpenSessions={onOpenSessions}/>}
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
        gap: 10,
    },
});

export default TreatmentOnGoingList;
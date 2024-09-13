import React from 'react';
import { ScrollView } from 'react-native';
import TreatmentSessionItem from './TreatmentSessionItem';
import { StyleSheet } from 'react-native';
import { TreatmentSession } from 'types/treatment/Treatment_Types';
import NoTreatmentSession from './NoTreatmentSession';
import { UserType } from 'types/user/User_Types';

interface TreatmentSessionListProps {
    sessions?: TreatmentSession[];
    currentPerformance?: number;
    userType: UserType;
}

const TreatmentSessionList = ({ sessions, currentPerformance, userType }: TreatmentSessionListProps) => {
    return (
        <ScrollView nestedScrollEnabled={true} style={styles.listContainer} contentContainerStyle={{ gap: 15, paddingVertical: 15 }}>
                {
                    sessions ?
                        sessions.map((item, index) => (
                            <TreatmentSessionItem
                                item={item}
                                key={index}
                                sessionNumber={index + 1}
                                currentPerformance={currentPerformance}
                                userType={userType}
                            />
                        ))
                        :
                        <NoTreatmentSession/>
                }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        flex: 1
    },
});

export default TreatmentSessionList;
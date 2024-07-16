import { responsiveSize } from '@utils/layout/Screen_Size';
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SearchUserData } from 'types/treatment/Search_Types';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface SearchDoctorTreatmentsProps {
    userSearch: SearchUserData;
    userType?: string;
    handleBack: () => void;
    treatmentUserIcon: any;
}

interface TreatmentItem {
    name: string;
    avatar?: string;
}

const SearchDoctorTreatments = ({
    userSearch,
    userType,
    handleBack,
    treatmentUserIcon
}: SearchDoctorTreatmentsProps) => {

    const patientIconSize = responsiveSize * 0.15;
    const backIconSize = responsiveSize * 0.08;

    const renderTreatment = ({ item }: { item: TreatmentItem }) => (
        <View style={styles.treatmentItem}>
            <Image
                style={{
                    height: patientIconSize,
                    width: patientIconSize,
                    borderRadius: patientIconSize,
                    borderWidth: 2,
                    borderColor: userType === 'patient' ? '#43264a' : '#417c91'
                }}
                source={item.avatar ? { uri: item.avatar } : treatmentUserIcon}
            />
            <View>
                <Text style={styles.patientText}>Paciente</Text>
                <Text style={styles.treatmentName}>{item.name}</Text>
            </View>

        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ width: '70%', }}>
                    <Text style={styles.title}>Tratamentos de Dr. {userSearch.name}</Text>
                </View>

                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Icon name="close" size={backIconSize} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: 'rgba(40, 26, 46, 0.3)', padding: '5%', borderRadius: 15, flex: 1, }}>
                <FlatList
                    data={userSearch.total_treatments}
                    renderItem={renderTreatment}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '10%',
        paddingBottom: '8%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    backButton: {
        padding: '2%',
    },
    backButtonText: {
        fontSize: 16,
    },
    treatmentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '3%',
        gap: 15,
    },
    patientText: {
        fontSize: 17,
        color: 'rgba(228, 237, 234, 1)',
        fontWeight: '500'
    },
    treatmentName: {
        fontSize: 16,
        color: 'rgba(197, 203, 209, 1)',
    },
});

export default SearchDoctorTreatments;
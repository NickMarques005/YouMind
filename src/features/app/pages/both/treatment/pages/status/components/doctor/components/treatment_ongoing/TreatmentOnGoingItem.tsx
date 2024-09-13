import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';

interface TreatmentOnGoingItemProps {
    treatment: TreatmentInfoTemplate;
    onOpenSessions: (treatment?: TreatmentInfoTemplate) => void;
}

const TreatmentOnGoingItem: React.FC<TreatmentOnGoingItemProps> = ({ treatment, onOpenSessions }) => {
    const itemAvatarSize = responsiveSize * 0.14;
    const eyeIconSize = responsiveSize * 0.04;
    const performanceIconSize = responsiveSize * 0.12;
    const itemStyle = styles(itemAvatarSize, performanceIconSize);

    return (
        <View style={itemStyle.itemContainer}>
            <View style={itemStyle.rowContainer}>
                <View style={itemStyle.avatarWrapper}>
                    {treatment.avatar ? (
                        <Image source={{ uri: treatment.avatar }} style={itemStyle.avatar} />
                    ) : (
                        <FontAwesome5 name="user" size={itemAvatarSize * 0.4} color="#b175bf" />
                    )}
                </View>
                <View>
                    <Text style={itemStyle.patientName}>{treatment.name}</Text>
                </View>
            </View>
            <View style={itemStyle.infoContainer}>
                <View style={itemStyle.infoTemplate}>
                    <Text style={itemStyle.infoText}>Sessões</Text>
                    <View style={itemStyle.sessionsButtonWrapper}>
                        <TouchableOpacity style={itemStyle.sessionsButton} onPress={() =>  onOpenSessions(treatment)}>
                            <Text style={itemStyle.details}>{`${treatment.sessions ? treatment.sessions.length : 0}`}</Text>
                            <FontAwesome5 name="eye" size={eyeIconSize} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={itemStyle.infoTemplate}>
                    <Text style={itemStyle.infoText}>Tempo de T-Watch:</Text>
                    <View style={itemStyle.timeContainer}>
                        <Text style={itemStyle.details}>{`${treatment.status?.twatch_time || "00hr:00min"}`}</Text>
                    </View>
                </View>
            </View>
            <View style={itemStyle.performanceContainer}>
                <Text style={itemStyle.performanceText}>Desempenho Atual</Text>
                <View style={itemStyle.performanceIcon}>
                    <Text style={itemStyle.performancePercentage}>{`${treatment.status?.currentPerformance || 0}%`}</Text>
                </View>
            </View>
        </View>
    );
};
const styles = (itemAvatarSize: number, performanceIconSize: number) => {
    return StyleSheet.create({
        itemContainer: {
            minHeight: screenHeight * 0.18,
            padding: 10,
            borderRadius: 10,
            backgroundColor: 'rgba(77, 74, 99, 0.5)',
            borderWidth: 2,
            borderColor: '#c4a5d1'
        },
        rowContainer: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginBottom: 15,
        },
        avatarWrapper: {
            width: itemAvatarSize,
            height: itemAvatarSize,
            borderRadius: itemAvatarSize,
            overflow: 'hidden',
            backgroundColor: '#f7faf7',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            borderWidth: 6,
            borderColor: '#dec7ff',
        },
        avatarContainer: {
            width: itemAvatarSize,
            height: itemAvatarSize,
            borderRadius: itemAvatarSize,
            overflow: 'hidden',
            backgroundColor: '#f7faf7',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
        },
        avatar: {
            width: itemAvatarSize,
            height: itemAvatarSize,
            borderRadius: itemAvatarSize,
        },
        patientName: {
            fontSize: 17,
            fontWeight: 'bold',
            color: '#f2defa'
        },
        infoContainer: {
            justifyContent: 'center',
            padding: 15,
            gap: 5,
            borderRadius: 10,
            backgroundColor: 'rgba(195, 194, 209, 0.3)'
        },
        infoTemplate: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        infoText: {
            fontSize: 16,
            fontWeight: '500',
            color: '#ebdff0'
        },
        sessionsButtonWrapper: {
            backgroundColor: '#822a7d',
            borderRadius: 20,
            elevation: 3,
        },
        sessionsButton: {
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            flex: 1,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 20,
        },
        details: {
            fontSize: 15,
            color: 'white',
        },
        timeContainer: {
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: 'rgba(184, 163, 182, 0.4)',
            borderRadius: 10,
        },
        performanceContainer: {
            width: '100%',
            alignItems: 'center',
            paddingVertical: 10,
            gap: 10,
        },
        performanceText: {
            fontSize: 18,
            fontWeight: '600',
            color: '#ebdff0'
        },
        performanceIcon: {
            width: performanceIconSize,
            height: performanceIconSize,
            borderRadius: performanceIconSize,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 3,
            borderColor: '#cfa1e3',
        },
        performancePercentage: {
            fontSize: 16,
            fontWeight: '700',
            color: '#844b9c',
        },
    });
}


export default TreatmentOnGoingItem;
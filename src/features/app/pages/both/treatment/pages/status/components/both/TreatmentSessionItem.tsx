import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size';
import { TreatmentSession } from 'types/treatment/Treatment_Types';
import { FontAwesome5 } from '@expo/vector-icons';
import { UserType } from 'types/user/User_Types';

interface TreatmentSessionItemProps {
    item: TreatmentSession;
    sessionNumber: number;
    currentPerformance?: number;
    userType: UserType;
}

const TreatmentSessionItem = ({ item, sessionNumber, currentPerformance, userType }: TreatmentSessionItemProps) => {
    const iconSize = responsiveSize * 0.14;
    const performanceContainerSize = responsiveSize * 0.12;

    const styles = treatmentSessionStyles(userType, iconSize, performanceContainerSize);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{`Sessão ${sessionNumber}`}</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.doctorInfoContainer}>
                    <View style={styles.avatarContainer}>
                        {
                            item.engagedDoctor.avatar ? (
                                <Image source={{ uri: item.engagedDoctor.avatar }} style={styles.avatar} />
                            )
                            : (
                                <FontAwesome5 name="user-md" size={iconSize * 0.5} color={styles.avatarIcon.color} />
                            )
                        }
                    </View>
                    <View style={styles.doctorInfo}>
                        <Text style={styles.doctorInfoText}>
                            {`Sessão executada pel${item.engagedDoctor.gender === 'Feminino' ? 'a' : 'o'} doutor${item.engagedDoctor.gender === 'Feminino' ? 'a' : ''} `}
                        </Text>
                        <Text style={styles.doctorName}>{item.engagedDoctor.name}</Text>
                    </View>
                </View>
                <View style={styles.periodContainer}>
                    <Text style={styles.periodLabelText}>{`Período`}</Text>
                    <View style={styles.periodInfoContainer}>
                        <Text style={styles.periodText}>{`${new Date(item.period.start).toLocaleDateString()}`}</Text>
                        <Text style={styles.periodSeparator}>{'-'}</Text>
                        <Text style={styles.periodText}>
                            {item.period.end ? new Date(item.period.end).toLocaleDateString() : `Até o momento`}
                        </Text>
                    </View>
                </View>
                <View style={styles.performanceContainer}>
                    <Text style={styles.performanceLabelText}>
                        {`Desempenho ${item.period.end ? 'Final' : 'Atual'}`}
                    </Text>
                    <View style={styles.performanceCircle}>
                        <Text style={styles.performanceText}>
                            {`${ item.finalPerformance || currentPerformance || 0}%`}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const iconInfoSize = responsiveSize * 0.16;

const treatmentSessionStyles = (userType: UserType, iconSize: number, performanceContainerSize: number) => {
    const isDoctor = userType === 'doctor';

    return StyleSheet.create({
        container: {
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: isDoctor ? '#f5fafa' : 'rgba(255, 255, 255, 0.15)',
            borderRadius: 20,
            height: screenHeight * 0.44,
            overflow: 'hidden',
        },
        header: {
            width: '100%',
            backgroundColor: isDoctor ? '#498786' : 'rgba(109, 73, 135, 0.5)',
            height: '25%',
            paddingHorizontal: 20,
            justifyContent: 'center',
            borderWidth: 3,
            borderColor: isDoctor ? '#cee6ed' : '#e0ceed',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
        },
        headerText: {
            fontSize: 19,
            color: 'white',
            fontWeight: '700',
        },
        content: {
            width: '100%',
            paddingHorizontal: '6%',
            flex: 1,
            justifyContent: 'center',
            borderLeftWidth: isDoctor ? 3 : 0,
            borderRightWidth: isDoctor ? 3 : 0,
            borderBottomWidth: isDoctor ? 3 : 0,
            borderColor: isDoctor ? 'rgba(208, 216, 217, 0.3)' : undefined,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20
        },
        doctorInfoContainer: {
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
        },
        avatarContainer: {
            width: iconSize,
            height: iconSize,
            borderRadius: iconSize,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
        },
        avatar: {
            width: iconInfoSize,
            height: iconInfoSize,
            borderRadius: iconInfoSize / 2,
        },
        avatarIcon: {
            color: isDoctor ? '#75b0bf' : '#edd3e9',
        },
        doctorInfo: {
            flex: 1,
        },
        doctorInfoText: {
            fontSize: 15,
            color: isDoctor ? '#1a3440' : '#edd3e9',
        },
        doctorName: {
            fontSize: 16,
            fontWeight: 'bold',
            color: isDoctor ? '#1d3e40' : 'white',
        },
        periodContainer: {
            gap: 5,
            marginVertical: '3%',
        },
        periodLabelText: {
            fontSize: 17,
            color: isDoctor ? '#315057' : '#f5e6f3',
        },
        periodInfoContainer: {
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 10,
            flexDirection: 'row',
            padding: '4%',
            backgroundColor: isDoctor ? 'rgba(123, 186, 189, 1)' : 'rgba(230, 190, 224, 0.5)',
            marginVertical: 5,
        },
        periodText: {
            flex: 1,
            fontSize: 17,
            color: 'white',
            textAlign: 'center',
        },
        periodSeparator: {
            width: '20%',
            fontSize: 18,
            color: 'rgba(255, 255, 255, 0.5)',
            textAlign: 'center',
        },
        performanceContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            
        },
        performanceLabelText: {
            fontSize: 17,
            color: isDoctor ? '#1d3e40' : '#f5e6f3',
        },
        performanceCircle: {
            width: performanceContainerSize,
            height: performanceContainerSize,
            backgroundColor: isDoctor ? '#28595c' : 'rgba(230, 190, 224, 0.5)',
            borderRadius: performanceContainerSize,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: isDoctor ? 'rgba(135, 200, 203, 1)' : 'rgba(230, 190, 224, 1)',
        },
        performanceText: {
            color: 'white',
            fontWeight: '700',
            fontSize: performanceContainerSize / 3.6,
        },
    });
};

export default TreatmentSessionItem;
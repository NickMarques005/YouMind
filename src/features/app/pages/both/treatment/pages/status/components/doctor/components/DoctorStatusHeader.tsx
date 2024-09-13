import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { responsiveSize } from '@utils/layout/Screen_Size';
import { useOrbitAnimation } from '../hooks/useOrbitAnimation';
import Animated from 'react-native-reanimated';
import { UserDoctor } from 'types/user/User_Types';

interface DoctorStatusHeaderProps {
    userData: UserDoctor;
    finalPerformance?: number;
}

const DoctorStatusHeader = ({
    userData,
    finalPerformance
}: DoctorStatusHeaderProps) => {
    const iconSize = responsiveSize * 0.18;
    const backgroundDoctorStatusSize = iconSize * 2.5;
    const performanceSize = responsiveSize * 0.15;
    const doctorStatusStyle = styles(iconSize, performanceSize);
    const doctorAvatar = userData?.avatar;

    const orbitRadius = backgroundDoctorStatusSize / 2;
    const { animatedStyleBrain, animatedStyleStethoscope } = useOrbitAnimation({ radius: orbitRadius });

    return (
        <View style={doctorStatusStyle.doctorSubHeader}>
            <View style={{
                backgroundColor: 'rgba(118, 138, 137, 0.5)',
                width: backgroundDoctorStatusSize,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: backgroundDoctorStatusSize,
                borderRadius: backgroundDoctorStatusSize
            }}>
                <Animated.View style={[
                    doctorStatusStyle.iconOrbit,
                    animatedStyleStethoscope
                ]}>
                    <FontAwesome5 name="stethoscope" size={iconSize * 0.4} color="white" />
                </Animated.View>
                <View style={[doctorStatusStyle.avatarContainer, { borderWidth: 6, borderColor: '#b0dec7' }]}>
                    {doctorAvatar ? (
                        <Image source={{ uri: doctorAvatar }} style={doctorStatusStyle.avatar} />
                    ) : (
                        <FontAwesome5 name="user-md" size={iconSize * 0.4} color="#75bf97" />
                    )}
                </View>
                <Animated.View style={[
                    doctorStatusStyle.iconOrbit,
                    animatedStyleBrain
                ]}>
                    <FontAwesome5 name="brain" size={iconSize * 0.4} color="white" />
                </Animated.View>
            </View>

            <View style={{ width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={doctorStatusStyle.doctorSubHeaderTextWhenStarted}>
                    {`Você lidou com o total de ${userData?.total_treatments.length} tratamento${userData?.total_treatments.length !== 1 ? 's' : ''}`}
                </Text>
            </View>
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: 'rgba(84, 125, 121, 0.5)', borderRadius: 10, padding: 15, }}>
                <View style={{ width: '100%' }}>
                    <Text style={doctorStatusStyle.doctorSubHeaderTextPerformance}>
                        {`Desempenho Geral de seus pacientes`}
                    </Text>
                </View>
                <View style={{
                    backgroundColor: 'white',
                    width: performanceSize * 1.2,
                    height: performanceSize * 1.2,
                    borderRadius: performanceSize * 1.2/2,
                    borderWidth: 5,
                    borderColor: '#c5e3d8',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={doctorStatusStyle.doctorSubHeaderPerformanceText}>
                        {
                            `${finalPerformance || 0}%`
                        }
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = (iconSize: number, performanceSize: number) => {
    return StyleSheet.create({
        doctorSubHeader: {
            width: '100%',
            alignItems: 'center',
            gap: 15,
        },
        doctorSubHeaderTextInfo: {
            fontSize: 17,
            color: '#c7e6dc',
            textAlign: 'center',
        },
        doctorSubHeaderTextWhenStarted: {
            fontSize: 18,
            color: 'white',
            textAlign: 'center',
            fontWeight: '600',
        },
        doctorSubHeaderTextPerformance: {
            fontSize: 16,
            color: '#a7d8c7',
            textAlign: 'center',
            fontWeight: '500',
        },
        doctorSubHeaderPerformanceText: {
            fontSize: performanceSize / 3,
            color: '#009480',
            textAlign: 'center',
            fontWeight: '800'
        },
        avatarContainer: {
            width: iconSize,
            height: iconSize,
            borderRadius: iconSize,
            overflow: 'hidden',
            backgroundColor: '#f7faf7',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
        },
        iconOrbit: {
            position: 'absolute',
            backgroundColor: '#87c2bf',
            width: iconSize * 0.7,
            height: iconSize * 0.7,
            borderRadius: iconSize * 0.7,
            alignItems: 'center',
            justifyContent: 'center',
        },
        avatar: {
            width: '100%',
            height: '100%',
            borderRadius: iconSize / 2,
        },
    });
};

export default DoctorStatusHeader;
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { responsiveSize, screenWidth } from '@utils/layout/Screen_Size';
import Animated from 'react-native-reanimated';
import useHeartbeatAnimation from '../hooks/useHeartbeatAnimation';
import { UserPatient } from 'types/user/User_Types';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';
import { formatRelativeTime } from '@utils/date/DateFormatting';
import LinearGradient from 'react-native-linear-gradient';

interface PatientStatusHeaderProps {
    userData?: UserPatient;
    treatment?: TreatmentInfoTemplate;
}

const PatientStatusHeader = ({
    userData,
    treatment
}: PatientStatusHeaderProps) => {
    const iconSize = responsiveSize * 0.22;
    const statusHeaderStyle = styles(iconSize);
    const gradientAlertTreatmentCompleted = ['#bd60a6', '#843791'];
    const treatmentCompletedIconSize = responsiveSize * 0.12;
    const patientAvatar = userData?.avatar;
    const doctorAvatar = treatment?.avatar;

    const heartbeatAnimation = useHeartbeatAnimation();

    console.log(treatment);

    return (
        <View style={statusHeaderStyle.patientSubHeader}>
            <View style={{ width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={statusHeaderStyle.patientSubHeaderTextInfo}>
                    {
                        treatment?.treatmentStatus === 'active' ?
                            `Executando tratamento com ${treatment?.gender === 'Feminino' ? 'a' : "o"} doutor${treatment?.gender === 'Feminino' ? 'a' : ""} ${treatment?.name || "Usuário"}`
                            :
                            "Não há tratamento sendo executado no momento."
                    }
                </Text>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', gap: 10, }}>
                <View style={[statusHeaderStyle.avatarContainer, { borderWidth: 6, borderColor: '#dec7ff' }]}>
                    <>
                        {patientAvatar ? (
                            <Image source={{ uri: patientAvatar }} style={statusHeaderStyle.avatar} />
                        ) : (
                            <FontAwesome5 name="user" size={iconSize * 0.4} color="#b175bf" />
                        )}
                    </>

                </View>
                {
                    treatment && treatment.treatmentStatus === 'active' ?
                        <>
                            <Animated.View style={[heartbeatAnimation, { justifyContent: 'center', paddingHorizontal: '1.6%' }]}>
                                <FontAwesome5 name="heartbeat" size={iconSize * 0.5} color="white" />
                            </Animated.View>
                            <View style={[statusHeaderStyle.avatarContainer, { borderWidth: 6, borderColor: '#c7ebff' }]}>
                                {doctorAvatar ? (
                                    <Image source={{ uri: doctorAvatar }} style={statusHeaderStyle.avatar} />
                                ) : (
                                    <FontAwesome5 name="user-md" size={iconSize * 0.4} color="#75b0bf" />
                                )}
                            </View>
                        </>
                        :
                        <View style={{
                            position: 'absolute', top: - iconSize * 0.06,
                            right: - iconSize * 0.24, width: iconSize * 0.45,
                            height: iconSize * 0.45, borderRadius: iconSize * 0.45,
                            backgroundColor: 'white', alignItems: 'center',
                            justifyContent: 'center', borderWidth: 1,
                            borderColor: '#bf80c2'
                        }}>
                            <FontAwesome5 name="heartbeat" size={iconSize * 0.28} color="#bf80c2" />
                        </View>
                }
            </View>
            <View style={{ width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={statusHeaderStyle.patientSubHeaderTextWhenStarted}>
                    {
                        treatment &&
                        treatment.startedAt &&
                        `Começou há ${formatRelativeTime(treatment?.startedAt)}`
                    }
                </Text>
            </View>
            {
                treatment &&
                treatment.treatmentStatus === 'completed' &&
                <View style={{ 
                    width: '100%'
                    }}>
                <LinearGradient colors={gradientAlertTreatmentCompleted}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{
                        padding: 15,
                        borderRadius: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        gap: 10
                    }}
                >
                    <View style={{
                        width: treatmentCompletedIconSize,
                        height: treatmentCompletedIconSize
                    }}>
                        <FontAwesome5 name="check-circle" size={treatmentCompletedIconSize} color="white" />
                    </View>
                    <View style={{ flex: 1, }}>
                        <Text style={{ fontSize: 15, color: 'white' }}>
                            {
                                "Seu tratamento foi encerrado!"
                            }
                        </Text>
                        <Text style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.6)' }}>
                            {
                                "Caso não esteja se sentindo bem, retome o tratamento com seu especialista."
                            }
                        </Text>
                    </View>

                </LinearGradient>
                </View>
            }
        </View>
    );
};

const styles = (iconSize: number) => {
    return StyleSheet.create({
        patientSubHeader: {
            alignItems: 'center',
            gap: 15,
        },
        patientSubHeaderTextInfo: {
            fontSize: 17,
            color: '#e6dcf2',
            textAlign: 'center',
        },
        patientSubHeaderTextWhenStarted: {
            fontSize: 18,
            color: 'white',
            textAlign: 'center',
            fontWeight: '600',
        },
        avatarContainer: {
            width: iconSize,
            height: iconSize,
            borderRadius: iconSize,
            overflow: 'hidden',
            backgroundColor: '#faf7fc',
            alignItems: 'center',
            justifyContent: 'center',
        },
        avatar: {
            width: '100%',
            height: '100%',
            resizeMode: 'contain'
        },
    });
};

export default PatientStatusHeader;
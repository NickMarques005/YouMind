import { ConvertHoursToDateString } from '@utils/date/DateConversions';
import { FormatISOToStringDate } from '@utils/date/DateFormatting';
import { responsiveSize, screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Medication } from 'types/app/patient/health/Medicine_Types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface MedicationItemProps {
    item: Medication;
    icon: ImageSourcePropType;
    handleCurrentMedication: (medication: Medication) => void;
    navigateToUpdateMedication: () => void;
}

const MedicationItem: React.FC<MedicationItemProps> = React.memo(({ item, icon, navigateToUpdateMedication, handleCurrentMedication }) => {
    const actionButtonSize = responsiveSize * 0.125;
    const largeMedicationIconSize = responsiveSize * 0.3;
    const medicationItemStyles = styles(actionButtonSize, largeMedicationIconSize);
    return (
        <View style={[medicationItemStyles.medicationItem]}>
            <View style={medicationItemStyles.medicationNameContainer}>
                <Text style={medicationItemStyles.medicationName}>{item.name}</Text>
            </View>
            <LinearGradient colors={[`${item.isScheduled ? '#c085c9' : '#b07baa'}`, `${item.isScheduled ? '#814d87' : '#855681'}`]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }} style={medicationItemStyles.detailsGradient}>
                <View style={{ height: 0, width: '100%', alignItems: 'flex-end' }}>
                    <LinearGradient colors={[`${item.isScheduled ? '#b165c2' : '#b85f8d'}`, `${ item.isScheduled ? '#783160' : '#633955'}`]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0.3, y: 1 }} style={medicationItemStyles.iconGradient}>
                        <Image source={icon} style={[medicationItemStyles.icon, { opacity: item.isScheduled ? 1 : 0.6 }]} />
                    </LinearGradient>
                </View>
                {
                    item.schedules && item.schedules.length !== 0 &&
                    <View style={medicationItemStyles.infoTemplateContainer}>
                        <MaterialIcons name="schedule" size={20} color="#ecdff2" />
                        {item.schedules.map((schedule, index) => (
                            <Text style={medicationItemStyles.medicationDetails} key={index}>{schedule}{ item.schedules && index < item.schedules.length - 1 ? ', ' : ''}</Text>
                        ))}
                    </View>
                }
                <View style={medicationItemStyles.infoTemplateContainer}>
                    <MaterialIcons name="opacity" size={20} color="#ecdff2" />
                    <Text style={medicationItemStyles.medicationDetails}>{`${item.dosage}${item.type === 'Comprimido' || item.type === 'Cápsula' ? `mg` : 'ml'}`}</Text>
                </View>
                {
                    item.frequency &&
                    <View>
                        <Text style={medicationItemStyles.medicationDetails}>{`A cada ${item.frequency} dia(s)`}</Text>
                    </View>
                }
                {
                    item.expiresAt &&
                    <View>
                        <Text style={medicationItemStyles.medicationDetails}>{`Usar até o dia ${FormatISOToStringDate(item.expiresAt)}`}</Text>
                    </View>
                }
                <View style={medicationItemStyles.actionsContainer}>
                    <TouchableOpacity onPress={navigateToUpdateMedication} style={medicationItemStyles.actionButton}>
                        <MaterialIcons name='edit' size={actionButtonSize / 2} color="#ecdff2" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleCurrentMedication(item)} style={medicationItemStyles.actionButton}>
                        <MaterialIcons name='delete' size={actionButtonSize / 2} color="#ecdff2" />
                    </TouchableOpacity>
                </View>
                {
                    !item.isScheduled &&
                    <LinearGradient colors={['#a61654', '#61222f']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }} style={medicationItemStyles.deactivatedContainer}>
                        <MaterialIcons name="block" size={20} color="white" />
                        <Text style={medicationItemStyles.deactivatedText}>{`DESATIVADO`}</Text>
                    </LinearGradient>
                }
            </LinearGradient>
        </View>
    )
});

const styles = (actionButtonSize: number, largeMedicationIconSize: number) => StyleSheet.create({
    medicationItem: {
        width: '100%',
        backgroundColor: '#f9f9f9',
        borderRadius: 20,
        elevation: 5,
        marginVertical: '5%'
    },
    iconGradient: {
        right: -(largeMedicationIconSize * 0.3),
        top: -(largeMedicationIconSize * 0.92),
        elevation: 6,
        zIndex: 2,
        width: largeMedicationIconSize,
        height: largeMedicationIconSize,
        borderRadius: largeMedicationIconSize,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: largeMedicationIconSize * 0.65,
        height: largeMedicationIconSize * 0.65,
    },
    medicationNameContainer: {
        width: '100%',
        padding: '4%',
        height: screenHeight * 0.1,
        justifyContent: 'center',
        backgroundColor: '#fff7ff',
        elevation: 8,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    medicationName: {
        fontSize: 18,
        width: '75%',
        fontWeight: 'bold',
        color: '#4d2448',
    },
    infoTemplateContainer: {
        flexDirection: 'row',
        gap: 5,
    },
    detailsGradient: {
        paddingHorizontal: '6%',
        paddingVertical: '5%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        gap: 3,
    },
    medicationDetails: {
        fontSize: 14,
        color: '#ecdff2',
    },
    actionsContainer: {
        width: '100%',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        gap: 10,
    },
    actionButton: {
        width: actionButtonSize,
        height: actionButtonSize,
        borderRadius: actionButtonSize / 2,
        backgroundColor: '#80407c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deactivatedContainer: {
        position: 'absolute',
        flexDirection: 'row',
        borderRadius: 20,
        padding: 8,
        bottom: -10,
        left: -5,
        gap: 5,
    },
    deactivatedText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '700',
    },
});

export default MedicationItem;
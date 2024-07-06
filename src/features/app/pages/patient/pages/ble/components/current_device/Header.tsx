import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import images from '@assets/images';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { BleDeviceData } from 'types/ble/Ble_Types';
import { BleScreenName } from 'types/navigation/Navigation_Types';
import BatteryIcon from '../main/BatteryIcon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface HeaderProps {
    currentDevice: BleDeviceData | undefined;
    bleNavigation: (screenName: BleScreenName) => void;
    loading: boolean;
}

const Header = ({ bleNavigation, currentDevice, loading }: HeaderProps) => {

    const deviceIcon = images.app_patient_images.bluetooth.current_device_icon;

    return (
        <LinearGradient
            colors={['#8f458b', '#362742']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }} style={styles.headerContainer}>
            <View style={styles.headerCurrentDevice}>

                <View style={styles.currentDeviceInfoContainer}>
                    <View style={styles.deviceIconView}>
                        <Image source={deviceIcon} style={[styles.deviceIconImg, { opacity: loading ? 0.6 : 1}]} />
                    </View>
                    <View style={styles.deviceDataView}>
                        <View style={styles.dataTemplate}>
                            <Text style={styles.nameText}>{currentDevice?.name}</Text>
                        </View>
                        <View>
                            <View style={styles.dataTemplate}>
                                <Text style={styles.infoText}>{`MAC: ${currentDevice?.id}`}</Text>
                            </View>
                            <View style={styles.dataTemplate}>
                                <Text style={styles.infoText}>{`Versão: ${currentDevice?.version || '1.0.0'}`}</Text>
                            </View>
                            <View style={styles.dataTemplate}>
                                <Text style={styles.infoText}>{`RSSI: ${currentDevice?.rssi}`}</Text>
                            </View>
                        </View>

                    </View>
                </View>
                <View style={styles.basicInfoView}>
                    <View style={styles.backView}>
                        <TouchableOpacity disabled={loading} onPress={() => bleNavigation('main_ble')} style={styles.backButton}>
                            <MaterialIcons name="arrow-back" size={30} color='#dfcce3' />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.batteryContainer}>

                        <View style={styles.batteryInfoView}>
                            {
                                currentDevice?.ultraSaving ? 
                                <Text style={styles.batteryInfoText}>Ultra Economia de Energia</Text>
                                :
                                currentDevice?.energySaving &&
                                <Text style={styles.batteryInfoText}>Economia de Energia</Text>
                            }
                            {
                                
                            }
                            {
                                currentDevice?.charging ? 
                                <Text style={styles.batteryInfoText}>Carregando</Text>
                                :
                                currentDevice?.batteryLevel && currentDevice.batteryLevel < 30 &&
                                <Text style={styles.batteryInfoText}>Bateria Fraca</Text>
                            }
                        </View>
                        <View style={styles.batteryView}>
                            <BatteryIcon percentage={true} borderRadius={6} padding={1.5} borderWidth={4.5} color={'#dfcce3'} />
                        </View>
                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        width: screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerCurrentDevice: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 15,
    },
    currentDeviceInfoContainer: {
        width: '100%',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    deviceIconView: {
        width: screenWidth * 0.3,
        height: screenWidth * 0.3,
        padding: 15,
        backgroundColor: 'rgba(135, 82, 134, 0.5)',
        borderRadius: screenWidth * 0.4
    },
    deviceIconImg: {
        width: '100%',
        height: '100%',
    },
    deviceDataView: {
        gap: 5,
    },
    dataTemplate: {

    },
    nameText: {
        fontSize: 20,
        color: 'white'
    },
    infoText: {
        fontSize: 14,
        color: 'rgba(227, 208, 242, 0.7)'
    },
    exitView: {
        width: '90%',
        alignItems: 'flex-end',
    },
    exitCurrentDevice: {

    },
    basicInfoView: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
    },
    backView: {

    },
    backButton: {
    },
    batteryContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'flex-end',
        width: '80%',
    },
    batteryInfoView: {
        height: '100%',
        flexDirection: 'column',
        maxWidth: '75%',
        alignItems: 'flex-end'
    },
    batteryInfoText: {
        color: '#dfcce3',
        fontSize: 14,
    },
    batteryPercentageView: {

    },
    batteryPercentageText: {

    },
    batteryView: {
        width: '33%',
        height: screenHeight * 0.06,
    },
});
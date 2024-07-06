import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { BleDeviceData } from 'types/ble/Ble_Types';
import Animated from 'react-native-reanimated';
import BatteryIcon from './BatteryIcon';
import { useBleNavigation } from '../../hooks/UseBleNavigation';

interface DeviceConnectedProps {
    deviceConnected: BleDeviceData;
}

const DeviceConnected = ({ deviceConnected }: DeviceConnectedProps) => {
    
    const { navigateToBleScreen } = useBleNavigation();
    const [autoConnectionEnabled, setAutoConnectionEnabled] = useState(false);
    const [vibrationEnabled, setVibrationEnabled] = useState(false);
    const [powerSavingModeEnabled, setPowerSavingModeEnabled] = useState(false);
    const [deviceVersion, setDeviceVersion] = useState('1.0.0');

    const batteryLevel = deviceConnected.batteryLevel;
    const toggleTrackFalse = "rgba(118, 117, 119, 0.7)";
    const toggleTrackTrue = "rgba(191, 187, 196, 0.7)";
    const toggleThumbFalse = '#cfc9d1';
    const toggleThumbTrue = '#fbedff';


    const toggleSwitch = (option: string) => {
        if (option === 'auto_connect') setAutoConnectionEnabled(previousState => !previousState);
        else if (option === 'vibration') setVibrationEnabled(previousState => !previousState);
        else if (option === 'power_saving') setPowerSavingModeEnabled(previousState => !previousState);
    };

    return (
        <View style={styles.deviceConnectedContainer}>
            <View style={styles.animatedGradientContainer}>
                <LinearGradient
                    colors={['rgba(76, 46, 117, 0.2)', '#59327a', '#795db0', '#a89ad6',]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.deviceConnectedView}>
                    <LinearGradient colors={['rgba(207, 120, 181, 0.3)', 'rgba(169, 74, 181, 0.3)', 'transparent']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 0.5 }}
                        style={styles.currentDeviceContainer}
                    >
                        <View style={styles.headerCurrentDevice}>
                            <View style={styles.deviceVersionView}>
                                <Text style={styles.deviceVersionText}>{`Versão: ${deviceVersion}`} </Text>
                            </View>
                            <View style={styles.batteryView}>
                                <BatteryIcon batteryLevel={batteryLevel} />
                            </View>
                        </View>
                        <View style={styles.currentDeviceOptions}>
                            <View style={styles.optionTemplate}>
                                <Text style={styles.optionText}>Conexão Automática</Text>
                                <Switch
                                    trackColor={{ false: toggleTrackFalse, true: toggleTrackTrue }}
                                    thumbColor={autoConnectionEnabled ? toggleThumbTrue : toggleThumbFalse}
                                    onValueChange={() => toggleSwitch('auto_connect')}
                                    value={autoConnectionEnabled}
                                />
                            </View>
                            <View style={styles.optionTemplate}>
                                <Text style={styles.optionText}>Vibração</Text>
                                <Switch
                                    trackColor={{ false: toggleTrackFalse, true: toggleTrackTrue }}
                                    thumbColor={vibrationEnabled ? toggleThumbTrue : toggleThumbFalse}
                                    onValueChange={() => toggleSwitch('vibration')}
                                    value={vibrationEnabled}
                                />
                            </View>
                            <View style={styles.optionTemplate}>
                                <Text style={styles.optionText}>Modo Economia de Energia</Text>
                                <Switch
                                    trackColor={{ false: toggleTrackFalse, true: toggleTrackTrue }}
                                    thumbColor={powerSavingModeEnabled ? toggleThumbTrue : toggleThumbFalse}
                                    onValueChange={() => toggleSwitch('power_saving')}
                                    value={powerSavingModeEnabled}
                                />
                            </View>
                        </View>
                        <LinearGradient colors={['#cf78b5', '#a94ab5', '#513175']} style={styles.containerButton}>
                            <TouchableOpacity onPress={() => navigateToBleScreen('device_data')} style={[styles.button]}>
                                {
                                    <Text style={styles.text}>VISUALIZAR</Text>
                                }
                            </TouchableOpacity>
                        </LinearGradient>
                    </LinearGradient>
                </LinearGradient>
            </View>
        </View>
    )
}

export default DeviceConnected;

const styles = StyleSheet.create({
    deviceConnectedContainer: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    animatedGradientContainer: {
        width: '100%',
        height: screenHeight * 0.5,
    },
    deviceConnectedView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    currentDeviceContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        gap: 15,
        borderRadius: 20,
        marginTop: 5,
    },
    headerCurrentDevice: {
        width: screenWidth * 0.8,
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    deviceVersionView: {

    },
    deviceVersionText: {
        fontSize: 14,
        color: '#e3d8e3'
    },
    batteryView: {
        width: '15%',
        height: '50%'
    },
    currentDeviceOptions: {
        flex: 1,
    },
    optionTemplate: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: screenWidth * 0.8,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(210, 203, 212, 0.3)',
    },
    optionText: {
        fontSize: 16,
        color: 'white',
    },
    containerButton: {
        alignItems: 'center',
        width: screenWidth * 0.8,
        height: screenHeight * 0.1,
        borderRadius: 50,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 7,
        shadowRadius: 3.84,
        elevation: 10,
        marginVertical: 15,
    },
    button: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },


})
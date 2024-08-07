import { NativeEventEmitter, NativeModules, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Header from './Header';
import DevicesFound from './DevicesFound';
import DeviceConnected from './DeviceConnected';
import { UseBluetoothDevice } from '@features/app/providers/patient/BluetoothProvider';
import useBLEScanner from '../../hooks/UseBleScanner';
import { useBleConnection } from '../../hooks/UseBleConnection';
import { screenHeight } from '@utils/layout/Screen_Size';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import { UseLoading } from '@hooks/loading/UseLoading';
import { UseForm } from '@features/app/providers/sub/UserProvider';

const MainBle = () => {
    const BleManagerModule = NativeModules.BleManager;
    const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);
    const { userData } = UseForm();
    const { HandleResponseAppError } = UseGlobalResponse();
    const deviceConnectionLoading = UseLoading();
    const { bluetoothConnected,
            currentDevice, setCurrentDevice,
            deviceState, setDeviceState,
            discoveredPeripherals, setDiscoveredPeripherals,
            isScanning, setIsScanning, handleRequestBluetoothPermissions } = UseBluetoothDevice();
    const { scanDevices } = useBLEScanner({ setDeviceState, isScanning, setIsScanning, handleRequestBluetoothPermissions, bluetoothConnected });
    const { handleDeviceConnection } = useBleConnection({ setCurrentDevice, setDeviceState, handleRequestBluetoothPermissions, setDiscoveredPeripherals, setLoading: deviceConnectionLoading.setLoading, HandleResponseAppError, userData });

    useEffect(() => {
        if(!bluetoothConnected)
        {
            handleRequestBluetoothPermissions();
        }
    }, []);

    return (
        <View style={styles.screen_Bluetooth}>
            <Header 
            connectionLoading={deviceConnectionLoading.loading} 
            deviceState={deviceState} 
            deviceName={currentDevice?.name} 
            isScanning={isScanning} 
            bleOn={bluetoothConnected}
            />
            {
                !currentDevice ?
                    <DevicesFound 
                    connectionLoading={deviceConnectionLoading.loading} 
                    peripherals={discoveredPeripherals} 
                    handleScan={scanDevices} 
                    connectToDevice={handleDeviceConnection} 
                    bleOn={bluetoothConnected} 
                    isScanning={isScanning}
                    />
                : 
                <DeviceConnected
                    deviceConnected={currentDevice}
                />
            }
        </View>
    )
}

export default MainBle;

const styles = StyleSheet.create({
    screen_Bluetooth: {
        flex: 1,
        paddingTop: screenHeight * 0.4,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
    },
})
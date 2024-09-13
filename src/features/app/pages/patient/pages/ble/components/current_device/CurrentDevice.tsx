import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { UseBluetoothDevice } from '@features/app/providers/patient/BluetoothProvider'
import Header from './Header';
import DeviceInfo from './DeviceInfo';
import { useBleNavigation } from '../../hooks/UseBleNavigation';
import { screenHeight } from '@utils/layout/Screen_Size';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { useBleConnection } from '../../hooks/UseBleConnection';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import { UseLoading } from '@hooks/loading/UseLoading';
import useBLE from '@hooks/ble/UseBLE';

const CurrentDevice = () => {
    const { userData } = UseForm();
    const { currentDevice,
        setCurrentDevice, 
        setDeviceState, 
        setDiscoveredPeripherals,
        } = UseBluetoothDevice();
    const { handleRequestBluetoothPermissions } = UseBluetoothDevice();
    const { HandleResponseAppError } = UseGlobalResponse();
    const deviceConnectionLoading = UseLoading();
    const { disconnectFromDevice } = useBleConnection({ setCurrentDevice, setDeviceState, setDiscoveredPeripherals, handleRequestBluetoothPermissions, setLoading: deviceConnectionLoading.setLoading, HandleResponseAppError, userData });
    const { navigateToBleScreen } = useBleNavigation();

    useEffect(() => {
        if(!currentDevice)
        {
            navigateToBleScreen('main_ble');
        }
    }, [currentDevice]);

    return (
        <View style={styles.mainCurrentDevice}>
            <Header bleNavigation={navigateToBleScreen} currentDevice={currentDevice} loading={deviceConnectionLoading.loading}/>
            <DeviceInfo bleNavigation={navigateToBleScreen} currentDevice={currentDevice} loading={deviceConnectionLoading.loading} disconnectFromDevice={disconnectFromDevice} />
        </View>
    )
}

export default CurrentDevice;

const styles = StyleSheet.create({
    mainCurrentDevice: {
        flex: 1,
    }
});
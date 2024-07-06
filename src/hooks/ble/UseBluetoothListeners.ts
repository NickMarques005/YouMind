import { UseBluetoothDevice } from '@features/app/providers/patient/BluetoothProvider';
import React, { useCallback } from 'react';
import { EmitterSubscription, NativeEventEmitter, NativeModules } from 'react-native';
import BleManager, { Peripheral } from 'react-native-ble-manager';
import { BleDeviceData, DeviceState } from 'types/ble/Ble_Types';

interface UseBluetoothListeners {
    handleDiscoverPeripherals: () => Promise<Peripheral[]>;
    handleStopScan: () => void;
    handleDisconnectDevice: () => void;
    handleConnectDevice: () => void;
}

interface BLEEmitterSubscription {
    discoverPeripheral: EmitterSubscription;
    stopScan: EmitterSubscription;
    disconnectDevice: EmitterSubscription;
    connectDevice: EmitterSubscription;
    updateState: EmitterSubscription;
}

export const useBluetoothListeners = ({ handleConnectDevice, handleDisconnectDevice, handleDiscoverPeripherals, handleStopScan }: UseBluetoothListeners) => {

    const BleManagerModule = NativeModules.BleManager;
    const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

    const setupListeners = useCallback(() => {
        const discoverPeripheral = BleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripherals);
        const stopScan = BleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
        const disconnectDevice = BleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectDevice);
        const connectDevice = BleManagerEmitter.addListener('BleManagerConnectPeripheral', handleConnectDevice);
        const updateState = BleManagerEmitter.addListener('BleManagerDidUpdateState', (args) => {
            console.log("Bluetooth State Updated:", args.state);
        });

        return { discoverPeripheral, stopScan, disconnectDevice, connectDevice, updateState };
    }, [handleDiscoverPeripherals, handleStopScan, handleDisconnectDevice]);

    const cleanupListeners = useCallback(({ discoverPeripheral, stopScan, disconnectDevice, connectDevice, updateState }: BLEEmitterSubscription) => {
        discoverPeripheral.remove();
        stopScan.remove();
        disconnectDevice.remove();
        connectDevice.remove();
        updateState.remove();
    }, []);

    return { setupListeners, cleanupListeners }
}
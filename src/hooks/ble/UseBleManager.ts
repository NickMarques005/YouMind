import { useState, useEffect } from 'react';
import BleManager from 'react-native-ble-manager';
import { PermissionsAndroid, Platform } from 'react-native';
import useBLE from './UseBLE';
import { useBluetoothListeners } from './UseBluetoothListeners';
import { useBLEBehavior } from './UseBLEBehavior';
import { BleDeviceData, DeviceState } from 'types/ble/Ble_Types';

interface UseBleManagerProps {
    setBluetoothConnected: React.Dispatch<React.SetStateAction<boolean>>;
    isScanning: boolean;
    setIsScanning: React.Dispatch<React.SetStateAction<boolean>>;
    setDeviceState: React.Dispatch<React.SetStateAction<DeviceState>>;
    setDiscoveredPeripherals: React.Dispatch<React.SetStateAction<Map<any, any> | undefined>>;
    discoveredPeripherals: Map<string, BleDeviceData> | undefined;
    setCurrentDevice: React.Dispatch<React.SetStateAction<BleDeviceData | undefined>>;
}

export const useBleManager = ({
    setBluetoothConnected,
    isScanning,
    setIsScanning,
    setDeviceState,
    setDiscoveredPeripherals,
    discoveredPeripherals,
    setCurrentDevice
}: UseBleManagerProps) => {
    const { requestPermissions } = useBLE();
    const { handleDiscoverPeripherals, handleStopScan, handleDisconnectDevice, handleConnectDevice } = useBLEBehavior({ isScanning, setIsScanning, setDeviceState, setDiscoveredPeripherals, discoveredPeripherals, setCurrentDevice });
    const { setupListeners, cleanupListeners } = useBluetoothListeners({ handleDiscoverPeripherals, handleStopScan, handleDisconnectDevice, handleConnectDevice, });

    useEffect(() => {
        requestPermissions((isGranted) => {
            if (isGranted) {
                console.log('Todas as permissões necessárias concedidas.');

                BleManager.start({ showAlert: false })
                    .then(() => {
                        console.log('Bluetooth initialized');
                    })
                    .catch((error) => {
                        console.error('Error initializing Bluetooth:', error);
                    });

                BleManager.enableBluetooth()
                    .then(() => {
                        console.log('Bluetooth is ON');
                    })
                    .catch((err) => {
                        console.log('The user refused to enable bluetooth');
                    });

                const subscriptions = setupListeners();

                BleManager.checkState()
                    .then((state) => {
                        if (state === 'on') {
                            setBluetoothConnected(true);
                        }
                    })
                    .catch((error) => {
                        console.error('Error checking Bluetooth state:', error);
                    });

                return () => {
                    cleanupListeners(subscriptions);
                }
            } else {
                console.log('Permissões necessárias não concedidas.');
                setBluetoothConnected(false);
            }
        });
    }, []);

    return;
};
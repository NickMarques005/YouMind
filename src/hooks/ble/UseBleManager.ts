import BleManager from 'react-native-ble-manager';
import useBLE from './UseBLE';
import { useBluetoothListeners } from './UseBluetoothListeners';
import { useBLEBehavior } from './UseBLEBehavior';
import { BleDeviceData, DeviceState } from 'types/ble/Ble_Types';
import { useEffect } from 'react';

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
    const { handleDiscoverPeripherals, handleStopScan,
        handleDisconnectDevice, handleConnectDevice, handleUpdateState } = useBLEBehavior({
            isScanning,
            setIsScanning,
            setDeviceState,
            setDiscoveredPeripherals,
            discoveredPeripherals,
            setCurrentDevice,
            setBluetoothConnected
        });
    const { setupListeners, cleanupListeners } = useBluetoothListeners({
        handleDiscoverPeripherals,
        handleStopScan,
        handleDisconnectDevice,
        handleConnectDevice,
        handleUpdateState
    });

    const handleRequestBluetoothPermissions = async () => {
        try {
            const isGranted = await new Promise<boolean>((resolve) => {
                requestPermissions((granted) => resolve(granted));
            });

            if (isGranted) {
                console.log('Todas as permissões necessárias concedidas.');

                await BleManager.start({ showAlert: false });
                console.log('Bluetooth initialized');

                await BleManager.enableBluetooth();
                console.log('Bluetooth is ON');

                const subscriptions = setupListeners();
                console.log("Listeners adicionados");

                const state = await BleManager.checkState();
                if (state === 'on') {
                    setBluetoothConnected(true);
                }
            } else {
                console.log('Permissões necessárias não concedidas.');
                setBluetoothConnected(false);
            }

            return isGranted;
        } catch (error) {
            console.log('Erro ao lidar com as permissões de Bluetooth:', error);
            return false;
        }
    }

    useEffect(() => {
        handleRequestBluetoothPermissions();

        return () => {
            const subscriptions = setupListeners();
            cleanupListeners(subscriptions);
        };
    }, []);

    return { handleRequestBluetoothPermissions };
};
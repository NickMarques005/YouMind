import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import { useCallback } from 'react';
import BleManager, { Peripheral } from 'react-native-ble-manager';
import { BleDeviceData, DeviceState } from 'types/ble/Ble_Types';

interface UseBLEBehaviorProps {
    setDeviceState: React.Dispatch<React.SetStateAction<DeviceState>>;
    isScanning: boolean;
    discoveredPeripherals: Map<string, BleDeviceData> | undefined;
    setIsScanning: React.Dispatch<React.SetStateAction<boolean>>;
    setDiscoveredPeripherals: React.Dispatch<React.SetStateAction<Map<string, BleDeviceData> | undefined>>;
    setCurrentDevice: React.Dispatch<React.SetStateAction<BleDeviceData | undefined>>;
    setBluetoothConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useBLEBehavior = ({ 
    setCurrentDevice, setIsScanning, 
    setDeviceState, setDiscoveredPeripherals,
    setBluetoothConnected
}: UseBLEBehaviorProps) => {

    const { HandleResponseAppError } = UseGlobalResponse();

    const handleDiscoverPeripherals = useCallback(() => {
        return new Promise<Peripheral[]>((resolve, reject) => {
            BleManager.getDiscoveredPeripherals()
                .then((peripherals) => {
                    resolve(peripherals as Peripheral[]);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }, []);

    const handleStopScan = () => {
        handleDiscoverPeripherals().then((peripheralsArray) => {
            console.log("***Escaneamento parou***");
            const peripherals = new Map(peripheralsArray.map(peripheral => [peripheral.id, peripheral]));
            if (peripherals.size > 0) {
                console.log('Dispositivos encontrados:', peripherals);
                setDiscoveredPeripherals(peripherals as Map<string, BleDeviceData>);
            } else {
                console.log('Nenhum dispositivo encontrado');
                HandleResponseAppError("Nenhum dispositivo T-Watch encontrado");
                setDiscoveredPeripherals(undefined);
            }
            setDeviceState('deviceOff');
        }).catch((error) => {
            console.error('Error getting discovered peripherals:', error);
            setDiscoveredPeripherals(undefined);
            setDeviceState('deviceOff');
        })
            .finally(() => {
                setIsScanning(false);
            })
    }

    const handleConnectDevice = () => {
        console.log("\n**DEVICE LISTENER**\n");
        console.log("Device Connected!!");
        setDeviceState('deviceOn');
    }

    const handleDisconnectDevice = () => {
        console.log("Device disconnected!!");
        setCurrentDevice(undefined);
        setDeviceState('deviceOff');
    }

    const handleDeviceDidBond = () => {
        console.log("Device Did Bond!!");
    }

    const handleUpdateState = (state: string) => {
        setBluetoothConnected(state === 'on');
    }

    return {
        handleDiscoverPeripherals,
        handleStopScan,
        handleDisconnectDevice,
        handleConnectDevice,
        handleDeviceDidBond,
        handleUpdateState
    }
}

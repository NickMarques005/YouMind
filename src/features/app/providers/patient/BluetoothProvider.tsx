import { useBleManager } from '@hooks/ble/UseBleManager';
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { BleDeviceData, CharacteristicUUIDs, DeviceState, FormBleUser, ServiceUUIDs } from 'types/ble/Ble_Types';

interface BluetoothContextType {
  bluetoothConnected: boolean;
  setBluetoothConnected: React.Dispatch<React.SetStateAction<boolean>>;
  currentDevice: BleDeviceData | undefined;
  setCurrentDevice: React.Dispatch<React.SetStateAction<BleDeviceData | undefined>>;
  deviceState: DeviceState;
  setDeviceState: React.Dispatch<React.SetStateAction<DeviceState>>;
  isScanning: boolean;
  setIsScanning: React.Dispatch<React.SetStateAction<boolean>>;
  discoveredPeripherals?: Map<string, BleDeviceData>;
  setDiscoveredPeripherals: React.Dispatch<React.SetStateAction<Map<any, any> | undefined>>;
  formBleUser: FormBleUser | undefined;
  setFormBleUser: React.Dispatch<React.SetStateAction<FormBleUser | undefined>>;
  serviceUUIDs: ServiceUUIDs;
  characteristicUUIDs: CharacteristicUUIDs;
}

type BluetoothProviderProps = {
  children: ReactNode;
};

const BluetoothContext = createContext<BluetoothContextType | undefined>(undefined);

const BluetoothProvider: React.FC<BluetoothProviderProps> = ({ children }) => {

  //SERVIÇOS E CARACTERISTICAS BLE
  const serviceUUIDs: ServiceUUIDs = { form: ["4fafc201-1fb5-459e-8fcc-c5c9c331914b"], question: ["fc650203-7530-48cc-8e88-f654ffa128dc"], device: ["5c04ef51-cbb5-4d0c-b3d6-4db7ae66309f"], medicine: ["681fc156-1b1f-4f6d-b846-7619009dd650"] }; 
  const characteristicUUIDs: CharacteristicUUIDs = { form: "beb5483e-36e1-4688-b7f5-ea07361b26a8", question: "5c8a65ab-7c53-4a38-b768-92a04f66a13d", device: "6e400002-b5a3-f393-e0a9-e50e24dcca9e", medicine: "95e4d80c-9899-461a-b37d-ecb64b852042" };

  const [bluetoothConnected, setBluetoothConnected] = useState(false);
  const [currentDevice, setCurrentDevice] = useState<BleDeviceData | undefined>(undefined);
  const [deviceState, setDeviceState] = useState<DeviceState>('deviceOff');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [discoveredPeripherals, setDiscoveredPeripherals] = useState<Map<string, BleDeviceData> | undefined>(undefined);
  const [formBleUser, setFormBleUser] = useState<FormBleUser | undefined>(undefined);

  useBleManager({ setBluetoothConnected, 
    isScanning, setIsScanning, 
    setDeviceState, setDiscoveredPeripherals,
    setCurrentDevice, discoveredPeripherals,
  });

  return (
    <BluetoothContext.Provider value={{
      bluetoothConnected,
      setBluetoothConnected,
      currentDevice,
      setCurrentDevice,
      deviceState,
      setDeviceState,
      isScanning,
      setIsScanning,
      discoveredPeripherals,
      setDiscoveredPeripherals,
      formBleUser,
      setFormBleUser,
      serviceUUIDs,
      characteristicUUIDs
    }}>
      {children}
    </BluetoothContext.Provider>
  );
};

const UseBluetoothDevice = () => {
  const context = useContext(BluetoothContext);
  if (!context) {
    throw new Error('Context precisa ser dentro do Provider! (UseBluetoothDevice)');
  }
  return context;
}

export { BluetoothContext, BluetoothProvider, UseBluetoothDevice };
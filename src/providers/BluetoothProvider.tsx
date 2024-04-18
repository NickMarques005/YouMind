import React, { createContext, useState, ReactNode } from 'react';

interface BluetoothContextType{
  bluetoothConnected: boolean;
  setBluetoothConnected: React.Dispatch<React.SetStateAction<boolean>>;
};

type BluetoothProviderProps = {
  children: ReactNode;
};

const BluetoothContext = createContext<BluetoothContextType | undefined>(undefined);

const BluetoothProvider: React.FC<BluetoothProviderProps> = ({ children }) => {
  const [bluetoothConnected, setBluetoothConnected] = useState(false);

  return (
    <BluetoothContext.Provider value={{ bluetoothConnected, setBluetoothConnected }}>
      {children}
    </BluetoothContext.Provider>
  );
};

export { BluetoothContext, BluetoothProvider};
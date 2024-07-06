import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { renderDiscoverDevice } from '../../hooks/UseRenderDiscoverDevice'

interface DeviceDiscoveredListProps {
    peripherals: Map<any, any>;
    connectToDevice: (peripheral: any) => void;
    connectionLoading: boolean;
}

const DeviceDiscoveredList = ({ connectionLoading, peripherals, connectToDevice }: DeviceDiscoveredListProps ) => {
    
    const renderDiscoveredDeviceTemplate = ({ item }: any) => {
        return renderDiscoverDevice({ item, connectToDevice, connectionLoading });
    };
    
    return (
        <FlatList
            style={styles.foundDevicesList}
            data={Array.from(peripherals.values())}
            renderItem={renderDiscoveredDeviceTemplate}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        />
    )
}

export default DeviceDiscoveredList;

const styles = StyleSheet.create({
    foundDevicesList: {

    }
});
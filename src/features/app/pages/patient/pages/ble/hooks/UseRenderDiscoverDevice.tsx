import images from "@assets/images";
import { screenHeight, screenWidth } from "@utils/layout/Screen_Size";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BleDeviceData } from "types/ble/Ble_Types";

interface RenderDiscoverDeviceProps {
    connectToDevice: (peripheral: BleDeviceData) => void
    item: BleDeviceData;
    connectionLoading: boolean;
}

export const renderDiscoverDevice = ({ item, connectToDevice, connectionLoading }: RenderDiscoverDeviceProps) => {

    const discoveredDeviceIcon = images.app_patient_images.bluetooth.device_icon;

    console.log('RENDER: ', item);
    console.log('ID: ', item.id);
    console.log('NAME: ', item.name);

    const isYouMindDevice = item.name === "T-Watch YouMind";

    if (isYouMindDevice) {
        return (

            <TouchableOpacity disabled={connectionLoading} onPress={() => connectToDevice(item)} style={[styles.deviceTemplate_button, { opacity: connectionLoading ? 0.6 : 1}]}>
                <View style={styles.deviceTemplate_View}>
                    <View style={styles.deviceTemplateIconView}>
                        <Image
                            source={discoveredDeviceIcon}
                            style={styles.deviceTemplate_Icon}
                        />
                    </View>
                    <View style={styles.deviceInfoTemplate_MainView}>
                        <Text style={styles.deviceNameTemplate_Text}>
                            {item.name}
                        </Text>
                        <View style={styles.deviceInfoTemplate_View}>
                            <Text style={styles.deviceIDTemplate_Text}>
                                ID: {item.id}
                            </Text>
                            <Text style={styles.deviceRSSITemplate_Text}>
                                RSSI: {item.rssi}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    return null;
};

const styles = StyleSheet.create({
    deviceTemplate_View: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        backgroundColor: 'rgba(245, 210, 198, 0.2)',
        padding: 15,
        borderRadius: 100,
        gap: 10,
    },
    deviceTemplate_button: {
        width: screenWidth,
        padding: 15,

    },
    deviceTemplateIconView: {
        width: '25%',
    },
    deviceTemplate_Icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    devicelist_View: {
        height: screenHeight * 0.2
    },
    devicelist_Flatlist: {
        flex: 1,
        width: '100%',
    },
    deviceInfoTemplate_MainView: {
        flex: 1,
        height: '80%',
        gap: 5,
    },
    deviceNameTemplate_Text: {
        fontWeight: '600',
        color: '#f2a0d2',
        fontSize: 20
    },
    deviceInfoTemplate_View: {
        width: '90%',
        flex: 1,
    },
    deviceRSSITemplate_Text: {
        fontSize: 14,
        color: '#e8acd0'
    },
    deviceIDTemplate_Text: {
        fontSize: 16,
        color: '#ee9ef7'
    },
});
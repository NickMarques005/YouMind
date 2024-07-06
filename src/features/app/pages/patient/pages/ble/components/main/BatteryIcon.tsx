import { UseBluetoothDevice } from '@features/app/providers/patient/BluetoothProvider';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface BatteryIconProps {
    batteryLevel?: number;
    percentage?: boolean;
    borderRadius?: number;
    borderWidth?: number;
    batteryTerminalWidth?: number;
    padding?: number;
    color?: string;
    lowBattery?: boolean;
    energySaving?: boolean;
    gradient?: string[];
}

const BatteryIcon = ({
    batteryLevel,
    percentage,
    borderRadius,
    borderWidth,
    color,
    padding,
    batteryTerminalWidth,
    gradient,
}: BatteryIconProps) => {
    const { currentDevice } = UseBluetoothDevice();
    const [battery, setBattery] = useState(batteryLevel);
    const batteryWidth = battery && battery > 100 ? 100 : battery || 0;

    const gradientColors = {
        default: ['#d761ed', '#8a2c9c'],
        lowBattery: ['#ed61d8', '#9c2c2c'],
        charging: ['#edae61', '#823d63'],
        energySaving: ['#61a2ed', '#3a1b47'],
        ultraSaving: ['#61eda7', '#1b2547']
    }

    const [colors, setColors] = useState(gradientColors.default);

    const handleBatteryColors = (level: number, energySaving?: boolean, ultraSaving?: boolean, charging?: boolean) => {
        let colors = gradientColors.default;

        if (ultraSaving) {
            colors = gradientColors.ultraSaving;
        }
        else if (charging) {
            colors = gradientColors.charging;
        }
        else if (energySaving) {
            colors = gradientColors.energySaving;
        }
        else if (level < 30) {
            colors = gradientColors.lowBattery;
        }

        setColors(colors);
    }

    useEffect(() => {
        if (currentDevice?.batteryLevel) {
            const level = currentDevice.batteryLevel;
            const charging = currentDevice.charging;
            const ultraSaving = currentDevice.ultraSaving;
            const energySaving = currentDevice.energySaving;

            handleBatteryColors(level, energySaving, ultraSaving, charging);

            console.log(level);
            setBattery(level);
        }

    }, [currentDevice?.batteryLevel]);

    return (
        <View style={[styles.batteryContainer, {
            borderRadius: borderRadius ? borderRadius : 2,
            borderWidth: borderWidth ? borderWidth : 3,
            padding: padding ? padding : 2,
            borderColor: color ? color : 'white'
        }]}>
            <LinearGradient
                colors={colors}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.batteryLevel, { width: `${batteryWidth}%`, borderRadius: borderRadius ? borderRadius * 0.5 : 1 }]} 
            />
            {
                percentage &&
                <Text style={styles.percentageLevel}>
                    {`${batteryWidth}%`}
                </Text>
            }
            <View style={[styles.batteryTerminal, {
                width: batteryTerminalWidth ? batteryTerminalWidth : 6,
                right: batteryTerminalWidth ? -(batteryTerminalWidth + 1) : -7,
                backgroundColor: color ? color : 'white'
            }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    batteryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        height: '100%',
        backgroundColor: 'transparent',
        marginRight: "3%",
    },
    batteryLevel: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    batteryTerminal: {
        position: 'absolute',
        height: '60%',
        right: -7,
        backgroundColor: 'white',
        borderRadius: 1,
    },
    percentageLevel: {
        position: 'absolute',   
        fontSize: 16,
        fontWeight: 'bold',
        color: '#c3cbe8',
        right: '35%'
    }
});

export default BatteryIcon;
import React from 'react';
import { Image, ImageSourcePropType, KeyboardAvoidingView, Platform, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabDoctorConfig } from '../config/DoctorTabConfig';
import CustomTabBar from '@navigation/tab-navigator/config/CustomTabBar';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { DoctorTabNavigatorParamList } from 'types/navigation/Navigation_Types';

const Tab = createBottomTabNavigator<DoctorTabNavigatorParamList>();

const DoctorTab: React.FC = () => {
    const { userData } = UseForm();

    return (
        <View style={{height: screenHeight, width: screenWidth}}>
            <Tab.Navigator
                tabBar={(props) => <CustomTabBar {...props} userType={userData?.type} />}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        const iconName = TabDoctorConfig.find(item => item.name === route.name)?.icon as ImageSourcePropType;
                        if (!iconName) return null;
                        return <Image source={iconName} style={{ width: 35, height: 35, opacity: focused ? 1 : 0.6 }} />;
                    },
                    headerShown: false,
                })}
            >
                {TabDoctorConfig.map((tab) => (
                    <Tab.Screen
                        key={tab.name}
                        name={tab.name as keyof DoctorTabNavigatorParamList}
                        component={tab.component}
                        options={{
                            tabBarLabel: tab.name,
                        }}
                    />
                ))}
            </Tab.Navigator>
        </View>
    );
};

export default DoctorTab;
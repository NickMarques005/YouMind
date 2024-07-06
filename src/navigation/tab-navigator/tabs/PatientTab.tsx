import React from 'react';
import { Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabPatientConfig } from '@navigation/tab-navigator/config/PatientTabConfig';
import CustomTabBar from '@navigation/tab-navigator/config/CustomTabBar';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { PatientTabNavigatorParamList } from 'types/navigation/Navigation_Types';

const Tab = createBottomTabNavigator();

const PatientTab: React.FC = () => {
    const { userData } = UseForm();

    return (
        <View style={{height: screenHeight, width: screenWidth}}>
            <Tab.Navigator
                
                tabBar={(props) => <CustomTabBar {...props} userType={userData?.type} />}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        const tab = TabPatientConfig.find((tab) => tab.name === route.name);
                        if (!tab || !tab.icon) return null;
                        return <Image source={tab.icon} style={{ width: 35, height: 35, opacity: focused ? 1 : 0.6 }} />;
                    },
                    headerShown: false,
                })}
            >
                {TabPatientConfig.map((tab) => (
                    <Tab.Screen
                        
                        key={tab.name as keyof PatientTabNavigatorParamList}
                        name={tab.name}
                        component={tab.component} />
                ))}
            </Tab.Navigator>
        </View>
    );
};

export default PatientTab;
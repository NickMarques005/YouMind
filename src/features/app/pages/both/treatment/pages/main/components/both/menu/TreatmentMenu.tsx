import React from 'react';
import useTreatmentMenuBehavior from './hooks/TreatmentMenuBehavior';
import VerticalMenu from '@components/menu/VerticalMenu';
import { Modal, StyleSheet } from 'react-native';
import { screenHeight } from '@utils/layout/Screen_Size';
import { UserType } from 'types/user/User_Types';
import { SharedValue } from 'react-native-reanimated';

interface TreatmentMenuProps {
    closeTreatmentMenu: () => void;
    userType?: UserType;
    opacity: SharedValue<number>;
    translateY: SharedValue<number>;
}

const TreatmentMenu = ({ opacity, closeTreatmentMenu, userType, translateY }: TreatmentMenuProps) => {
    const { options } = useTreatmentMenuBehavior({ userType });
    const styles = treatmentMenuStyles(userType);

    return (
        <VerticalMenu
            options={options}
            containerStyle={styles.menuContainer}
            backgroundStyle={styles.background}
            itemStyle={styles.menuItem}
            lineStyle={styles.menuItemLine}
            iconStyle={styles.icon}
            iconSize={30}
            iconColor={userType === 'doctor' ? '#24586b' : '#64246b'}
            textStyle={styles.text}
            rootView={styles.rootView}
            closeMenu={closeTreatmentMenu}
            opacity={opacity}
            translateY={translateY}
        />
    );
};

const treatmentMenuStyles = (userType: UserType) => {
    return StyleSheet.create({
        rootView: {
            position: 'absolute',
            flex: 1,
            width: '100%',
            zIndex: 4,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: screenHeight * 0.10,
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        menuContainer: {
            maxWidth: '68%',
            backgroundColor: '#f0f0f0',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
        },
        background: {
            height: screenHeight,
            width: '100%',
            backgroundColor: userType == "doctor" ? "rgba(40, 61, 82, 0.3)" : 'rgba(100, 36, 107, 0.3)',
            paddingVertical: '4%',
            paddingHorizontal: '1.5%'
        },
        menuItem: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 7,
            paddingVertical: 15,
        },
        menuItemLine: {
            borderBottomWidth: 1,
            borderBottomColor: userType == "doctor" ? "#86a8b5" : '#aa86b5'
        },
        icon: {
        },
        text: {
            fontSize: 17,
            color: '#333',
            fontWeight: '500'
        },
    });
}

export default TreatmentMenu;
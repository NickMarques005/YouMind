import React from 'react';
import VerticalMenu from '@components/menu/VerticalMenu';
import { StyleSheet } from 'react-native';
import { screenHeight } from '@utils/layout/Screen_Size';
import { SharedValue } from 'react-native-reanimated';
import { UserType } from 'types/user/User_Types';
import useTaggedMenuBehavior from './hooks/TaggedMenuBehavior';

interface TaggedMenuProps {
    closeTaggedMenu: () => void;
    opacity: SharedValue<number>;
    userType?: UserType;
    translateY: SharedValue<number>;
}

const TaggedMenu = ({ opacity, closeTaggedMenu, userType, translateY }: TaggedMenuProps) => {
    const { options } = useTaggedMenuBehavior();
    const styles = taggedMenuStyles(userType);

    return (
        <VerticalMenu
            options={options}
            containerStyle={styles.menuContainer}
            backgroundStyle={styles.background}
            itemStyle={styles.menuItem}
            lineStyle={styles.menuItemLine}
            iconStyle={styles.icon}
            iconSize={25}
            iconColor="#24586b"
            textStyle={styles.text}
            rootView={styles.rootView}
            closeMenu={closeTaggedMenu}
            opacity={opacity}
            translateY={translateY}
        />
    );
};

const taggedMenuStyles = (userType: UserType) => {
    return StyleSheet.create({
        rootView: {
            position: 'absolute',
            flex: 1,
            width: '100%',
            zIndex: 4,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: screenHeight * 0.12,
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        menuContainer: {
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
            paddingVertical: '1%',
            paddingHorizontal: '1.5%',
            alignItems: 'flex-end'
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

export default TaggedMenu;
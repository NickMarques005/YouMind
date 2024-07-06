import images from '@assets/images';
import { HealthPage } from '@features/app/providers/patient/HealthProvider';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withDelay,
    withTiming,
    runOnJS,
} from 'react-native-reanimated';

interface MenuItem {
    name: HealthPage;
    icon: any;
}

interface MenuProps {
    setCurrentPage: (page: HealthPage) => void;
}

const menuItems: MenuItem[] = [
    { name: 'Questionários', icon: images.app_patient_images.health.menu.icon_menu_questionaires },
    { name: 'Medicamentos', icon: images.app_patient_images.health.menu.icon_menu_medicines },
    { name: 'Call', icon: images.app_patient_images.health.menu.icon_menu_call },
];

const useCreateHealthMenuAnimations = () => {
    const itemAnimations = menuItems.map(() => {
        const translateX = useSharedValue(0);
        const translateY = useSharedValue(0);
        const scale = useSharedValue(0.5);
        const opacity = useSharedValue(0);

        const animatedHealthOptionsStyle = useAnimatedStyle(() => {
            return {
                transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }],
                opacity: opacity.value,
            };
        });

        return {
            translateX,
            translateY,
            scale,
            opacity,
            animatedHealthOptionsStyle
        };
    });

    return itemAnimations;
}

const Menu = ({ setCurrentPage }: MenuProps) => {

    const menuIcon = images.app_patient_images.health.menu.icon_menu_default;

    const [menuHealthNotOpen, setMenuHealthNotOpen] = useState(true);
    const itemAnimations = useCreateHealthMenuAnimations();
    const [gradientOpacity, setGradientOpacity] = useState(0);
    const [gradientDisplay, setGradientDisplay] = useState(false);

    const gradientAnimOpacity = useAnimatedStyle(() => {
        return {
            opacity: withTiming(gradientOpacity, { duration: 400 }),
        };
    });

    const handleHealthMenu = () => {

        runOnJS(() => {
            setMenuHealthNotOpen(!menuHealthNotOpen);

            menuItems.forEach((item, index) => {
                itemAnimations[index].translateX.value = withDelay(
                    index * 50,
                    withSpring(menuHealthNotOpen ? 130 * Math.sin((index + 2) * (Math.PI / 3)) : 0, {
                        damping: 5,
                        stiffness: 50,
                    })
                );

                itemAnimations[index].translateY.value = withDelay(
                    index * 50,
                    withSpring(menuHealthNotOpen ? -100 * Math.cos((index + 2) * (Math.PI / 3)) : 0, {
                        damping: 5,
                        stiffness: 40,
                    })
                );

                itemAnimations[index].scale.value = withDelay(
                    index * 50,
                    withSpring(menuHealthNotOpen ? 1 : 0.5, { damping: 10, stiffness: 80 })
                );

                itemAnimations[index].opacity.value = withDelay(
                    index * 50,
                    withSpring(menuHealthNotOpen ? 1 : 0, { damping: 10, stiffness: 80 })
                );
            });

            setGradientOpacity(menuHealthNotOpen ? 1 : 0);
            if (!menuHealthNotOpen) {
                setTimeout(() => {
                    setGradientDisplay(false)
                }, 410);
            }
            else {
                setGradientDisplay(true);
            }

        })();
    };

    const renderMenuItems = () => {
        return menuItems.map((item, index) => {
            return (
                <Animated.View
                    key={index}
                    style={[styleHealthMenu.menuItem, itemAnimations[index].animatedHealthOptionsStyle]}
                >
                    <TouchableOpacity
                        onPress={() => handleMenuItemPress(item.name)}
                        style={styleHealthMenu.menuItem_button}
                    >
                        <View style={styleHealthMenu.menuItemIcon_View}>
                            <Image source={item.icon} style={styleHealthMenu.menuItemIcon} />
                        </View>
                        <Text style={styleHealthMenu.menuItemLabel}>{item.name}</Text>
                    </TouchableOpacity>
                </Animated.View>
            );
        });
    };

    const handleMenuItemPress = (item: HealthPage) => {
        console.log("Health Option: ", item);
        setCurrentPage(item);
    };

    return (

        <>
            {
                <TouchableWithoutFeedback>
                    <Animated.View style={[styleHealthMenu.healthMenu_gradientView, gradientAnimOpacity, { display: `${gradientDisplay ? "flex" : "none"}` }]}>
                        <LinearGradient
                            colors={['#8c18a1', "rgba(101, 19, 105, 1)", "rgba(106, 18, 110, 0.5)", 'transparent']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 0.45 }} style={[styleHealthMenu.healthMenu_gradientView]} />
                    </Animated.View>
                </TouchableWithoutFeedback>
            }

            <View style={styleHealthMenu.menuContainer}>
                {renderMenuItems()}
                <TouchableOpacity
                    onPress={() => handleHealthMenu()}
                >
                    <LinearGradient colors={['#8e176c', '#c747cf']} style={styleHealthMenu.centerIcon}>
                        <Image source={menuIcon} style={[styleHealthMenu.centerIconImage]} />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styleHealthMenu = StyleSheet.create({
    healthMenu_mainDiv: {
        width: screenWidth,
        height: screenHeight * 0.1,
        position: 'absolute',
        zIndex: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 7,
        shadowRadius: 3.84,
        elevation: 4,
    },
    healthMenu_gradientView: {
        position: 'absolute',
        width: '100%',
        height: screenHeight * 0.9,
        pointerEvents: 'none',
        zIndex: 3,
    },
    menuContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        zIndex: 4,
        alignSelf: 'center',
        top: '-2%'
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'center',

    },
    menuItem_button: {
        alignItems: 'center'
    },
    menuItemIcon: {
        width: '100%',
        height: '100%',
    },
    menuItemLabel: {
        marginTop: 5,
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    menuItemIcon_View: {
        width: 80,
        height: 80,
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 190,
        height: 90,
        paddingTop: 10,
        borderBottomLeftRadius: 200,
        borderBottomRightRadius: 200,
    },
    centerIconImage: {
        width: 40,
        height: 40,
    },
});


export default Menu;
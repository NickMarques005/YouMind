import { handleColorType } from "@utils/design/Color";
import { responsiveSize, screenWidth } from "@utils/layout/Screen_Size";
import { StyleSheet, Text, View } from "react-native";
import { UserType } from "types/user/User_Types";
import { MaterialIcons } from '@expo/vector-icons';
import Animated from "react-native-reanimated";

interface SwipeIndicatorProps {
    type: UserType;
    animatedStyles: any;
}

const SwipeIndicator: React.FC<SwipeIndicatorProps> = ({ type, animatedStyles }) => {
    const swipeIconSize = responsiveSize * 0.3;
    const styles = SwipeStyle(type, swipeIconSize);


    return (
        <Animated.View style={[styles.swipeIndicatorContainer, animatedStyles]}>
            <View style={styles.swipeCircle}>
                <MaterialIcons name="swipe" size={swipeIconSize / 2} color={handleColorType({ patientColor: '#502b54', doctorColor: '#2b4054', userType: type })} />
            </View>
            <View style={styles.swipeContainerText}>
                <Text style={styles.swipeText}>Deslize horizontalmente para visualizar as questões</Text>
            </View>

        </Animated.View>
    );
};

export default SwipeIndicator;

const SwipeStyle = (type: UserType, swipeIconSize?: number) => {
    return StyleSheet.create({
        swipeIndicatorContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            width: screenWidth,
            paddingVertical: '10%',
            gap: 10,
        },
        swipeCircle: {
            width: swipeIconSize || 80,
            height: swipeIconSize || 80,
            borderRadius: swipeIconSize || 80,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: handleColorType({ patientColor: '#f4f0f5', doctorColor: '#f0f2f5', userType: type }),
            marginBottom: 10,
        },
        swipeContainerText: {
            width: '75%',
            justifyContent: 'center'
        },
        swipeText: {
            fontSize: 18,
            color: handleColorType({ patientColor: '#502b54', doctorColor: '#2b4054', userType: type }),
            fontWeight: 'bold',
            textAlign: 'center'
        },
    });
}
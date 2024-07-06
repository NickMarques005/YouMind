
import { screenHeight } from "@utils/layout/Screen_Size";
import { StyleSheet } from "react-native"


export const confirm_solicitation_modal_style = (userType: string | undefined) => {

    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            gap: 30,
            paddingVertical: 15,
        },
        messageView: {
            width: '100%',
            paddingTop: 15,
            paddingHorizontal: 10,
            alignItems: 'center',
        },
        message: {
            fontSize: 18,
            textAlign: 'center',
            color: userType === 'doctor' ? '#417880' : '#704180'
        },
        iconContainer: {
            padding: 5,
        },
        buttonContainer: {
            paddingTop: 10,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            gap: 15,
        },
        buttonGradient: {
            flex: 1,
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'center',
        },
        button: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 20,
        },
        buttonText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: 'white',
        }
    });
}

export const buttonDefaultGradient = (userType?: string) => {
    return {
        colors: userType === 'doctor' ? ['#5d9eba', '#329fa1'] : ['#9d5dba', '#8d32a1'],
        start: { x: 0, y: 0 },
        end: { x: 0.8, y: 1 }
    };
}

export const buttonCancelGradient = (userType?: string) => {
    return {
        colors: userType === 'doctor' ? ['#869496', '#618b91'] : ['#928696', '#896191'],
        start: { x: 0, y: 0 },
        end: { x: 0.8, y: 1 }
    };
}
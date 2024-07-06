import { StyleSheet } from "react-native"

export const choose_options_style = () => {

    return StyleSheet.create({
        chooseUser_contentView: {
            width: '100%',
            paddingHorizontal: '10%',
            height: '75%',
            justifyContent: 'center',
            borderTopRightRadius: 60,
            elevation: 20,
            backgroundColor: '#fdedff',
            top: '-3%'
        },
        chooseUser_buttonsMainView: {
            backgroundColor: '#fdedff',
            width: '100%',
            height: '56%',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius: 10,
            paddingVertical: '0.8%',
    
        },
        chooseUser_ButtonsContainer: {
            height: '140%',
            width: '136%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
            transform: [{ rotate: '45deg' }],
        },
        chooseUser_buttonStandard: {
            width: '52%',
            height: '100%',
            borderRadius: 30,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
    
        },
        chooseUser_buttonTextPatient: {
            position: 'absolute',
            right: '-10%',
            bottom: '26%',
            transform: [{ rotate: '-90deg' }],
        },
        chooseUser_buttonTextDoctor: {
            position: 'absolute',
            left: '-10%',
            top: '26%',
            transform: [{ rotate: '-90deg' }],
        },
        chooseUser_buttonText: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 24,
            textTransform: 'uppercase'
        },
        chooseUser_buttonTouch: {
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        }
    })
}
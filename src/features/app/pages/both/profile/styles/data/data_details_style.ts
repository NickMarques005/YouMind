
import { screenHeight } from "@utils/layout/Screen_Size";
import { StyleSheet } from "react-native"


export const data_details_style = (userType: string | undefined) => {

    return StyleSheet.create({
        container: {
            height: screenHeight * 0.7,
            width: '100%',
            padding: 30,
            justifyContent: 'space-between'
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            justifyContent: 'space-between',
        },
        title: {
            fontWeight: 'bold',
            fontSize: 20,
            color: userType === 'doctor' ? '#0b5959' : '#631c50'
        },
        inputsContainer: {
            width: '100%',
            height: '65%',
            justifyContent: 'space-between'
        },
        viewInputTemplate: {
            width: '100%',
            gap: 2,
        },
        textInputTemplate: {
            fontSize: 14,
            color: userType === 'doctor' ? '#4193b0' : '#a541b0',
        },
        viewInput: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '2%',
            borderColor: userType === 'doctor' ? '#4193b0' : '#a541b0',
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: '5%',
            width: '100%',    
        },
        input: {
            flex: 1,
            fontSize: 16,
            color: userType === 'doctor' ? '#1a586e' : '#5b1869',
        },
        iconCalendar: {
            height: 25,
            width: 25,
        },
        button: {
            backgroundColor: userType === 'doctor' ? '#5ba4ba' : '#9f5bba',
            height: screenHeight * 0.07,
            justifyContent: 'center',
            borderRadius: 5,
        },
        buttonText: {
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 16,
        }
    });
}
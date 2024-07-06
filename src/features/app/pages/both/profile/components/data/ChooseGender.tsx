
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { UserDataToUpdate } from '../../hooks/UseUpdateProfileData'
import CustomCheckInput from '@components/inputs/check/CustomCheckInput'
import { UserGender } from 'types/user/User_Types';
import images from '@assets/images';

interface ChooseGenderProps {
    userType?: string;
    userDataToUpdate: UserDataToUpdate;
    setGender: (gender: UserGender) => void;
    goBack: () => void;
}

const genders: UserGender[] = ['Masculino', 'Feminino', 'Prefiro não informar'];

const ChooseGender = ({ userDataToUpdate, setGender, goBack, userType }: ChooseGenderProps) => {

    const backIcon = images.generic_images.back.default_back_gray;

    return (
        <View style={styles.chooseGenderContainer}>
            <View style={styles.titleView}>
                <Text style={[styles.title, {  color: userType === 'doctor' ? '#0b5959' : '#631c50'}]}>Qual o seu gênero?</Text>
                <TouchableOpacity onPress={() => goBack()} style={styles.exit_Button}>
                    <Image style={{ height: 35, width: 35 }} source={backIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.genderOptions}>
                {genders.map((gender) => (
                    <CustomCheckInput
                        key={gender}
                        label={gender}
                        isSelected={userDataToUpdate.gender === gender}
                        onPress={() => setGender(gender)}
                        userType={userType}
                    />
                ))}

            </View>
        </View>
    )
}

export default ChooseGender

const styles = StyleSheet.create({
    chooseGenderContainer: {
        flex: 1,
        justifyContent: 'center',
        gap: 35,
    },
    exit_Button: {

    },
    titleView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    genderOptions: {
        height: '60%',
        gap: 15,
    },
})
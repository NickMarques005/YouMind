
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { UserDataToUpdate } from '../../hooks/UseUpdateProfileData'
import CustomCheckInput from '@components/inputs/check/CustomCheckInput'
import { GenderType, UserGender } from 'types/user/User_Types';
import images from '@assets/images';
import CustomTextInput from '@components/text_input/CustomInput';

interface ChooseGenderProps {
    userType?: string;
    userDataToUpdate: UserDataToUpdate;
    setUserGender: (gender: UserGender) => void;
    setGenderType: (type: GenderType) => void;
    goBack: () => void;
}

const genders: GenderType[] = ['Masculino', 'Feminino', 'Prefiro não informar', 'Outro'];

const ChooseGender = ({ userDataToUpdate, setUserGender, setGenderType, goBack, userType }: ChooseGenderProps) => {
    const [showInput, setShowInput] = useState<boolean>(userDataToUpdate.genderType === 'Outro');
    const backIcon = images.generic_images.back.default_back_gray;

    const handleGenderSelection = (gender_type: GenderType) => {
        if (gender_type === 'Outro') {
            setUserGender("");
            setShowInput(true);
        }
        else {
            if(showInput) setShowInput(false);
            setUserGender(gender_type);
        }
        setGenderType(gender_type);
    }

    const handleUpdateOtherGender = (value: string) => {
        setUserGender(value);
    }

    return (
        <View style={styles.chooseGenderContainer}>
            <View style={styles.titleView}>
                <Text style={[styles.title, { color: userType === 'doctor' ? '#0b5959' : '#631c50' }]}>Qual o seu gênero?</Text>
                <TouchableOpacity onPress={() => goBack()} style={styles.exit_Button}>
                    <Image style={{ height: 35, width: 35 }} source={backIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.genderOptions}>
                {genders.map((gender) => (
                    <CustomCheckInput
                        key={gender}
                        label={gender}
                        isSelected={userDataToUpdate.genderType === gender}
                        onPress={() => handleGenderSelection(gender)}
                        userType={userType}
                    />
                ))}
            </View>
            {
                showInput &&
                <View style={styles.otherGenderContainer}>
                    <CustomTextInput
                        style={{
                            color: userType === 'doctor' ? '#1a586e' : '#5b1869',
                            height: '20%',
                            fontSize: 18,
                        }}
                        value={userDataToUpdate.gender}
                        onChangeText={(e) => handleUpdateOtherGender(e)}
                        placeholder={"Gênero"}
                        maxLength={25}
                    />
                </View>
            }
        </View>
    )
}

export default ChooseGender

const styles = StyleSheet.create({
    chooseGenderContainer: {
        flex: 1,
        justifyContent: 'center',
        gap: 25,
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
    otherGenderContainer: {
        width: '100%',
        padding: '3%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    }
})
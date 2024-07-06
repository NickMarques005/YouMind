import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size'
import images from '@assets/images'
import { DoctorScreenName } from 'types/navigation/Navigation_Types'

interface SearchPatientsProps {
    navigateTo: (screenName: DoctorScreenName) => void;
}

const SearchPatients = ({ navigateTo }: SearchPatientsProps) => {

    const searchPeopleIcon = images.app_doctor_images.home.search_people_icon;
    const homeBg1 = images.app_doctor_images.home.bg_home_content_1;

    return (
        <View style={{ width: '100%', minHeight: screenHeight * 0.25, backgroundColor: '#a9c4cf', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly', shadowColor: 'black', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.2, shadowRadius: 3.84, elevation: 5, overflow: 'hidden' }}>
            <ImageBackground style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', opacity: 0.8, }} source={homeBg1}>

                <View style={{ width: '70%', padding: 20, display: 'flex', gap: 10, justifyContent: 'space-between' }}>
                    <View style={{}}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#063340' }}>Pronto para mudar a vida de seus pacientes?</Text>
                    </View>
                    <Text style={{ fontSize: 14, color: '#0b3440' }}>
                        Procure pelos seus pacientes e faça a diferença em seus tratamentos.
                    </Text>
                    <LinearGradient colors={['#35a5c4', '#186a73',]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }} style={{ width: '80%', alignItems: 'center', borderRadius: 40, }}>
                        <TouchableOpacity onPress={() => navigateTo('Tratamento')} style={{ paddingVertical: 15, paddingHorizontal: 20, width: '100%', alignItems: 'center', borderRadius: 40, }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Procurar</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </ImageBackground>
        </View>
    )
}

export default SearchPatients
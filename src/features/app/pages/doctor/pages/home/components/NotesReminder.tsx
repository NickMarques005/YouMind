import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size'
import { ImageBackground } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import images from '@assets/images'
import { DoctorScreenName } from 'types/navigation/Navigation_Types'

interface NotesReminderProps {
    navigateTo: (screenName: DoctorScreenName) => void;
}

const NotesReminder = ({ navigateTo }: NotesReminderProps) => {
    
    const homeBg3 = images.app_doctor_images.home.bg_home_content_3;
    const noteIllustration = images.app_doctor_images.home.notepad_illustration;
    const noteIcon = images.app_doctor_images.home.notes_icon;

    return (
        <View style={{ width: '100%', minHeight: screenHeight * 0.3, backgroundColor: '#a9c4cf', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly', shadowColor: 'black', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.2, shadowRadius: 3.84, elevation: 5, overflow: 'hidden' }}>
            <ImageBackground style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', opacity: 0.8 }} source={homeBg3}>
                <View style={{ width: '70%', padding: 20, display: 'flex', gap: 10, justifyContent: 'space-between', zIndex: 2, }}>
                    <View style={{}}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#063340' }}>
                            Precisa anotar o progresso do tratamento?
                        </Text>
                    </View>
                    <Text style={{ fontSize: 14, color: '#0b3440' }}>
                        Adicione observações em relação ao progresso dos pacientes. Isso pode ser a chave para um impacto ainda mais positivo na jornada de cura!
                    </Text>
                    <LinearGradient colors={['#35a5c4', '#186a73',]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }} style={{ width: '100%', alignItems: 'center', borderRadius: 40, }}>
                        <TouchableOpacity onPress={() => navigateTo('Notepad')} style={{ paddingVertical: 15, paddingHorizontal: 20, display: 'flex', flexDirection: 'row', gap: 10, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ height: screenWidth * 0.05, width: screenWidth * 0.05 }} source={noteIcon} />
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Vamos Anotar!</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
                <View style={{ position: 'absolute', height: '100%', width: '40%', right: -10, bottom: '-15%', alignItems: 'center' }}>
                    <Image style={{ width: screenWidth * 0.4, height: screenWidth * 0.6, }} source={noteIllustration} />
                </View>
            </ImageBackground>
        </View>
    )
}

export default NotesReminder
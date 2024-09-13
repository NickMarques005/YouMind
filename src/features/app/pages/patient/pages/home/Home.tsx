import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import Title from './components/Title';
import Questions from './components/Questions';
import Call from './components/Call';
import MedSection from './components/MedSection';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import images from '@assets/images';
import { ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CurrentMedicine from './components/CurrentMedicine';
import { UseMedications } from '@features/app/providers/patient/MedicationProvider';
import { useTabNavigation } from '@features/app/hooks/navigation/UseTabNavigator';

const Home = () => {
    const { userData } = UseForm();
    const { navigateToPatientScreen } = useTabNavigation();
    const { medications } = UseMedications();

    const headerBg = images.app_patient_images.home.home_header_patient;

    return (
        <ScrollView style={styles.container}>
            <LinearGradient colors={['#fcf7fc', '#e2bee6']} style={styles.screen_Home}>
                <ImageBackground
                    source={headerBg}
                    style={styles.backgroundImage_HomeTitle}
                >
                    <Title name={userData?.name} gender={userData?.gender} />
                </ImageBackground>

                <View style={styles.content}>
                    <Questions navigateTo={navigateToPatientScreen}/>
                    <View style={{ width: '100%', }}>
                        <Call navigateTo={navigateToPatientScreen} />
                        <CurrentMedicine />
                    </View>

                    <MedSection navigateTo={navigateToPatientScreen} medications={medications} />
                </View>
            </LinearGradient>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    screen_Home: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 15,
        paddingBottom: 20,
    },
    backgroundImage_HomeTitle: {
        width: screenWidth,
        height: screenHeight * 0.3,
    },
    backgroundImage_Call: {
        width: screenWidth * 0.5,
        height: screenHeight * 0.2,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    backgroundImage_MedSection: {
        width: screenWidth * 0.95,
        height: screenHeight * 0.12,

    },
    content: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        gap: 20,
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default Home;
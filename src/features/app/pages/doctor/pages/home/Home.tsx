import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import Title from './components/Title';
import SearchPatients from './components/SearchPatients';
import ProgressOverview from './components/ProgressOverview';
import NotesReminder from './components/NotesReminder';
import { useTabNavigation } from '@features/app/hooks/navigation/UseTabNavigator';

const Home = () => {
    const { userData } = UseForm();
    const { navigateToDoctorScreen } = useTabNavigation();

    return (
        <ScrollView>
            <LinearGradient colors={['#f7fbfc', '#bee1e6']} style={styles.screen_Home}>
                <Title name={userData?.name} gender={userData?.gender} />
                <View style={styles.content}>
                    <SearchPatients navigateTo={navigateToDoctorScreen}/>
                    <ProgressOverview navigateTo={navigateToDoctorScreen} patientsProgress={30} missMedicines={5} />
                    <NotesReminder navigateTo={navigateToDoctorScreen} />
                </View>

            </LinearGradient>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen_Home: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: '60%',
    },
    content: {
        gap: 20,
        paddingVertical: 20,
    }
});

export default Home
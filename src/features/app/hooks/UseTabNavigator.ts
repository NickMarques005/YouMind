import { useNavigation } from '@react-navigation/native';
import { DoctorScreenName, DoctorTabNavigatorParamList, DoctorTabTypes, PatientScreenName, PatientTabNavigatorParamList, PatientTabTypes } from 'types/navigation/Navigation_Types'; // Ajuste o caminho de importação conforme necessário


export const useTabNavigation = () => {
    const patientNavigation = useNavigation<PatientTabTypes>();
    const doctorNavigation = useNavigation<DoctorTabTypes>();
    
    const navigateToPatientScreen = (screenName: PatientScreenName) => {
        patientNavigation.navigate(screenName);
    };

    const navigateToDoctorScreen = (screenName: DoctorScreenName) => {
        doctorNavigation.navigate(screenName);
    };

    return {navigateToPatientScreen, navigateToDoctorScreen};
}
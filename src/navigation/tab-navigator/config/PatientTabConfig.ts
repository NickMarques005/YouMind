import images from "@assets/images";
import Bluetooth from "@features/app/pages/patient/pages/ble/Bluetooth";
import Health from "@features/app/pages/patient/pages/health/Health";
import Home from "@features/app/pages/patient/pages/home/Home";
import Profile from "@features/app/pages/both/profile/Profile";
import { ImageSourcePropType } from "react-native";
import Treatment from "@features/app/pages/both/treatment/Treatment";

interface TabConfigItem {
    name: string;
    component: React.ComponentType<any>;
    icon: ImageSourcePropType;
}

export const TabPatientConfig: TabConfigItem[] = [
    {
        name: "Home",
        component: Home,
        icon: images.app_patient_images.menu.menu_patient_home,
    },
    {
        name: "Tratamento",
        component: Treatment,
        icon: images.app_patient_images.menu.menu_patient_treatment,
    },
    {
        name: "Perfil",
        component: Profile,
        icon: images.app_patient_images.menu.menu_patient_profile,
    },
    {
        name: "Saúde",
        component: Health,
        icon: images.app_patient_images.menu.menu_patient_health,
    },
    {
        name: "Bluetooth",
        component: Bluetooth,
        icon: images.app_patient_images.menu.menu_patient_bluetooth,
    }
];

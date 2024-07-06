import images from "@assets/images";
import Profile from "@features/app/pages/both/profile/Profile";
import Analysis from "@features/app/pages/doctor/pages/analysis/Analysis";
import Home from "@features/app/pages/doctor/pages/home/Home";
import Notepad from "@features/app/pages/doctor/pages/notepad/Notepad";
import Treatment from "@features/app/pages/both/treatment/Treatment";
import { ImageSourcePropType } from "react-native";

interface TabConfigItem {
    name: string;
    component: React.ComponentType<any>;
    icon: ImageSourcePropType;
}

export const TabDoctorConfig: TabConfigItem[] = [
    {
        name: "Home",
        component: Home,  
        icon: images.app_doctor_images.menu.menu_doctor_home,
    },
    {
        name: "Tratamento",
        component: Treatment,  
        icon: images.app_doctor_images.menu.menu_doctor_treatment,
    },
    {
        name: "Perfil",
        component: Profile,  
        icon: images.app_doctor_images.menu.menu_doctor_profile,
    },
    {
        name: "Análises",
        component: Analysis,  
        icon: images.app_doctor_images.menu.menu_doctor_analysis,
    },
    {
        name: "Notepad",
        component: Notepad,  
        icon: images.app_doctor_images.menu.menu_doctor_notepad,
    }
];
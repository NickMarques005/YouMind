import { ImageSourcePropType } from 'react-native';

export interface ProfileOptionType {
    name: string;
    icon: ImageSourcePropType;
    function: () => void;
    params?: object;
}
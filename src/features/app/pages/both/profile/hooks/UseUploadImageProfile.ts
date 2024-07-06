import { UseUserService } from '@hooks/api/UseUserService';
import generateUniqueUID from '@utils/security/handleUUID';

import * as imagePicker from 'expo-image-picker';
import FirebaseStorageService from 'src/__firebase__/services/FirebaseStorageService';
import { UserDoctor, UserPatient } from 'types/user/User_Types';

interface UseUploadImageProfile {
    updateImgProfile: (newData: Partial<UserDoctor> | Partial<UserPatient>) => void;
    closeModal: () => void;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export type UploadImageMode = 'camera' | 'gallery';

export const UseUploadImageProfile = ({ updateImgProfile, closeModal, setLoading }: UseUploadImageProfile) => {

    const { performUpdateUserAvatar } = UseUserService(setLoading);

    const saveImageInDatabase = async (image: string, oldAvatar?: string) => {

        try {
            console.log("Imagem: ", image);

            const response = await performUpdateUserAvatar({ avatar: image }, oldAvatar);
            if (response.success) {
                if (response.data && response.data.avatar) {
                    const avatar = response.data.avatar;
                    const updateProfile = {
                        avatar: avatar,
                    }
                    console.log('Atualizar imagem de perfil');
                    updateImgProfile(updateProfile);
                }
            }

            if (response.error) {
                console.log("Houve um erro!")
            }

        }
        catch (err) {
            const error = err as Error;
            console.log("Erro ao fazer upload da imagem: ", error.message);
        }
    }

    const uploadImageFromCamera = async (oldAvatar?: string) => {
        try {

            await imagePicker.requestCameraPermissionsAsync();
            let result = await imagePicker.launchCameraAsync({
                cameraType: imagePicker.CameraType.front,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            });

            if (!result.canceled) {
                await saveImageInDatabase(result.assets[0].uri, oldAvatar)
                closeModal();
            }
        }
        catch (err) {
            const error = err as Error;
            console.log("Erro ao fazer upload da imagem: ", error.message);
        }
    }

    const uploadImageFromGallery = async (oldAvatar?: string) => {
        try {

            await imagePicker.requestMediaLibraryPermissionsAsync();
            const result = await imagePicker.launchImageLibraryAsync({
                mediaTypes: imagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            });
            if (!result.canceled) {
                console.log("Salvar imagem!");
                await saveImageInDatabase(result.assets[0].uri, oldAvatar);
                closeModal();
            }
        }
        catch (err) {
            const error = err as Error;
            console.log("Erro ao fazer upload da imagem: ", error.message);
            closeModal();
        }
    }

    const changeImageProfile = (mode: UploadImageMode, avatar?: string) => {
        switch (mode) {
            case 'camera':
                uploadImageFromCamera(avatar);
                break;
            case 'gallery':
                uploadImageFromGallery(avatar);
                break;
            default:
                console.log("Houve um erro desconhecido");
                break;
        }
    }

    const removeImageProfile = async (oldAvatar?: string) => {
        console.log("Remover foto de perfil");
        try {

            if (!oldAvatar) {
                console.log("Avatar para remoção não encontrado");
                return;
            }

            const response = await performUpdateUserAvatar({ avatar: '' }, oldAvatar);
            console.log("Resposta: ", response);
            if (response.success) {
                const avatar = response.data?.avatar;
                const updateProfile = {
                    avatar: avatar,
                }
                updateImgProfile(updateProfile);
            }

            if (response.error) {
                console.log("Houve um erro!");
            }
        }
        catch (err) {
            const error = err as Error;
            console.log("Erro ao remover imagem: ", error.message);
        }
    }

    return { changeImageProfile, removeImageProfile }
}
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { FIREBASE_STORAGE } from '../FirebaseConfig';
import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const uploadAudio = async (filePath: string): Promise<string> => {
    try {
        const response = await fetch(`file:///${filePath}`);
        const audioBlob = await response.blob();
        const audioRef = ref(FIREBASE_STORAGE, `audios/${Date.now()}.m4a`);
        await uploadBytes(audioRef, audioBlob).then((result) => console.log(result.ref)).catch(err => console.log("UPLOAD BYTES ERROR: ", err))
        console.log("uploadAudio..");
        const url = getDownloadURL(audioRef);
        return url;
    } catch (error) {
        console.error("Error uploading file to Firebase Storage:", error);
        throw error;
    }
};

const fetchAudio = async (fileUrl: string) => {
    try {
        const url = await getDownloadURL(ref(FIREBASE_STORAGE, fileUrl));
        const { dirs } = RNFetchBlob.fs;
        const path = `${dirs.CacheDir}/tempAudio.m4a`;
        const res = await RNFetchBlob.config({
            fileCache: true,
            path: path
        }).fetch('GET', url);
        console.log('The file is saved to:', res.path());
        return res.path();
    } catch (error) {
        console.error("Error downloading audio from Firebase Storage:", error);
        throw error;
    }
};

const uploadAvatar = async (userUid: string, imageUri: string): Promise<string> => {
    const uploadUri = Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;
    const storageRef = ref(FIREBASE_STORAGE, `avatars/${userUid}.jpg`);

    try {
        const response = await fetch(uploadUri);
        const blob = await response.blob();

        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);

        return downloadURL;
    }
    catch (error) {
        console.error("Error uploading avatar from Firebase Storage:", error);
        throw error;
    }
}

const deleteAvatar = async (avatarUrl: string) => {
    const avatarRef = ref(FIREBASE_STORAGE, avatarUrl);

    try {
        await deleteObject(avatarRef);
        console.log('Avatar deletado do Firebase com sucesso');
    } catch (err) {
        const error = err as Error;
        return console.log(error);
    }
}

const fetchAvatar = async (userUid: string) => {
    const storageRef = ref(FIREBASE_STORAGE, `avatars/${userUid}.jpg`);

    try {
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        console.error("Erro ao buscar a URL do avatar: ", error);
        return error;
    }
}

const fetchInstructionsImages = async (selectedOption: 'Paciente' | 'Doutor' | 'Tratamento'): Promise<string[]> => {
    const imageUrls: string[] = [];
    const storageRef = ref(FIREBASE_STORAGE, `instructions/${selectedOption}`);

    try {
        const result = await listAll(storageRef);
        
        for (const itemRef of result.items) {
            const url = await getDownloadURL(itemRef);
            imageUrls.push(url);
        }
        return imageUrls;
    } catch (error) {
        console.error("Erro ao buscar as imagnes de instruções no Firebase:", error);
        throw error;
    }
};

const FirebaseStorageService = {
    uploadAudio,
    fetchAudio,
    uploadAvatar,
    fetchAvatar,
    deleteAvatar,
    fetchInstructionsImages
};



export default FirebaseStorageService;
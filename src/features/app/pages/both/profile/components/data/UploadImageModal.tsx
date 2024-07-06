import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { UseLoading } from '@hooks/loading/UseLoading';
import { UseUploadImageProfile } from '../../hooks/UseUploadImageProfile';
import DefaultLoading from '@components/loading/DefaultLoading';

interface UploadImageModalProps {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    closeModal: () => void;
}

const UploadImageModal: React.FC<UploadImageModalProps> = ({ loading, setLoading, closeModal }) => {
    const { userData, UpdateSpecificDataInUser } = UseForm();
    const { changeImageProfile, removeImageProfile } = UseUploadImageProfile({ updateImgProfile: UpdateSpecificDataInUser, closeModal, setLoading })
    const colorLoading = userData?.type === 'doctor' ? '#1e6569' : '#651e69';
    const colorTitle = { color: userData?.type === 'doctor' ? '#0b5959' : '#631c50' };
    const colorTemplateText = { color: userData?.type === 'doctor' ? '#3e7575' : '#653e75' };

    return (
        <>
            {
                loading ?
                    <DefaultLoading size={30} color={colorLoading} />
                    :
                    <View style={styles.uploadImageMainContainer}>
                        <View style={styles.headerTitle}>
                            <Text style={[styles.title, colorTitle]}>
                                Foto de Perfil
                            </Text>
                        </View>
                        <View style={styles.container}>
                            <View style={styles.iconTemplate}>
                                <LinearGradient colors={userData?.type === 'doctor' ? ['#0b5959', '#4d8999'] : ['#793b82', '#b049c9']} style={styles.iconGradient}>
                                    <TouchableOpacity style={styles.iconButton} onPress={() => changeImageProfile('camera', userData?.avatar)}>
                                        <Ionicons name="camera" size={30} color="white" />
                                    </TouchableOpacity>
                                </LinearGradient>
                                <Text style={[styles.iconText, colorTemplateText]}>Câmera</Text>
                            </View>
                            <View style={styles.iconTemplate}>
                                <LinearGradient colors={userData?.type === 'doctor' ? ['#0b5959', '#4d8999'] : ['#793b82', '#b049c9']} style={styles.iconGradient}>
                                    <TouchableOpacity style={styles.iconButton} onPress={() => changeImageProfile('gallery', userData?.avatar)}>
                                        <Ionicons name="images" size={30} color="white" />
                                    </TouchableOpacity>
                                </LinearGradient>
                                <Text style={[styles.iconText, colorTemplateText]}>Galeria</Text>
                            </View>
                            <View style={[styles.iconTemplate, {opacity: userData?.avatar ? 1 : 0.5}]}>
                                <LinearGradient colors={userData?.type === 'doctor' ? ['#0b5959', '#4d8999'] : ['#793b82', '#b049c9']} style={[styles.iconGradient]}>
                                    <TouchableOpacity disabled={!!!userData?.avatar} style={[styles.iconButton]} onPress={() => removeImageProfile(userData?.avatar)}>
                                        <MaterialCommunityIcons name="trash-can-outline" size={30} color="white" />
                                    </TouchableOpacity>
                                </LinearGradient>
                                <Text style={[styles.iconText, colorTemplateText]}>Remover</Text>
                            </View>
                        </View>

                    </View>
            }
        </>
    );
};

const styles = StyleSheet.create({
    uploadImageMainContainer: {
        width: '100%',
        height: '100%',
        padding: 20,
        gap: 30,
    },
    headerTitle: {
        width: '100%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 20
    },
    iconTemplate: {
        alignItems: 'center',
        gap: 5,
    },
    iconGradient: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    iconButton: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {

    },
});


export default UploadImageModal;
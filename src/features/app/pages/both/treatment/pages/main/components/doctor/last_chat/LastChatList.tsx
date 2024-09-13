import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { TreatmentState, UseTreatment } from '@features/app/providers/sub/TreatmentProvider';
import TemplateChatUser from '../../both/TemplateChatUser';
import { UserData } from 'types/user/User_Types';
import images from '@assets/images';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface LastChatProps {
    handleActiveChat: (other_members: TreatmentInfoTemplate) => void
    userData?: UserData;
    treatment_state: TreatmentState;
}

function LastChatList({ handleActiveChat, userData, treatment_state }: LastChatProps) {
    
    const iconSize = responsiveSize * 0.16;

    return (
        <>
            {
                treatment_state.treatments.length !== 0 ?
                    treatment_state.treatments.map((treatment) => (
                        <TemplateChatUser key={treatment._id} treatment={treatment} userData={userData} handleActiveChat={handleActiveChat} />
                    ))
                    :
                    <View style={{ width: '100%', height: screenHeight * 0.3, alignItems: 'center', marginTop: 40, justifyContent: 'center', display: 'flex',  gap: 10 }}>
                        <MaterialIcons name="message" size={iconSize} color="rgba(117, 143, 156, 1)" />
                        <Text style={{ fontSize: 16, fontWeight: '600', maxWidth: '70%',  color: '#3a6c70', textAlign: 'center', marginTop: '2%' }}>Não há conversas disponíveis no momento...</Text>
                    </View>
            }
        </>
    )
}

export default LastChatList;
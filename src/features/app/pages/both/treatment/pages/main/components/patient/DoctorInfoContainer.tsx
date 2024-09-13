import React from 'react';
import { View, Text, Image } from 'react-native';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';
import DoctorAdditionalData from './DoctorAdditionalData';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveSize } from '@utils/layout/Screen_Size';

interface DoctorInfoContainerProps {
    currentTreatment?: TreatmentInfoTemplate;
    treatmentIconSize: number;
}

const DoctorInfoContainer: React.FC<DoctorInfoContainerProps> = ({ currentTreatment, treatmentIconSize }) => {
    const iconRestrictionSize = responsiveSize * 0.15;

    return (
        <View style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 20 }}>
            <View style={{ backgroundColor: 'rgba(114, 54, 98, 0.16)', borderRadius: 5, padding: '2%', flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                <View style={{
                    width: treatmentIconSize,
                    height: treatmentIconSize,
                    backgroundColor: '#8b3b7c',
                    borderRadius: treatmentIconSize,
                    overflow: 'hidden', elevation: 5,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <MaterialIcons name={'health-and-safety'} size={treatmentIconSize * 0.7} color={'white'} />
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, color: '#4d2032', fontWeight: '800' }}>{`Doutor${currentTreatment?.gender === 'Feminino' ? 'a' : ''}`}</Text>
                    <Text style={{ fontSize: 17, color: '#842d87', fontWeight: '600' }}>{currentTreatment?.name}</Text>
                    {
                        !currentTreatment?.private_treatment &&
                        <Text style={{ fontSize: 15, color: 'rgba(120, 58, 90, 0.9)' }}>{currentTreatment?.email}</Text>
                    }
                </View>
            </View>
            <View style={{ backgroundColor: 'rgba(114, 54, 98, 0.16)', paddingHorizontal: '2%', paddingVertical: '5%', flexDirection: 'column', width: '100%', justifyContent: 'space-between', gap: 20, borderRadius: 5, }}>
                {
                    currentTreatment?.private_treatment ?
                        <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center' }}>
                            <LinearGradient
                                colors={['#282340', '#7078b3']}
                                style={[{
                                    width: iconRestrictionSize,
                                    height: iconRestrictionSize,
                                    borderRadius: iconRestrictionSize / 2,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }]}
                            >
                                <MaterialCommunityIcons name={"shield-lock"} size={iconRestrictionSize * 0.6} color="white" />
                            </LinearGradient>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 18, fontWeight: '700', color: '#4b6080' }}>{`S${currentTreatment.gender === 'Feminino' ? 'ua' : 'eu'} doutor${currentTreatment.gender === 'Feminino' ? 'a' : ''} restringiu o perfil`}</Text>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 13, color: 'rgba( 92, 65, 92, 0.7)' }}>
                                        {
                                            `${currentTreatment.name ? currentTreatment.name.split(' ')[0] : "Usuário"} restringiu o perfil. As informações pessoais estão restritas.`
                                        }
                                    </Text>
                                </View>
                            </View>
                        </View>
                        :
                        <View style={{ flex: 1, gap: 10 }}>
                            <DoctorAdditionalData
                                title="Data de nascimento"
                                data={currentTreatment?.birth}
                                type="birth"
                            />
                            <DoctorAdditionalData
                                title="Telefone"
                                data={currentTreatment?.phone}
                                type="phone"
                            />
                            <DoctorAdditionalData
                                title="Gênero"
                                data={currentTreatment?.gender}
                                type="gender"
                            />
                        </View>

                }
            </View>
        </View>
    );
};

export default DoctorInfoContainer;
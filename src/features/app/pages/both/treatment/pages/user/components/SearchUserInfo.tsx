import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FormatISOToStringDate } from '@utils/date/DateFormatting';
import { SearchUserData } from 'types/treatment/Search_Types';
import LinearGradient from 'react-native-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FormatToPhoneNumber } from '@utils/user/DataFormatting';

interface SearchUserInfoProps {
    selectedUser: SearchUserData;
    userType?: string;
    iconInfoSize: number;
    iconTreatmentUserSize: number;
    iconRestrictionSize: number;
    treatmentUserIcon: any;
    iconSearchEmail: any;
    iconSearchBirth: any;
    iconSearchGender: any;
    iconSearchPhone: any;
    iconTreatments: any;
    handlePress: () => void;
}

const SearchUserInfo = ({
    selectedUser,
    userType,
    iconInfoSize,
    iconTreatmentUserSize,
    treatmentUserIcon,
    iconSearchEmail,
    iconSearchBirth,
    iconSearchGender,
    iconSearchPhone,
    iconTreatments,
    iconRestrictionSize,
    handlePress }: SearchUserInfoProps) => {


    return (
        <View style={styles.SearchUserInfoTreatment_View}>
            {
                selectedUser.private ?
                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10, backgroundColor: 'rgba(229, 228, 237, 0.1)', borderRadius: 15, }}>
                        <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center', }}>
                            <LinearGradient
                                colors={['#282340', '#7078b3']}
                                style={[styles.restrictionContainer, { width: iconRestrictionSize, height: iconRestrictionSize, borderRadius: iconRestrictionSize / 2 }]}
                            >
                                <MaterialCommunityIcons name={"shield-lock"} size={iconRestrictionSize * 0.6} color="white" />
                            </LinearGradient>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 18, fontWeight: '700', color: 'white' }}>{`Este perfil é privado`}</Text>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 13, color: 'rgba( 255, 255, 255, 0.6)' }}>
                                        {
                                            `${selectedUser.name ? selectedUser.name.split(' ')[0] : "Usuário"} restringiu o perfil. As informações pessoais estão restritas.`
                                        }
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    :
                    <View style={{ width: '100%', gap: 20, }}>
                        <View style={{ width: '100%' }}>
                            <Text style={{ fontSize: 18, paddingBottom: 15, color: 'rgba(255, 255, 255, 0.8)' }}>
                                {`Informações de contato`}
                            </Text>
                            <View style={styles.SearchUserInfoTemplateContainer}>
                                <Image style={{ width: iconInfoSize, height: iconInfoSize }} source={iconSearchEmail} />
                                <View>
                                    <Text style={styles.searchUserTextTemplate}>
                                        {selectedUser.email}
                                    </Text>
                                    <Text style={styles.searchTextDefinition}>
                                        {"E-mail"}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.SearchUserInfoTemplateContainer}>
                                <Image style={{ width: iconInfoSize, height: iconInfoSize }} source={iconSearchPhone} />
                                <View>
                                    <Text style={styles.searchUserTextTemplate}>
                                        {selectedUser.phone ? FormatToPhoneNumber(selectedUser.phone) : "Não informado"}
                                    </Text>
                                    <Text style={styles.searchTextDefinition}>
                                        {"Telefone"}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ width: '100%', }}>
                            <Text style={{ fontSize: 18, paddingBottom: 15, color: 'rgba(255, 255, 255, 0.8)' }}>
                                {`Informações básicas`}
                            </Text>
                            <View style={styles.SearchUserInfoTemplateContainer}>
                                <Image style={{ width: iconInfoSize, height: iconInfoSize }} source={iconSearchBirth} />
                                <View>
                                    <Text style={styles.searchUserTextTemplate}>
                                        {selectedUser.birth ? FormatISOToStringDate(selectedUser.birth) : "Não informado"}
                                    </Text>
                                    <Text style={styles.searchTextDefinition}>
                                        {"Data de nascimento"}
                                    </Text>
                                </View>

                            </View>
                            <View style={styles.SearchUserInfoTemplateContainer}>
                                <Image style={{ width: iconInfoSize, height: iconInfoSize }} source={iconSearchGender} />
                                <View>
                                    <Text style={styles.searchUserTextTemplate}>
                                        {selectedUser.gender ? selectedUser.gender : "Não informado"}
                                    </Text>
                                    <Text style={styles.searchTextDefinition}>
                                        {"Gênero"}
                                    </Text>
                                </View>

                            </View>
                        </View>
                    </View>

            }
            {
                selectedUser.total_treatments ?
                    <View style={styles.SearchUserInfoTemplateContainer}>
                        <Image style={{ width: iconInfoSize, height: iconInfoSize }} source={iconTreatments} />
                        <TouchableOpacity activeOpacity={0.6} onPress={handlePress} style={styles.treatmentButton}>
                            <Text style={styles.treatmentName}>
                                {selectedUser.total_treatments && "Tratamentos"}
                            </Text>
                            <View style={styles.treatmentList}>
                                {
                                    selectedUser.total_treatments && (
                                        selectedUser.total_treatments.map((treatment, index) => (
                                            <View key={index} style={styles.treatmentItem}>
                                                {
                                                    <Image
                                                        style={{
                                                            height: iconTreatmentUserSize,
                                                            width: iconTreatmentUserSize,
                                                            borderRadius: iconTreatmentUserSize,
                                                            borderWidth: 1,
                                                            borderColor: '#f5f2fa'
                                                        }}
                                                        source={treatment.avatar ? { uri: treatment.avatar } : treatmentUserIcon}
                                                    />}
                                            </View>
                                        ))
                                    )
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                    : ""
            }
        </View>
    );
};

const styles = StyleSheet.create({
    SearchUserInfoTreatment_View: {
        width: '100%',
        flex: 1,
        paddingVertical: 10,
        gap: 15
    },
    SearchUserInfoTemplateContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.3)'
    },
    searchUserTextTemplate: {
        fontSize: 15,
        color: 'rgba(197, 203, 209, 0.9)',
    },
    searchTextDefinition: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.4)'
    },
    treatmentButton: {
        paddingVertical: '2%',
        paddingHorizontal: '4%',
        borderRadius: 10,
        flex: 1,
        backgroundColor: 'rgba(40, 26, 46, 0.3)',
    },
    treatmentName: {
        color: 'white',
        fontSize: 12,
        marginBottom: '3%',
    },
    treatmentList: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 5,
        width: '100%',
        overflow: 'hidden',
    },
    treatmentItem: {
        alignItems: 'center',
    },
    restrictionContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default SearchUserInfo;
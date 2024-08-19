import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import CustomTextInput from '@components/text_input/CustomInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import images from '@assets/images';
import { screenHeight } from '@utils/layout/Screen_Size';
import { MedicationFormType } from 'types/app/patient/health/Medicine_Types';

const pill = images.app_patient_images.health.medicines.medicine_pill_type;
const capsule = images.app_patient_images.health.medicines.medicine_capsule_type;
const liquid = images.app_patient_images.health.medicines.medicine_liquid_type;

const medicationTypes = [
    { name: "Comprimido", icon: pill },
    { name: "Cápsula", icon: capsule },
    { name: "Líquido", icon: liquid }
];

interface MedicationInfoProps {
    form: MedicationFormType;
    handleInputChange: (field: keyof MedicationFormType, value: string) => void;
    suggestions?: string[];
    setSuggestions: (suggestions: string[] | undefined) => void;
    loading: boolean;
    dosageUnits: Record<string, string>;
    handleSuggestionSelection: (value: string) => void;
    sessionIconSize: number;
}

const MedicationInfo: React.FC<MedicationInfoProps> = ({
    form, handleInputChange,
    suggestions, setSuggestions,
    loading, dosageUnits, handleSuggestionSelection,
    sessionIconSize
}) => {
    const styles = medicationInfoStyle(sessionIconSize);

    return (
        <View style={styles.medicationCharacteristics}>
            <View style={styles.sessionIconContainer}>
                <MaterialIcons name="medication" size={sessionIconSize / 2} color="white" />
            </View>
            <View style={styles.infoTemplate}>
                <View style={styles.infoTitleContainer}>
                    <Text style={styles.infoTitle}>Nome do Medicamento</Text>
                </View>

                <CustomTextInput
                    editable={!loading}
                    viewStyle={[styles.viewInput, { opacity: loading ? 0.6 : 1 }]}
                    inputStyle={styles.input}
                    value={form.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                    placeholder="Nome"
                    maxLength={35}
                    backgroundColor='#fcf7fa'
                />
                {form.name !== "" && suggestions && suggestions?.length !== 0 && !loading && (
                    <View style={styles.suggestionsContainer}>
                        <ScrollView nestedScrollEnabled style={{ flex: 1, paddingHorizontal: '5%' }}>
                            {suggestions.map((suggestion, index) => (
                                <TouchableOpacity key={index} style={[styles.suggestionItem, { backgroundColor: form.name === suggestion ? '#faf0fa' : 'transparent' }]} onPress={() => handleSuggestionSelection(suggestion)}>
                                    <Text>{suggestion}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <LinearGradient colors={['#7f3b8f', '#733966']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} style={styles.suggestionsGradient}>
                            <TouchableOpacity onPress={() => setSuggestions(undefined)}>
                                <MaterialIcons name="check" size={28} color="white" />
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                )}
            </View>
            <View style={styles.infoTypeTemplate}>
                <View style={styles.infoTitleContainer}>
                    <Text style={styles.infoTitle}>Tipo de Medicamento</Text>
                </View>

                <View style={styles.typesContainer}>
                    {medicationTypes.map((medType) => (
                        <TouchableOpacity
                            key={medType.name}
                            disabled={loading}
                            style={[styles.typeButton, { opacity: loading ? 0.6 : 1 }, form.type === medType.name && styles.selectedTypeButton]}
                            onPress={() => handleInputChange('type', medType.name)}
                        >
                            <View style={styles.typeIcon}>
                                <Image source={medType.icon} style={{ width: '100%', height: '100%', resizeMode: 'contain', tintColor: form.type === medType.name ? 'white' : '#872d6f' }} />
                            </View>
                            <Text style={[styles.typeButtonText, { color: form.type === medType.name ? 'white' : '#501d52' }]}>{medType.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={styles.infoTemplate}>
                <View style={styles.infoTitleContainer}>
                    <Text style={styles.infoTitle}>Dosagem</Text>
                </View>

                <View style={styles.dosageContainer}>
                    <CustomTextInput
                        editable={!loading}
                        viewStyle={[styles.viewInput, { opacity: loading ? 0.6 : 1 }]}
                        inputStyle={styles.input}
                        value={form.dosage}
                        onChangeText={(text) => handleInputChange('dosage', text)}
                        placeholder="Dosagem"
                        backgroundColor='#fcf7fa'
                        keyboardType={'number-pad'}
                        maxLength={4}
                    />
                    <View style={[styles.dosageUnit, { opacity: loading ? 0.6 : 1 }]}>
                        <Text style={styles.dosageUnitText}>
                            {form.type ? dosageUnits[form.type] : 'unidade'}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default MedicationInfo;

const medicationInfoStyle = (sessionIconSize: number) => {

    return StyleSheet.create({
        medicationCharacteristics: {
            backgroundColor: '#fcf5fc',
            paddingVertical: '6%',
            justifyContent: 'space-between',
            paddingHorizontal: '8%',
            borderRadius: 20,
            flex: 1,
            marginVertical: '6%',
        },
        sessionIconContainer: {
            backgroundColor: '#a468b3',
            position: 'absolute',
            top: - sessionIconSize * 0.65,
            left: '3%',
            height: sessionIconSize,
            width: sessionIconSize,
            borderRadius: sessionIconSize,
            alignItems: 'center',
            justifyContent: 'center'
        },
        infoTemplate: {
            marginVertical: '5%',
        },
        viewInput: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: '4%',
            borderColor: '#a541b0',
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: '5%',
            flex: 1,
        },
        input: {
            fontSize: 16,
            color: '#5b1869',
        },
        infoTypeTemplate: {
            flex: 1,
            marginBottom: '5%',
        },
        infoTitleContainer: {
            width: '100%',
            flexDirection: 'row',
            gap: 5,
            marginBottom: '2%'
        },
        infoTitle: {
            fontSize: 15,
            fontWeight: '600',
            color: '#631c50',
            marginBottom: '2%',
        },
        typesContainer: {
            flexDirection: 'row',
            height: screenHeight * 0.2,
            gap: 5,
        },
        typeButton: {
            flex: 1,
            padding: '4%',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#631c50',
            backgroundColor: '#efe1f2',
        },
        selectedTypeButton: {
            backgroundColor: '#692d66',
            borderColor: '#e49af5',
            width: '100%',
        },
        typeButtonText: {
            marginTop: '3%',
            fontSize: 12,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        typeIcon: {
            flex: 1,
            padding: '14%',
        },
        dosageContainer: {
            width: '100%',
            flexDirection: 'row',
        },
        dosageUnit: {
            width: '35%',
            borderColor: '#a541b0',
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: '2%',
            marginLeft: '2%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fcf7fa',
        },
        dosageUnitText: {
            fontSize: 14,
            fontWeight: 'bold',
            color: '#a541b0',
        },
        suggestionsContainer: {
            flex: 1,
            position: 'absolute',
            width: '100%',
            bottom: '-250%',
            borderTopRightRadius: 5,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            height: '250%',
            backgroundColor: 'white',
            elevation: 10,
            zIndex: 2,
            overflow: 'hidden',
        },
        suggestionItem: {
            paddingVertical: '3%',
            borderBottomWidth: 1,
            borderColor: '#8f798c',
            paddingHorizontal: '2%',
        },
        suggestionsGradient: {
            width: '100%',
            height: '25%',
            paddingHorizontal: '5%',
            justifyContent: 'center',
            alignItems: 'flex-end',
        },
    });
}
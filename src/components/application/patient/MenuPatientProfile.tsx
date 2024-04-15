import React from 'react';
import { View, Dimensions, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ProfilePatientFunctions } from '../options/ProfileOptionFuntions';

//retorna as dimensões do dispositivo 
import { screenHeight, screenWidth } from '../../screen_size/Screen_Size';
import { UseAuth } from '../../../contexts/AuthContext';
import { UseForm } from '../../../contexts/FormContext';
import { UseAuthentication } from '../../../services/auth/AuthenticationServices';

interface ProfilePatientProps {
  name: string;
  icon: any;
  profile_function: (data: any) => void;
  profile_params: object | undefined;
}

const ProfileOption = ({ name, icon, profile_function, profile_params }: ProfilePatientProps) => (
  <View style={styleprofile.profileOptions_View}>
    <TouchableOpacity style={styleprofile.profileOption_Button} onPress={() => profile_function(profile_params)}>
      <View style={styleprofile.profileOption_View}>
        <Image
          source={icon}
          style={styleprofile.profileOption_Icon}
        />
        <Text style={styleprofile.profileOption_Text}>{name}</Text>
      </View>
      <Image
        source={require('../../../assets/divisa_normal.png')}
        style={styleprofile.profileDivisa_Icon}
      />
    </TouchableOpacity>
  </View>
);


const Patient_Profile = () => {

  const { signOut, authData } = UseAuth();
  const { formData } = UseForm();
  const { LogoutUser } = UseAuthentication();

  const profileFunctions = new ProfilePatientFunctions({LogoutUser});

  const profileOptions = [
    { name: 'Notificações', icon: require('../../../assets/app_patient/profile/profileIcon_notifications.png'), function: profileFunctions.handleNotifications, params: undefined},
    { name: 'Senha e Segurança', icon: require('../../../assets/app_patient/profile/profileIcon_safety.png'), function: profileFunctions.handleSecurity, params: undefined},
    { name: 'Acessibilidade', icon: require('../../../assets/app_patient/profile/profileIcon_accessibility.png'), function: profileFunctions.handleAccebility, params: undefined},
    { name: 'Permissões do App', icon: require('../../../assets/app_patient/profile/profileIcon_permissions.png'), function: profileFunctions.handlePermissions, params: undefined},
    { name: 'Política de Privacidade', icon: require('../../../assets/app_patient/profile/profileIcon_privacy.png'), function: profileFunctions.handlePolicyPrivacy, params: undefined},
    { name: 'Contrato do Usuário', icon: require('../../../assets/app_patient/profile/profileIcon_contract.png'), function: profileFunctions.handleContractUser, params: undefined},
    { name: 'Suporte', icon: require('../../../assets/app_patient/profile/profileIcon_support.png'), function: profileFunctions.handleSupport, params: undefined},
    { name: 'Sobre', icon: require('../../../assets/app_patient/profile/profileIcon_about.png'), function: profileFunctions.handleAbout, params: undefined},
    { name: 'Sair', icon: require('../../../assets/app_patient/profile/profileIcon_logout.png'), function: profileFunctions.handleLogout, params: {tokens: {accessToken: authData.accessToken, refreshToken: authData.refreshToken} ,type: authData.type }},
  ];

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styleprofile.screen_Profile}>
        <LinearGradient colors={['#631c50', '#b049c9', 'rgba(191, 143, 179, 0.1)']} style={styleprofile.header_Profile}>
          <View style={styleprofile.account_View}>
            <TouchableOpacity style={styleprofile.account_Button}>
              <Image
                source={require('../../../assets/app_patient/profile/user_profile_icon.png')}
                style={styleprofile.account_Image}
              />
            </TouchableOpacity>

            <View style={styleprofile.accountUser_View}>
              <LinearGradient colors={['#e384c2', '#c62cd1', '#9322b3']} style={styleprofile.accountUser_TextBackground}>
                <TouchableOpacity style={styleprofile.accountUser_Button}>
                  <Text style={styleprofile.accountUser_Text}>{formData ? `${formData.name.split(' ')[0]}` : "Usuário"}</Text>
                  <Image
                    source={require('../../../assets/divisa_user.png')}
                    style={styleprofile.accountDivisa_Icon}
                  />
                </TouchableOpacity>
              </LinearGradient>
            </View>

          </View>
        </LinearGradient>

        <View style={styleprofile.menuProfile_View}>

          {profileOptions.map((option, index) => (
            <ProfileOption key={index} name={option.name} icon={option.icon} profile_function={option.function}  profile_params={option.params}/>
          ))}

        </View>

      </View>
    </ScrollView>
  );
};

const styleprofile = StyleSheet.create({
  screen_Profile: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
    paddingBottom: screenHeight * 0.15
  },
  header_Profile: {
    width: screenWidth,
    height: screenHeight * 0.35,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  account_View: {
    display: 'flex',
    height: '100%',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingBottom: 10
  },
  account_Button: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    elevation: 10,
  },
  account_Image: {
    width: '102%',
    height: '102%',
  },
  accountUser_Text: {
    color: 'white',
    fontWeight: '900',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  accountUser_TextBackground: {
    flexDirection: 'row',
    borderRadius: 25,
    alignItems: 'center',

  },
  accountUser_View: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth,
    justifyContent: 'center',

  },
  accountUser_Button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    alignItems: 'center',
    marginLeft: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,

  },
  accountDivisa_Icon: {
    width: 30,
    height: 30,
  },
  menuProfile_View: {
    flex: 1,
    paddingHorizontal: 25,
    flexdirection: 'column',
    marginBottom: 10,
  },
  profileOptions_View: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#e0dcdc',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  profileOption_View: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  profileOption_Button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  profileOption_Icon: {
    width: 35,
    height: 35,
  },
  profileDivisa_Icon: {
    width: 40,
    height: 40,
  },
  profileOption_Text: {
    fontSize: 18,
    color: '#8f326e'
  },


});

export default Patient_Profile;
import React, { useState, useEffect } from 'react';
import { View, Dimensions, FlatList, Text, Image, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { AppStackTypes } from '../../../navigation/stacks/MainStack';
import { useNavigation } from '@react-navigation/native';
import CountNotifications from '../../notifications/components/CountNotifications';

//retorna as dimensões do dispositivo 
import { screenHeight, screenWidth } from '../../../utils/layout/Screen_Size';
import { UseForm } from '../../../providers/UserProvider';
import { MenuTypes, UseMenu } from '../../../providers/MenuProvider';
import { UseHealthPage } from '../../../providers/HealthProvider';

const Patient_Home = () => {
  const navigation = useNavigation<AppStackTypes>();
  const { formData } = UseForm();
  const [progress, setProgress] = useState(75); //progresso inicial

  const { handleMenuOptionPress } = UseMenu();
  const { handleCurrentHealthPage } = UseHealthPage();

  const [medicamentos, setMedicamentos] = useState(
    [
      { nome: 'Medicamento 1', info_dose: '20ml', info_hour: 'H: 09:00' },
      { nome: 'Medicamento 2 ', info_dose: '1 pílula', info_hour: 'H: 13:00' },
      { nome: 'Medicamento 3 ', info_dose: '2 pílulas', indo_hour: 'H: 21:00' }
    ]
  )
  /*
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1;
        if (newProgress >= 70) {
          clearInterval(interval);
        }

        return newProgress;
      })
    }, 60);

    return () => {
      clearInterval(interval);
    };
  }, []);*/

  const handleStackNotifications = () => {
    navigation.navigate('notifications');
  }

  const renderMedicamento = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity style={stylehome.medicineCurrentAdd_Button}>
        <View style={stylehome.medicineCurrentAdd_View}>
          <Image
            source={require('../../../assets/med2.png')}
            style={stylehome.medicineCurrentAdd_Image}
          />
          <View style={stylehome.medicineCurrentAdd_ViewName}>
            <Text style={stylehome.medicineCurrentAdd_Name}>{item.nome}</Text>
            <View style={stylehome.medicineCurrentAdd_ViewInfo}>
              <Text style={stylehome.medicineCurrentAdd_TextInfo1}>{item.info_dose}</Text>
              <Text style={stylehome.medicineCurrentAdd_TextInfo2}>{item.info_hour}</Text>
            </View>
          </View>


        </View>
      </TouchableOpacity>
    )
  }

  const handleGoToOption = (option: MenuTypes, page: string | undefined) => {
    handleMenuOptionPress(option);
    if (option === "healthScreen" && page) {
      handleCurrentHealthPage(page);
      console.log(page);
    }
  }


  return (
    <ScrollView>
      <LinearGradient colors={['#fcf7fc', '#e2bee6']} style={stylehome.screen_Home}>
        <ImageBackground
          source={require('../../../assets/home_Title.png')}
          style={stylehome.backgroundImage_HomeTitle}
        >
          <View style={stylehome.title_View}>

            <Text style={stylehome.title_Text}>{`Bem-vindo,\n${formData && formData.name ? (formData.name).split(' ')[0] : "Usuário"}!`}</Text>
            <TouchableOpacity onPress={() => handleStackNotifications()} style={stylehome.notify_Button}>
              <Image
                source={require('../../../assets/icon_notification.png')}
                style={stylehome.icon_Notification}
              />
              <CountNotifications/>
            </TouchableOpacity>
          </View>
        </ImageBackground>


        <View style={stylehome.questions_View}>
          <ImageBackground
            source={require('../../../assets/questionario.png')}
            style={stylehome.backgroundImage_Questions}
          >
            <View style={stylehome.desempenho_View}>
              <Text style={stylehome.desempenho_Text}>
                Seu Desempenho
              </Text>

            </View>

            <View style={stylehome.statistics_View}>

              <View style={stylehome.statisticsQuestions_View}>
                <AnimatedCircularProgress
                  size={140}
                  width={30}
                  rotation={0}
                  fill={progress}
                  tintColor="#bc32d1"
                  onAnimationComplete={() => []}
                  backgroundColor="#b09bc2"
                >
                  {(fill) => (
                    <Text style={stylehome.percentageQuestions_Text}>{`${Math.round(fill)}%`}</Text>
                  )}
                </AnimatedCircularProgress>

              </View>
              <LinearGradient colors={['#b462e3', '#6d1370']} style={stylehome.infoQuestions_View}>
                <TouchableOpacity onPress={() => handleGoToOption("healthScreen", "Questionários")} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={stylehome.statisticsQuestions_Text}>Questionários Respondidos</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </ImageBackground>
        </View>


        <View style={stylehome.container_View}>
          <View style={stylehome.medicines_View}>
            <ImageBackground
              source={require('../../../assets/pills_Background.png')}
              style={stylehome.backgroundImage_Telefone}
            >
              <Text style={stylehome.pillsAlert_Title}>Seus Remédios</Text>
              <View style={stylehome.pillsAlert_View}>
                <Text style={stylehome.pillsAlert_Text}>Próxima notificação:</Text>
                <Text style={stylehome.pillsAlertHour_Text}>00h:20m:05s</Text>
              </View>
              <Image
                source={require('../../../assets/pills_Icon.png')}
                style={stylehome.iconImage_Pills}
              />
            </ImageBackground>
          </View>

          <View style={stylehome.call_View}>
            <ImageBackground
              source={require('../../../assets/telefone_Background.png')}
              style={stylehome.backgroundImage_Telefone}
            >
              <Text style={stylehome.telefoneCall_Title}>Precisa de ajuda?</Text>
              <View style={stylehome.telefoneCall_View}>
                <Text style={stylehome.telefoneCall_Text}>Ligue agora para CVV </Text>
                <LinearGradient colors={['#b462e3', '#6d1370']} style={stylehome.telefoneCall_Linear}>
                  <TouchableOpacity onPress={() => handleGoToOption("healthScreen", "Call")} style={stylehome.telefoneCall_Button}>
                    <Text style={stylehome.telefoneCall_TextButton}>CALL</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
              <Image
                source={require('../../../assets/telefone_Icon.png')}
                style={stylehome.iconImage_Telefone}
              />
            </ImageBackground>

          </View>
        </View>

        <View style={stylehome.medSection_View}>
          <ImageBackground
            source={require('../../../assets/medicamentos.png')}
            style={stylehome.backgroundImage_Medicamentos}
          >

            <View style={stylehome.currentMed_View}>
              <Text style={stylehome.currentMed_Title}>Medicamentos Adicionados</Text>

              <TouchableOpacity onPress={() => handleGoToOption("healthScreen", "Medicamentos")} style={stylehome.currentMed_Button}>
                <Text style={stylehome.visualize_Text}>Visualizar</Text>
              </TouchableOpacity>
            </View>

            <View style={stylehome.medicinesAdd_View}>
              <FlatList
                style={stylehome.medicinesAdd_FlatList}
                data={medicamentos}
                renderItem={renderMedicamento}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
              />
            </View>
          </ImageBackground>
        </View>

        <View style={stylehome.view_Menu}>

        </View>

      </LinearGradient>
    </ScrollView>
  );
};

const stylehome = StyleSheet.create({
  screen_Home: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  view_Menu: {
    height: screenHeight * 0.14
  },
  backgroundImage_HomeTitle: {
    width: screenWidth,
    height: screenHeight * 0.3,

  },
  title_View: {
    width: screenWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: screenHeight * 0.06,
    paddingHorizontal: screenWidth * 0.07,
  },
  title_Text: {
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'white',
    top: 20,

  },
  notify_Button: {
    paddingTop: screenHeight * 0.02
  },
  icon_Notification: {
    width: 37,
    height: 37,
  },
  questions_View: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
    width: screenWidth * 0.95,
    height: screenHeight * 0.3,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,

  },
  backgroundImage_Questions: {
    width: screenWidth,
    height: screenHeight * 0.3,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  desempenho_View: {
    marginLeft: 20,
    paddingTop: 20,
    width: screenWidth * 0.4,
    height: screenHeight * 0.25,

  },
  desempenho_Text: {
    fontWeight: '800',
    textTransform: 'uppercase',
    fontSize: 18,
    color: '#b347ad',

  },
  infoQuestions_View: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '20%',
    width: screenWidth * 0.4,
    borderRadius: 20,
    marginLeft: 23,

  },
  infoQuestions_Text: {
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',

  },
  statistics_View: {
    width: screenWidth * 0.52,
    height: '100%',
    borderBottomLeftRadius: 70,
  },
  statisticsQuestions_View: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '70%',
    marginTop: 10

  },
  statisticsQuestions_Text: {
    fontSize: 14,
    fontWeight: '300',
    color: 'white',
    textAlign: 'center'
  },
  percentageQuestions_Text: {
    fontWeight: '900',
    fontSize: 24,
    color: '#a055cf'
  },
  container_View: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: screenWidth * 0.95,
    height: screenHeight * 0.2,

  },
  medicines_View: {
    overflow: 'hidden',
    flexDirection: 'column',
    backgroundColor: '#fff2ff',
    width: screenWidth * 0.455,
    height: screenHeight * 0.2,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backgroundImage_Telefone: {
    width: screenWidth * 0.5,
    height: screenHeight * 0.2,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  iconImage_Telefone: {
    width: screenWidth * 0.25,
    height: screenHeight * 0.1,
    bottom: 0,
    position: 'absolute',
    right: 11,

  },
  iconImage_Pills: {
    position: 'absolute',
    width: screenWidth * 0.25,
    height: screenHeight * 0.1,
    bottom: 0,
    right: 5
  },
  pillsAlert_Title: {
    fontWeight: '800',
    textTransform: 'uppercase',
    fontSize: 16,
    color: '#b347ad',
    marginLeft: 20
  },
  pillsAlert_View: {
    width: '100%',
    marginTop: 10,
    height: screenHeight * 0.1,

  },
  pillsAlert_Text: {
    fontSize: 15,
    paddingLeft: 10,
    color: 'purple'
  },
  pillsAlertHour_Text: {
    fontSize: 15,
    paddingLeft: 10,
    fontWeight: '300'
  },
  call_View: {
    overflow: 'hidden',
    backgroundColor: '#fff2ff',
    width: screenWidth * 0.455,
    height: screenHeight * 0.2,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  telefoneCall_View: {
    width: '100%',
    marginTop: 10,
    height: screenHeight * 0.1,
  },
  telefoneCall_Title: {
    fontWeight: '800',
    textTransform: 'uppercase',
    fontSize: 16,
    color: '#b347ad',
    marginLeft: 15
  },
  telefoneCall_Text: {
    fontSize: 15,
    paddingLeft: 10,
    color: 'purple'
  },
  telefoneCall_Button: {
    height: screenHeight * 0.05,
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',


  },
  telefoneCall_Linear: {
    height: screenHeight * 0.05,
    width: '45%',
    borderRadius: 50,
    marginTop: 17,
    marginLeft: 10
  },
  telefoneCall_TextButton: {
    fontSize: 14,
    fontWeight: '300',
    color: 'white'
  },
  medSection_View: {
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: '#fff2ff',
    justifyContent: 'flex-start',
    width: screenWidth * 0.95,
    height: screenHeight * 0.25,
    marginTop: 20,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backgroundImage_Medicamentos: {
    width: screenWidth * 0.95,
    height: screenHeight * 0.12,

  },
  currentMed_View: {
    width: screenWidth * 0.95,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,


  },
  currentMed_Button: {
    marginTop: 10,

  },
  currentMed_Title: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    color: 'white',
    marginTop: 10
  },
  visualize_Text: {
    color: 'white',
    fontSize: 14,
    marginTop: 0,
    marginLeft: 0,
  },
  medicinesAdd_View: {
    overflow: 'scroll',
    flexDirection: 'row',
    width: screenWidth * 0.9,
    height: screenHeight * 0.16,
    backgroundColor: '#fcf7fc',
    marginTop: 6,
    marginLeft: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 2,

  },
  medicinesAdd_FlatList: {
    height: '100%',
    width: '100%',
    margin: 10,

  },
  medicineCurrentAdd_Button: {
    alignItem: 'center',
    justifyContent: 'center',
    width: screenWidth * 0.5
  },
  medicineCurrentAdd_View: {
    width: '100%',
    height: '86%',
    borderWidth: 0.5,
    marginRight: 40,
    flexDirection: 'row'
  },
  medicineCurrentAdd_Image: {
    width: 40,
    height: 90,
    marginLeft: 10
  },
  medicineCurrentAdd_Name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#67107d',
  },
  medicineCurrentAdd_ViewName: {
    height: '100%',
    justifyContent: 'center',
    marginLeft: 10
  },
  medicineCurrentAdd_ViewInfo: {
    marginTop: 5,
    flexDirection: 'row',

  },
  medicineCurrentAdd_TextInfo1: {
    fontSize: 16,
    fontWeight: '300',
    marginRight: 10
  },
  medicineCurrentAdd_TextInfo2: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8f0bb0'
  },


});

export default Patient_Home;
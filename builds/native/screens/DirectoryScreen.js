import * as React from 'react';
import { StyleSheet,  ActivityIndicator, View, Text } from 'react-native';
import { ScrollView, RectButton } from 'react-native-gesture-handler';
import { SplashScreen } from 'expo';
import { Organization } from '../components/Organization';
import Modal from 'react-native-modal';



const axios = require('axios');

let organizationData;

let elementData = [];
let defaultArray = [];


export default function DirectoryScreen(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [elements, setElements] = React.useState();
  const [modalVisible, setModalVisible] = React.useState(false);

  const defaultStyle = { style: {borderColor: 'red', borderWidth: 15, borderHeight: 15}, triggered: false };
  
  const [disabilityServices, setDisabilityServices] = React.useState(defaultStyle);
  const [educational, setEducational] = React.useState(defaultStyle);
  const [shelter, setShelter] = React.useState(defaultStyle);
  const [addictionAssistance, setAddictionAssitance] = React.useState(defaultStyle);
  const [victimAssistance, setVictimAssistance] = React.useState(defaultStyle);
  const [directories, setDirectories] = React.useState(defaultStyle);
  const [medicalAssistance, setMedicalAssistance] = React.useState(defaultStyle);
  const [miscellaneous, setMiscellaneous] = React.useState(defaultStyle);
  const [finances, setFinances] = React.useState(defaultStyle);
  const [communityAndFamily, setCommunityAndFamily] = React.useState(defaultStyle);
  const [seniors, setSeniors] = React.useState(defaultStyle);


  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load the organization data to display

        let response = await axios.get('http://54.208.109.135/organizations');
        
        

        organizationData = JSON.parse(JSON.stringify(response.data));

        
        for(let x = 0; x < organizationData['result'].length; x++) {
          let organization = organizationData['result'][x];

          let tag = organization['tags'][0]['parent'];
    
          elementData.push(<Organization name = {organization['name']} position = {x} icon = {getIconByTag(tag)} description = {organization['description']} website = {organization['website']} phone = {organization['phone']} address = {organization['address']} key = {organization['UUID']}/>)
        }
        
        defaultArray = elementData;
        
        setElements(elementData);
        
      } catch (e) {
        
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if(!isLoadingComplete && !props.skipLoadingScreen) {
    return (
        <ActivityIndicator style = {styles.spinnerStyle} size = "large" color = "#93ab99"/>
    );
  } else {



    return (
      <React.Fragment>
        
        <Modal
            isVisible = {modalVisible}
            onBackdropPress = {() => { setModalVisible(false) }}
            animationIn = "bounceIn"
            backDropOpacity = {1}
            backdropTransitionInTiming = {1000}
            animationInTiming = {1000}
            onSwipeComplete = {() => { setModalVisible(false) }}
            swipeDirection = "right"
            >
              <View style = {styles.modalContent}>
                <View>
                  <RectButton styles = {disabilityServices.style} onPress = {()=>{}}>
                    <View>
                      <Text>
                        Test
                      </Text>
                    </View>
                  </RectButton>
                </View>

              </View>
        </Modal>
        <RectButton style={styles.option} onPress={() => {setModalVisible(true)}}>
            <View>
                <View style = {{alignContent: 'center'}}>
                <Text style={styles.optionText}>Filter By Tag </Text>
                </View>
            </View>
        </RectButton>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {elements}
        </ScrollView>
      </React.Fragment>
    );
  }

}




function getIconByTag(tagString) {

  switch(tagString) {

    case 'Shelter':
      return 'md-home';
    case 'Educational':
      return 'md-school';
    case 'Miscellaneous':
      return 'ios-code-working';
    case 'Community & Family Support':
      return 'ios-people';
    case 'Addiction Assistance':
      return 'ios-wine';
    case 'Victim Assistance':
      return 'ios-body';
    case 'Disability Services':
      return 'ios-eye-off'
    case 'Finances':
      return 'ios-podium'
    case 'Medical Assistance':
      return 'ios-medical'
    case 'Resource Directories':
      return 'ios-paper'
    case 'Seniors':
      return 'ios-medal'
    case 'N/A':
      return 'ios-help'

  }

}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    paddingTop: 15,
  },

  option: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    backgroundColor: '#e3dfde'
  },

  optionText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 1,
    color: '#3a3a3a'
  },
  modalContent: {

    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  }
});

import * as React from 'react';
import { StyleSheet,  ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SplashScreen } from 'expo';
import { Organization } from '../components/Organization';

const axios = require('axios');

let organizationData;

let elements = [];

export default function DirectoryScreen(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

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
    
          elements.push(<Organization name = {organization['name']} position = {x} icon = {getIconByTag(tag)} description = {organization['description']} website = {organization['website']} phone = {organization['phone']} address = {organization['address']} key = {organization['UUID']}/>)
        }

        
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

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {elements}
      </ScrollView>
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
  }
});

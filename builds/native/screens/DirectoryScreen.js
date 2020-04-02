import * as React from 'react';
import { StyleSheet,  ActivityIndicator, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SplashScreen } from 'expo';
import { Organization } from '../components/Organization';
import { IsolatedSearch } from '../components/IsolatedSearch';



const axios = require('axios');

let organizationData;




export default class DirectoryScreen extends React.Component {

  
  constructor(props) {
    super(props);

    this.state = { isLoadingComplete: false, elements: [] }
  }

  componentDidMount() {
    this.mount();
  }

  mount = async () => {
    try {
      SplashScreen.preventAutoHide();
      let response = await axios.get('http://54.208.109.135/organizations');
      organizationData = JSON.parse(JSON.stringify(response.data));
      
      let elementData = [];
      for(let x = 0; x < organizationData['result'].length; x++) {
        let organization = organizationData['result'][x];

        let parent = organization['tags'][0]['parent'];

  
        elementData.push(<Organization name = {organization['name']} position = {x} icon = {getIconByTag(parent)} description = {organization['description']} website = {organization['website']} phone = {organization['phone']} address = {organization['address']} key = {organization['UUID']}/>)
      }
      elementData.sort((a, b) => {
        return a.props.name > b.props.name;
      });

      let newElementData = [];

      let returns = -1;
      // A method of editing the background displayed on each row. I tried directly editng the value per the documentation, but it never worked and this doesn't impact the load time
      elementData.map((item) => {
        returns++;
        newElementData.push(<Organization name = {item.props.name} position = {returns} icon = {item.props.icon} description = {item.props.description} website = {item.props.website} phone = {item.props.phone} address = {item.props.address} key = {returns}/>)
      });

      this.setState({isLoadingComplete: true, elements: newElementData})
      SplashScreen.hide();
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    if(!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
          <ActivityIndicator style = {styles.spinnerStyle} size = "large" color = "#93ab99"/>
      );
    } else {
  
  
  
      return (
        <React.Fragment>
          
  
          <IsolatedSearch placeholder = "Search" navigator = {this.props.navigation.navigate} orgData = {organizationData} getIconByTag = {getIconByTag}/>
  
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {this.state.elements}
          </ScrollView>
        </React.Fragment>
      );
    }
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
  contentContainer: {
    paddingTop: 15,
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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

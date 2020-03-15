import * as React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
 import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { SplashScreen } from 'expo';
import Modal from 'react-native-modal';

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

class Organization extends React.Component {
  constructor(props) {
    super(props);

    this.state = { rowColor: {}, modalVisible: false, website: null,  websiteStyle: { color: 'blue' }, websitePress: null };

    if(this.props.position % 2 == 0) {
      this.state.rowColor = {backgroundColor: '#e8e8e8'}
    } else {
      this.state.rowColor = {backgroundColor: '#fdfdfd'}
    }

    if(this.props.website == "N/A") { 
      this.state.websiteStyle = {color: 'black'}; this.state.websitePress = () => {};
      this.state.website = "N/A"
    }
    else if(this.props.website.length > 16) { 
      this.state.website = "Link"
      this.state.websitePress = () => { WebBrowser.openBrowserAsync(this.props.website)}
    }
    else {
      this.state.website = this.props.website;
      this.state.websitePress = () => { WebBrowser.openBrowserAsync(this.props.website)}
    }

  
  }

  setModalVisible() {
    this.setState({ rowColor: this.state.rowColor, modalVisible: true, website: this.state.website,  websiteStyle: this.state.websiteStyle, websitePress: this.state.websitePress });
  }

  render() {
    return(

      <React.Fragment>
          <Modal
              isVisible = {this.state.modalVisible}
              onBackdropPress = {() => { this.setState({rowColor: this.state.rowColor, modalVisible: false, website: this.state.website, websiteStyle: this.state.websiteStyle })}}
              animationIn = "bounceIn"
              backDropOpacity = {1}
              backdropTransitionInTiming = {1000}
              animationInTiming = {1000}
              onSwipeComplete = {() => {this.setState({ rowColor: this.state.rowColor, modalVisible: false, website: this.state.website,  websiteStyle: this.state.websiteStyle, websitePress: this.state.websitePress })}}
              swipeDirection = "right"
            >
            <View style = {styles.modalContent}>
              <Text style = {styles.modalTitle}>{this.props.name}</Text>
              <Text style = {styles.modalBase}>{this.props.description}</Text>

              <Text style = {styles.modalBase}>
                <Text style = {styles.bold}>Website: </Text>
                <Text onPress = {this.state.websitePress} style = {this.state.websiteStyle}>{this.state.website}</Text>
              </Text>
              <Text style = {styles.modalBase}>
                <Text style = {styles.bold}>Phone: </Text>
                <Text>{this.props.phone}</Text>
              </Text>
              <Text style = {styles.modalBase}>
                <Text style = {styles.bold}>Address: </Text>
                <Text>{this.props.address}</Text>
              </Text>
            </View>
          </Modal>
          

          <RectButton style={[styles.option, this.props.isLastOption && styles.lastOption, this.state.rowColor]} onPress={() => {this.setModalVisible();}}>
            <View style = {{flexDirection: 'row'}}>
              <View style={styles.optionIconContainer}>
                <Ionicons name={this.props.icon} size={22} color="rgba(0,0,0,0.35)" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionText}>{this.props.name}</Text>
              </View>
            </View>

          </RectButton>
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
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  modalTitle: {
    fontSize: 19
  },
  modalBase: {
    paddingTop: 10,
    fontSize: 16
  },
  bold: {
    fontWeight: 'bold'
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

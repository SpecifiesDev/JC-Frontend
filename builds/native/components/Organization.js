import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import {RectButton} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

export class Organization extends React.Component {
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
    testLog() {
      console.log("test');")
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
                <View>
                  <Text style={styles.optionText}>{this.props.name}</Text>
                </View>
              </View>
  
            </RectButton>
        </React.Fragment>
        
      );
    }
  }

  const styles = StyleSheet.create({
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
  })
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

//import * as WebBrowser from 'expo-web-browser';


export default function HomeScreen() {
  return (



    <View style={styles.container}>



      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <View style = {styles.developmentImage}>
          <Image source = {require('../assets/images/robot-dev.png')}></Image>
        </View>

        <View style={styles.bodyContainer}>

          <Text style={styles.bodyText}>Jackson Connect</Text>


          <Text style={styles.bodyText}>
            Jackson Connect is an interactive Application that seeks to connect people who wish to assist their community with organizations that do so. It primarily consists of two portions. One portion is a robust resource directory to refer to, while the other is a posting section where organizations can post requests for assistance. The application is still under heavy development.
          </Text>
        </View>

      </ScrollView>


    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },

  developmentImage: {
    alignItems: 'center'
  },

  bodyContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  bodyText: {
    paddingTop: 5,
    fontSize: 15,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  }
});

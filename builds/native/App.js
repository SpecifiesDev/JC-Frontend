import 'react-native-gesture-handler';

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './components/HomeScreen.js';
import Directory from './components/Directory.js';
import CustomHeader from './components/CustomHeader.js';



const Stack = createStackNavigator();



export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name = "Home"
            component = {HomeScreen}
            options = {{
              headerTitle: <CustomHeader title = "Test"/>
            }}
          />

          <Stack.Screen 
            name = "Directory" 
            component = {Directory}
            options = {{
              headerTitle: <CustomHeader title = "Test2"/>,
              headerLeft: null,
              gesturesEnabled: true
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}









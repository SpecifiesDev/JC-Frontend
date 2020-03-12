import 'react-native-gesture-handler';

import React from 'react';
import { Button } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './components/HomeScreen.js';
import Directory from './components/Directory.js';
import CustomHeader from './components/CustomHeader.js';



const Stack = createStackNavigator();

const homeNavigationOptions = {
  headerTitle: <CustomHeader title = "Home"/>,
  headerRight: () => (
    // We'll make this a dropdown later, I'm just creating the logic
    <Button onPress = {() => console.log("Pressed")} title = "Directory"/>
  ),
}

const directoryNavigationOptions = {
  headerTitle: <CustomHeader title = "Directory"/>,
  headerLeft: null,
  gesturesEnabled: true,
  headerRight: () => (
    <Button onPress = {() => console.log("Pressed")} title = "Home"/>
  ),
}

export default class App extends React.Component {


  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name = "Home"
            component = {HomeScreen}
            options = {homeNavigationOptions}
          />

          <Stack.Screen 
            name = "Directory" 
            component = {Directory}
            options = {directoryNavigationOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}









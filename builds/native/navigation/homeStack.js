import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import React from 'react';


const homeStack = createStackNavigator();

export default function HomeStack() {
    return (
        <homeStack.Navigator>
            <homeStack.Screen name="Home" component={HomeScreen}/>
        </homeStack.Navigator>
    )
}
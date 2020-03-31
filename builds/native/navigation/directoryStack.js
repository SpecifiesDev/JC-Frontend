import { createStackNavigator } from '@react-navigation/stack';
import DirectoryScreen from '../screens/DirectoryScreen';
import React from 'react';


const dirStack = createStackNavigator();

export default function DirStack() {
    return (
        <dirStack.Navigator>
            <dirStack.Screen name="Directory" component={DirectoryScreen}/>
        </dirStack.Navigator>
    )
}
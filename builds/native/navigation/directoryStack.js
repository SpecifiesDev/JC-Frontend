import { createStackNavigator } from '@react-navigation/stack';
import DirectoryScreen from '../screens/DirectoryScreen';
import SearchedItems from '../screens/SearchedItems';
import React from 'react';


const dirStack = createStackNavigator();

export default function DirStack() {
    return (
        <dirStack.Navigator>
            <dirStack.Screen name="Directory" component={DirectoryScreen}/>
            <dirStack.Screen name = "DirectorySearch" component = {SearchedItems} options = {{title: ''}}/>
        </dirStack.Navigator>
    )
}
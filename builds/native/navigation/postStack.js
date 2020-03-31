import { createStackNavigator } from '@react-navigation/stack';
import PostsScreen from '../screens/PostsScreen';
import PostDetails from '../screens/PostDetails';
import React from 'react';


const postStack = createStackNavigator();

export default function PostStack() {
    return (
        <postStack.Navigator initialRouteName="Posts">
            <postStack.Screen name="Posts" component={PostsScreen}/>
            <postStack.Screen name="Details" component={PostDetails} options={{title: ''}}/>
        </postStack.Navigator>
    )
}


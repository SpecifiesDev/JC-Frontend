import { createStackNavigator } from '@react-navigation/stack';
import PostsScreen from '../screens/PostsScreen';
import PostDetails from '../screens/PostDetails';
import Contact from '../screens/Contact';
import Results from '../screens/SearchedItems';
import React from 'react';


const postStack = createStackNavigator();

export default function PostStack() {
    return (
        <postStack.Navigator initialRouteName="Posts">
            <postStack.Screen name="Posts" component={PostsScreen}/>
            <postStack.Screen name="Details" component={PostDetails} options={{title: ''}}/>
            <postStack.Screen name="Contact" component={Contact} options={{title: ''}}/>
            <postStack.Screen name="Search Results" component={Results}/>
        </postStack.Navigator>
    )
}


import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import DirectoryScreen from '../screens/DirectoryScreen.js';
import PostsScreen from '../screens/PostsScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {

  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />
        }}
      />
      <BottomTab.Screen
        name="Directory"
        component={DirectoryScreen}
        options={{
          title: 'Directory',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-paper" />
        }}
      />
      <BottomTab.Screen
        name = "Posts"
        component = {PostsScreen}
        options = {{
          title: 'Posts',
          tabBarIcon:({ focused }) => <TabBarIcon focused = {focused} name = "ios-chatboxes"/>
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'Directory':
      return 'Directory';
    case 'Posts':
      return 'Posts'
  }
}

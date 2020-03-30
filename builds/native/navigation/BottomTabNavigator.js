import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import TabBarIcon from '../components/TabBarIcon';
import PostStack from './postStack';
import HomeStack from './homeStack';
import DirStack from './directoryStack';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator() {

  return (
    <NavigationContainer>
      <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
        <BottomTab.Screen
          name="Home"
          component={HomeStack}
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />
          }}
        />
        <BottomTab.Screen
          name="Directory"
          component={DirStack}
          options={{
            title: 'Directory',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-paper" />
          }}
        />
        <BottomTab.Screen
          name = "Posts"
          component = {PostStack}
          options = {{
            title: 'Posts',
            tabBarIcon:({ focused }) => <TabBarIcon focused = {focused} name = "ios-chatboxes"/>
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
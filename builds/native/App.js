import * as React from 'react';
import { StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import color from './constants/Colors';

import BottomTabNavigator from './navigation/BottomTabNavigator';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <React.Fragment>
        <SafeAreaView style={styles.topStatus}>
          <StatusBar barStyle="default" />
        </SafeAreaView>
        <SafeAreaView style={styles.bottomStatus}>
          <BottomTabNavigator/>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  topStatus: {
    flex: 0,
    backgroundColor: color.tintColor
  },
  bottomStatus: {
    flex: 1,
    backgroundColor: color.tabBar
  }
});

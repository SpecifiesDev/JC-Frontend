import * as React from 'react';
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.head}>
        <Text style={styles.header}>Welcome to a new way of serving your community</Text>

        <Text style={styles.bodyText}>
          Jackson Connect is dedicated to creating ways for you to serve your community and providing easy accessable help for people in your community.
        </Text>
      </View>

      <Text style={{ fontSize: 23, fontWeight: '600', textAlign: 'center' }}>Sponsors:</Text>

      <View style={styles.sponsors}>
        <Image style={{ width: 130, height: 100 }} resizeMode={"contain"} source={require('../assets/images/northeastgahealth.jpg')} />
        <Image style={{ width: 200, height: 60, marginTop: 30 }} resizeMode={"contain"} source={require('../assets/images/piedmontathens.png')} />
      </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({

  contentContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
  },

  head: {
    marginBottom: 40
  },

  header: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 30,
    fontWeight: '700'
  },

  bodyText: {
    paddingTop: 5,
    fontSize: 15,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },

  sponsors: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
    flex: 1
  }
});

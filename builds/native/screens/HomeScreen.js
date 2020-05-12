import * as React from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.head}>
          <Text style={styles.header}>Welcome to a new way of serving your community</Text>

          <Text style={styles.bodyText}>
            Jackson Connect is dedicated to creating ways for you to serve your community and providing easy accessable help for people in your community.
          </Text>
        </View>
        
        <View style={styles.buttons}>
          <Text style={{fontWeight: '600', fontSize: 22}}>Do you need help?</Text>
          <TouchableOpacity style={styles.directory} onPress={() => navigation.navigate("Directory")}>
            <Text style={{color: '#fff', fontSize: 18}}>Check out our Directory page!</Text>
          </TouchableOpacity>
          
          <Text style={{fontWeight: '600', fontSize: 22}}>Want to help?</Text>
          <TouchableOpacity style={styles.posts} onPress={() => navigation.navigate("Posts")}>
            <Text style={{color: '#fff', fontSize: 18}}>Check out our Posts page!</Text>
          </TouchableOpacity>
        </View>

        <Text style={{fontSize: 23, fontWeight: '600', textAlign: 'center'}}>Sponsors:</Text>

        <View style={styles.sponsors}>
          <Image style={{width: 130, height: 100, resizeMode: 'stretch'}} source={require('../assets/images/northeastgahealth.jpg')} />
          <Image style={{width: 200, height: 60, resizeMode: 'stretch'}} source={require('../assets/images/piedmontathens.png')} />
        </View>
        
      </ScrollView>
  );
}


const styles = StyleSheet.create({

  contentContainer: {
    marginVertical: 20,
    marginHorizontal: 30,
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

  buttons: {
    marginHorizontal: 35,
    marginBottom: 50,
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  directory: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#17a2b8',
    marginTop: 10,
    marginBottom: 20
  },

  posts: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#28a745',
    marginTop: 10,
    marginBottom: 20
  },

  sponsors: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15
  }
});

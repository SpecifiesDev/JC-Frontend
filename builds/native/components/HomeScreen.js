import React, { Component } from 'react';



import { View, Text, StyleSheet, Button } from 'react-native';
import ErrorBoundary from './ErrorStrainer.js';


const styles = StyleSheet.create({
    flex: 1
});


export default class HomeScreen extends Component {



    render() {
        return(
        <ErrorBoundary>
            <View style = {styles}>
                <Text>Navigation setup</Text>
                <Button title = "Directory" onPress = {() => {this.props.navigation.navigate('Directory');}}></Button>

            </View>
        </ErrorBoundary>
        )
    }
}


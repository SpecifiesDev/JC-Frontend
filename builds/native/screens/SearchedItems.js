import { StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import React from 'react';


export default function SearchedItems({ route }){
    console.log(route);
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {route.params}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fafafa',
    },
    contentContainer: {
      paddingTop: 15,
    }

});
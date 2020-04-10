import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons, Foundation } from '@expo/vector-icons';

export default function PostDetails({ route, navigation }){
    return (
        <ScrollView>
            <View style={styles.containter}>
                <View style={styles.head}>
                    <View style={styles.icon}>
                        <GetIconByType type={route.params['type']} />
                    </View>
                    <View style={styles.titleOrg}>
                        <Text style={styles.title}>{ route.params['title'] }</Text>
                        <Text style={styles.org}><Text style={styles.orgT}>Organization:</Text> { route.params['organization-name'] }</Text>
                    </View>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.body}>
                    <Text style={styles.desc}><Text style={styles.bodyT}>Description:</Text> { route.params['description'] }</Text>
                    <View style={styles.tags}>
                        <Text style={styles.bodyT}>Tags:</Text>
                        <View style={styles.list}>
                            {route.params['tags'].split('~').map((l, index) => {
                                return <Text key={index} style={styles.listItems}>{l}</Text>;
                            })}
                        </View>
                        <View style={{margin: 20}}>
                            <Button
                                onPress={() => navigation.navigate('Contact', route.params['organization-uuid'])}
                                title="Contact"
                                color="#28a745"
                            />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const GetIconByType = (props) => {
    switch(props.type){
        case "0":
            return (
                <Ionicons name={'md-hand'} size={50} color="#FFCD94"/>
            )
        case "1":
            return (
                <Foundation name={'dollar'} size={50} color="#06c258"/>
            )
        default:
            return (<Text>Error</Text>);
    }
}


const styles = StyleSheet.create({
    org: {
        fontSize: 16,
        marginTop: 8,
        marginLeft: 12,
        fontWeight: '300',
        marginRight: 30
    },

    orgT: {
        fontWeight: '500',
        fontSize: 18
    },

    title:{
        fontSize: 26,
        letterSpacing: 1,
        fontWeight: '700',
        marginRight: 30
    },

    list: {
        marginLeft: 25,
        marginTop: 12
    },

    listItems: {
        letterSpacing: 1,
        paddingVertical: 2
    },

    body:{
        marginTop: 14,
        marginHorizontal: 10
    },

    bodyT: {
        fontWeight: '500',
        fontSize: 16
    },

    desc: {
        fontSize: 14,
        color: '#242424',
        fontWeight: '400'
    },

    tags: {
        marginVertical: 30
    },

    icon: {
        paddingVertical: 10,
        marginTop: 10
    },

    head: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 6,
        flex: 1
    },

    titleOrg: {
        marginLeft: 20
    },

    containter: {
        marginHorizontal: 20,
        marginVertical: 10,
        flex: 1
    },

    divider:{
        borderBottomColor: Colors.tintColor,
        borderBottomWidth: 1,
        marginVertical: 6,
        marginHorizontal: 20
    }
});
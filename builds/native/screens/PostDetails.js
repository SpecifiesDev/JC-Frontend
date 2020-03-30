import React from 'react';
import { View, Text } from 'react-native';

export default function PostDetails({ navigation, route }){
    return (
        <View>
            <Text>Organization: { route.params['organization-name'] }</Text>
            <Text>Description: { route.params['description'] }</Text>
        </View>
    )
}
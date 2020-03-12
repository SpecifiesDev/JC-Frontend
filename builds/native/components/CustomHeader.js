import React from 'react';

import { Button, Text, View } from 'react-native';

import ErrorBoundary from './ErrorStrainer.js';



export default class CustomHeader extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return(
            <ErrorBoundary>
                    
                    <Text>{this.props.title}</Text>
            </ErrorBoundary>
        )
    }

}
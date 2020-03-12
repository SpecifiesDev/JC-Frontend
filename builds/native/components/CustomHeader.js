import React from 'react';

import { Text } from 'react-native';

import ErrorBoundary from './ErrorStrainer.js';



export default class CustomHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <ErrorBoundary>
                    <Text style = {{textAlign: 'center', color: '#3a3a3a'}}>
                        {this.props.title}
                    </Text>
            </ErrorBoundary>
        )
    }

}
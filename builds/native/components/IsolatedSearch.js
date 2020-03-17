// We're isolating this component inside another component so the update handling can be done in its own state
import React from 'react';
import { SearchBar } from 'react-native-elements';

// Also I'm not implementing this just yet.

export class IsolatedSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }

    updateSearch = search => {
        this.setState({search});
    };

    render() {
        
        return(
            <SearchBar
                placeholder = {this.props.placeholder}
                onChangeText = {this.updateSearch}
                value = {this.state.search}
            />
        )

    }

}
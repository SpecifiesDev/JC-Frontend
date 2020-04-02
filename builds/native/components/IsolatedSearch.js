// We're isolating this component inside another component so the update handling can be done in its own state
import React from 'react';
import { TextInput, Text } from 'react-native';
import { Organization } from '../components/Organization';


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
    }

    completeSearch = () => {
        
        let returns = 0;
        let updatedArray = [];

        let search = this.state.search;
        this.textInput.clear();
        if(search == '') {
            
        } else {
                for(let x = 0; x < this.props.orgData['result'].length; x++) {

                    let organization = this.props.orgData['result'][x];
                    let parent = organization['tags'][0]['parent'];

                    // If the tag has no parent, default to N/A to pull the N/A icon for the list display
                    if(parent == null) parent == "N/A";

                    if(this.compareValues(organization['name'], search)) {
                        updatedArray.push(this.newOrganization(organization['name'], returns, organization['description'], organization['website'], organization['phone'], organization['address'], organization['UUID'], parent));
                        returns++;
                    }
                    else if(this.compareValues(organization['description'], search)) { 
                        updatedArray.push(this.newOrganization(organization['name'], returns, organization['description'], organization['website'], organization['phone'], organization['address'], organization['UUID'], parent));
                        returns++;
                    }
                    else if(this.compareValues(parent, search)) {
                        updatedArray.push(this.newOrganization(organization['name'], returns, organization['description'], organization['website'], organization['phone'], organization['address'], organization['UUID'], parent));
                        returns++;
                    }

                }

                updatedArray.sort((a, b) => {
                    return a.props.name > b.props.name;
                });
                let newElementData = [];

                let returnv = -1;
                updatedArray.map((item) => {
                  returnv++;
                  newElementData.push(<Organization name = {item.props.name} position = {returnv} icon = {item.props.icon} description = {item.props.description} website = {item.props.website} phone = {item.props.phone} address = {item.props.address} key = {returnv}/>)
                });

                if(returns == 0) {
                    this.props.navigator("DirectorySearch", <Text style = {{textAlign: 'center'}}>There were no organizations found.</Text>)
                    
                } else {
                    this.props.navigator("DirectorySearch", newElementData);
                }

                
            

        }
    };

    compareValues(string, comparison) {
        
        return String(string).includes(comparison);
    }

    newOrganization(name, position, description, website, phone, address, uuid, parent) {
        return <Organization name = {name} position = {position} icon = {this.props.getIconByTag(parent)} description = {description} website = {website} phone = {phone} address = {address} key = {uuid}/>
    }
    

    render() {
        
        return(
            <TextInput
                ref = {input => {this.textInput = input}}
                style = {{textAlignVertical: 'center', textAlign: 'center', height: 25}}
                placeholder = {this.props.placeholder}
                clearButtonMode = "always"
                onChangeText = {this.updateSearch}
                onSubmitEditing = {this.completeSearch}
                
            />
        )

    }

}
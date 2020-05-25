// We're isolating this component inside another component so the update handling can be done in its own state
import React from 'react';
import { TextInput, Text, View, TouchableOpacity } from 'react-native';
import { Organization } from '../components/Organization';
import Card from '../components/Card';
import { Post } from '../components/Post';


// Also I'm not implementing this just yet.

export class IsolatedSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }

    }

    updateSearch = search => {
        this.setState({ search });
    }

    completeSearch = () => {

        let returns = 0;
        let updatedArray = [];

        let search = this.state.search;
        this.textInput.clear();
        if (this.props.orgData != null) {
            if (search == '') {

            } else {
                for (let x = 0; x < this.props.orgData['result'].length; x++) {

                    let organization = this.props.orgData['result'][x];


                    let parent;

                    if (organization['tags'].length == 0) {
                        parent = "N/A";
                    } else {
                        parent = organization['tags'][0]['parent'];
                    }


                    // If the tag has no parent, default to N/A to pull the N/A icon for the list display
                    if (parent == null) {
                        parent = "N/A";
                    }

                    if (this.compareValues(organization['name'], search)) {
                        updatedArray.push(this.newOrganization(organization['name'], returns, organization['description'], organization['website'], organization['phone'], organization['address'], organization['UUID'], parent));
                        returns++;
                    }
                    else if (this.compareValues(organization['description'], search)) {
                        updatedArray.push(this.newOrganization(organization['name'], returns, organization['description'], organization['website'], organization['phone'], organization['address'], organization['UUID'], parent));
                        returns++;
                    }
                    else if (this.compareValues(parent, search)) {
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
                    newElementData.push(<Organization name={item.props.name} position={returnv} icon={item.props.icon} description={item.props.description} website={item.props.website} phone={item.props.phone} address={item.props.address} key={returnv} />)
                });

                if (returns == 0) {
                    this.props.navigator("DirectorySearch", <Text style={{ textAlign: 'center' }}>There were no organizations found.</Text>)

                } else {
                    this.props.navigator("DirectorySearch", newElementData);
                }
            }
        } else if (this.props.data != null) {
            if (search != "") {
                let post;
                let filteredData = [];
                let data = this.props.data;

                for (let i = 0; i < data.length; i++) {

                    post = data[i];

                    if (this.compareValues(post['organization-name'], search)) {
                        filteredData.push(post);
                    }
                    else if (this.compareValues(post['description'], search)) {
                        filteredData.push(post);
                    }
                    else if (this.compareValues(post['tags'], search)) {
                        filteredData.push(post);
                    }
                    else if (this.compareValues(post['title'], search)) {
                        filteredData.push(post);
                    }
                }

                for (let x = 0; x < filteredData.length; x++) {
                    post = filteredData[x];
                    filteredData[x] =
                        <View style={{ flex: 1, marginHorizontal: '10%' }} key={post['UUID']}>
                            <TouchableOpacity onPress={() => this.props.navigator('Details', post)}>
                                <Card>
                                    <Post orgName={post['organization-name']} title={post.title} creationDate={this.props.getDate(post['creation-date'])} desc={this.props.safeDescription(post['description'])} />
                                </Card>
                            </TouchableOpacity>
                        </View>;
                }

                if (filteredData.length == 0) {
                    this.props.navigator("Search Results", <Text style={{ textAlign: 'center' }}>There were no posts found. Consider scrolling down further before searching...</Text>)

                } else {
                    this.props.navigator("Search Results", filteredData);
                }

            }
        } else {
            console.warn("Isolated Search does not have a prop of name orgName or data");
        }

    }

    compareValues(string, comparison) {

        return String(string).toLowerCase().includes(comparison.toLowerCase());
    }

    newOrganization(name, position, description, website, phone, address, uuid, parent) {
        return <Organization name={name} position={position} icon={this.props.getIconByTag(parent)} description={description} website={website} phone={phone} address={address} key={uuid} />
    }


    render() {

        return (
            <TextInput
                ref={input => { this.textInput = input }}
                style={{ textAlignVertical: 'center', textAlign: 'center', height: 25 }}
                placeholder={this.props.placeholder}
                clearButtonMode="always"
                onChangeText={this.updateSearch}
                onSubmitEditing={this.completeSearch}

            />
        )

    }

}
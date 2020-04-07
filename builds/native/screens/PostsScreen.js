import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SplashScreen } from 'expo';
import { Post } from '../components/Post';
import Card from '../components/Card';

const PER_PAGE = 20;

export default class PostsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            page: 0,
            refreshing: false,
            data: []
        };

    }

    componentDidMount() {
        SplashScreen.preventAutoHide();
      
        this.getData();

        SplashScreen.hide();
    }


    getData = () => {
        const { page } = this.state;

        let offset = (page * PER_PAGE).toString();

        const url = 'https://jacksonconnect.site/posts?filter=1&amount=' + PER_PAGE + '&offset=' + offset;

        this.setState({ loading: true });

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: page == 0 ? res.result : this.state.data.concat(res.result),
                    loading: false,
                    refreshing: false
                })
            })
            .catch(err => {
                console.warn(err);
                this.setState({refreshing: false, loading: false})
            })
    }

    renderSeparator = () => {
        return (
            <View style={styles.separator} />
        )
    }

    renderFooter = () => {
        if(!this.state.loading) return null;

        return (
            <View style={styles.footer}>
                <ActivityIndicator size = "large" color = "#93ab99" />
            </View>
        )
    }

    handleRefresh = () => {
        this.setState({
            page: 0,
            refreshing: true
        }, () => this.getData());
    }

    handleLoadMore = () => {
        this.setState({
            loading: true,
            page: this.state.page + 1,
        }, () => this.getData());
    }

    render(){
        return (
            <View style={styles.list}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <View style={styles.listCard}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', item)}>
                                <Card>
                                    <Post orgName={item['organization-name']} title={item.title} creationDate = {getDate(item['creation-date'])} desc = {safeDescription(item['description'])} />
                                </Card>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item) => item.UUID}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListFooterComponent={this.renderFooter}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.1}
                />
            </View>
        )
    }

}

function getDate(dateString) {
    let firstSplit = dateString.split(" ");

    let dataArray = firstSplit[0].split("-");

    return `${dataArray[1]}/${dataArray[2]}/${dataArray[0]}`;
}

function safeDescription(desc) {
    if(desc.length <= 32) {
        return desc;
    } else {
        return `${desc.substring(0, 32)}...`;
    }
}

const styles = StyleSheet.create({
    separator: {
        padding: 10
    },
    
    footer: {
        paddingVertical: 20
    },

    listCard: {
        flex: 1,
        marginHorizontal: '10%'
    }
});
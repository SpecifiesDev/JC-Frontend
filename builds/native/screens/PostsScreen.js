import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SplashScreen } from 'expo';
import { Post } from '../components/Post';
import Card from '../components/Card';
import { IsolatedSearch } from '../components/IsolatedSearch';


export default class PostsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            page: 1,
            refreshing: false,
            data: []
        };

        this.PER_PAGE = 30;
        this.totalAmount = 0;
        this.maxPage = 0;
    }

    componentDidMount() {
        SplashScreen.preventAutoHide();
      
        this.getAmount();

        SplashScreen.hide();
    }


    getData = () => {
        const { page } = this.state;

        let offset = (this.totalAmount - (page * this.PER_PAGE)).toString();
        let url = 'https://jacksonconnect.site/posts?filter=1&amount=' + this.PER_PAGE + '&offset=' + offset;

        if(offset < 0){
            let amount = this.PER_PAGE + parseInt(offset);
            url = 'https://jacksonconnect.site/posts?filter=1&amount=' + amount.toString() + '&offset=0';
        }

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: page == 1 ? res.result.reverse() : this.state.data.concat(res.result.reverse()),
                    loading: false,
                    refreshing: false
                })
            })
            .catch(err => {
                console.warn(err);
                this.setState({refreshing: false, loading: false})
            })
    }

    getAmount = () => {
        const url = 'https://jacksonconnect.site/postamount?filter=1';

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.totalAmount = res.amount;
                this.maxPage = Math.ceil(this.totalAmount / this.PER_PAGE);
                this.getData();
            })
            .catch(err => {
                console.warn(err);
            })
    }

    getDate = (dateString) => {
        let firstSplit = dateString.split(" ");
    
        let dataArray = firstSplit[0].split("-");
    
        return `${dataArray[1]}/${dataArray[2]}/${dataArray[0]}`;
    }
    
    safeDescription = (desc) => {
        if(desc.length <= 32) {
            return desc;
        } else {
            return `${desc.substring(0, 32)}...`;
        }
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

    renderHeader = () => {
        return (
            <IsolatedSearch placeholder="Search" data={this.state.data} navigator={this.props.navigation.navigate} getDate = {this.getDate} safeDescription = {this.safeDescription}/>
        )
    }

    handleRefresh = () => {
        this.setState({
            page: 1,
            refreshing: true
        }, () => this.getAmount());
    }

    handleLoadMore = () => {
        if((this.state.page < this.maxPage) && (this.state.loading != true)){
            this.setState({
                loading: true,
                page: this.state.page + 1,
            }, () => this.getData());
        }
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
                                    <Post orgName={item['organization-name']} title={item.title} creationDate = {this.getDate(item['creation-date'])} desc = {this.safeDescription(item['description'])} />
                                </Card>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item) => item.UUID}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListFooterComponent={this.renderFooter}
                    ListHeaderComponent={this.renderHeader}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.1}
                />
            </View>
        )
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
    },

    list: {
        flex: 1
    }
});
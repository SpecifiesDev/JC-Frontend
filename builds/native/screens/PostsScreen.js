import React from 'react';
import { StyleSheet, ActivityIndicator, View, Text, FlatList } from 'react-native';
import { SplashScreen } from 'expo';
import { Post } from '../components/Post';


const axios = require('axios');

const PER_PAGE = 20;

let maxPage = 20; // temp maxPage
let postAmount = 97;


export default function PostsScreen(props) {

    const [isLoadingComplete, setLoadingComplete] = React.useState(false);
    const [elementData, setElementData] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [postLoading, setPostLoading] = React.useState(false);
    const [isRefreshing, setIsRefreshing] = React.useState(false);

    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
              SplashScreen.preventAutoHide();

              setElementData(await getData(page));
              // postAmount = await axios.get('http://54.208.109.135/postamount?filter=1').catch((error) => console.warn(error));
              // maxPage = Math.ceil(postAmount / PER_PAGE);

            } catch (e) {
              
              console.warn(e);
            } finally {
              setLoadingComplete(true);
              SplashScreen.hide();
            }
          }
      
          loadResourcesAndDataAsync();
    }, []);

    if(!isLoadingComplete && !props.skipLoadingScreen) {
        return (
            <ActivityIndicator style = {styles.spinnerStyle} size = "large" color = "#93ab99"/>
        );
    } else {
    
        return (
            <FlatList 
                style = {styles.container} 
                data = {elementData}
                renderItem = {renderRow}
                keyExtractor = {(item, index) => index.toString()}
                onEndReached = {async () => {
                    if(!(page >= maxPage) && !isRefreshing){
                        await setPage(page + 1);
                        setPostLoading(true);
                        setElementData(elementData.concat(await getData(page)));
                        setPostLoading(false);
                    }
                }}
                onEndReachedThreshold = {0}
                ListFooterComponent = {renderFooter(postLoading)}
                refreshing = {isRefreshing}
                onRefresh = {async () => {
                    setIsRefreshing(true);
                    // handleRefresh();
                    await setPage(0);
                    setElementData(await getData(page));
                    setIsRefreshing(false);
                }}
            />
        );
    }
}

getData = async (p) => {
    // Load the organization data to display

    let offset = (p * PER_PAGE).toString();

    let response = await axios.get('http://54.208.109.135/posts?offset=' + offset + '&amount=' + PER_PAGE + '&filter=1').catch((error) => console.warn(error));

    response = JSON.parse(JSON.stringify(response.data));

    let temp = [];
    
    for(let x = 0; x < response['result'].length; x++) {
        let post = response['result'][x];

        temp.push({orgName: post['organization-name'], 
                   title: post['title'],
                   desc: post['description']});
    }

    return temp;
}


renderRow = ({item}) => {
    return (
        <Post orgName = {item.orgName} title = {item.title} desc = {item.desc} key = {item.key}/>
    )
}

renderFooter = (loading) => {
    return (
        loading ?
        <View style={styles.loader}>
            <ActivityIndicator size="large" />
        </View> : null
    )
}

handleRefresh = async () => {
    let tempPostAmount = await axios.get('http://54.208.109.135/postamount?filter=1').catch((error) => console.warn(error));

    if (tempPostAmount != postAmount){
        postAmount = tempPostAmount;
        maxPage = Math.ceil(postAmount / PER_PAGE);
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        paddingTop: 5
    },
    loader: {
        marginTop: 10,
        alignItems: 'center'
    }
});
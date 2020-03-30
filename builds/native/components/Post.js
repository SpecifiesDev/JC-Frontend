import React from 'react';

import {Text, View, StyleSheet} from 'react-native';


export class Post extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {};
  
    }

    render() {
      return(
        <React.Fragment>
            
            <View style = {{flexDirection: 'row'}}>
                <View>
                    <Text style={styles.optionText}>Title: {this.props.title}</Text>
                    <Text style={styles.optionText}>    orgName: {this.props.orgName}</Text>
                </View>
            </View>
  
        </React.Fragment>
        
      );
    }
  }

  const styles = StyleSheet.create({
      optionText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1
      }
  })
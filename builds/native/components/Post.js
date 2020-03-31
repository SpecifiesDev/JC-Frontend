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
                    <Text style={styles.optionText}>{this.props.title}</Text>
                    <Text>{this.props.desc}</Text>
                      <Text style={[styles.optionText, styles.name]}>{this.props.orgName}</Text>
                      <Text style = {[styles.date]}>{this.props.creationDate}</Text>
                    
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
      },
      name: {
        paddingTop: 40,
        fontSize: 10,
        fontWeight: 'bold'
      },
      date: {
        fontSize: 7,
        
      }
  })
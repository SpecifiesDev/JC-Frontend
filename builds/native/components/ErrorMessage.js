import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Modal from 'react-native-modal';

export class ErrorMessage extends React.Component {

    constructor(props) {
        super(props);
        // Logic of this requires it to be rendered true
        this.state = { modalVisible: true }
    }

    

    render() {
        return (
            <Modal
            isVisible = {this.state.modalVisible}
            onBackdropPress = {() => {this.setState({modalVisible: false})}}
            onSwipeComplete = {() => {this.setState({modalVisible: false})}}
            swipeDirection = "right"
            backdropColor = "red"
            >
              <View style = {styles.modalContent}>
                <Text style = {styles.modalTitle}>Error</Text>
                <Text style = {styles.modalBase}>{this.props.message}</Text>
  
              </View>
            </Modal>
        )
    }

}

const styles = StyleSheet.create({
    modalTitle: {
        fontSize: 19
    },
    modalBase: {
        paddingTop: 10,
        fontSize: 16
    },
    modalContent: {
        backgroundColor: 'pink',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    }
});
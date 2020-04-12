import React from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';


export default function Contact({ route }){
    const [uemail, onChangeEmail] = React.useState('');
    const [fbody, onChangeBody] = React.useState('');
    const [feedback, changeFeedback] = React.useState('Please input information into the fields below 😊');

    const url = 'https://jacksonconnect.site/contactsend';


    const handleSubmit = () => {

        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!reg.test(uemail)) {
            changeFeedback('Invalid Email... 😞');
            return;
        }

        if(fbody.length <= 0) {
            changeFeedback('Please input an Email Body... 🤔');
            return;
        }

        changeFeedback('');


        console.log("good so far");

        let send = {
            email: uemail,
            UUID: route.params['organization-uuid'],
            postUUID: route.params['UUID'],
            body: fbody
        }

        // console.log(route.params)

        // console.log(JSON.stringify(send));

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(send)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if(data.success == true){
                    changeFeedback(data.message);
                    onChangeEmail('');
                    onChangeBody('');
                } else {
                    changeFeedback(data.message);
                }
            })
            .catch(err => {
                console.warn(err);
                changeFeedback('Unable to contact Server... Email not sent!');
            })

    }


    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>
                <View style={styles.title}>
                    <Text style={{fontSize: 30, fontWeight: '700'}}>Contact Form</Text>
                </View>
                <View style={styles.feedback}>
                    <Text>{feedback}</Text>
                </View>
                <View style={styles.emailSection}>
                    <Text style={styles.text}>Your Email:</Text>
                    <TextInput
                        style={styles.emailInput}
                        onChangeText={text => onChangeEmail(text)}
                        value={uemail}
                        autoCompleteType={"email"}
                        blurOnSubmit={true}
                        keyboardType={"email-address"}
                        maxLength={320}
                        placeholder={"johndoe@domain.com"}
                        textContentType={"emailAddress"}
                    />
                </View>
                <View style={styles.bodySection}>
                    <Text style={styles.text}>Email Body:</Text>
                    <View style={styles.centerer}>
                        <TextInput
                            style={styles.bodyInput}
                            onChangeText={text => onChangeBody(text)}
                            value={fbody}
                            maxLength={600}
                            multiline={true}
                        />
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={{color: '#eee'}}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>   
    )
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1
    },

    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },

    feedback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },

    form: {
        margin: 30,
        flex: 1
    },

    centerer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    emailSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },

    bodySection: {
        flex: 1
    },

    text: {
        marginLeft: 10, 
        fontSize: 20, 
        fontWeight: '300'
    },

    emailInput: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#5db370',
        padding: 8,
        margin: 10,
        width: 225
    },

    bodyInput: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#5db370',
        padding: 8,
        margin: 10,
        width: 325
    },

    button: {
        backgroundColor: '#28a745',
        width: 75,
        padding: 10,
        margin: 10,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
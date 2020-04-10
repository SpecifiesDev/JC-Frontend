import React from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';


export default function Contact({ route }){
    const [uemail, onChangeEmail] = React.useState('');
    const [fsubject, onChangeSubject] = React.useState('');
    const [fbody, onChangeBody] = React.useState('');
    const [feedback, changeFeedback] = React.useState('Please input information into the fields below 😊');

    const url = 'https://jacksonconnect.site/contactsend';

    const handleSubmit = () => {
        if(uemail.length <= 5) {
            changeFeedback('Your email needs to be longer than 5 characters 🤷');
            return;
        }

        if(!uemail.includes('@')) {
            changeFeedback('Invalid Email... 😞');
            return;
        }

        if(fsubject.length <= 0) {
            changeFeedback('Please input an Email Subject... 😇');
            return;
        }

        if(fbody.length <= 0) {
            changeFeedback('Please input an Email Body... 🤔');
            return;
        }

        changeFeedback('');

        let send = {
            email: uemail,
            uuid: route.params,
            subject: fsubject,
            body: fbody
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(send)
        })
            // .then(res => res.json())         # I need austin to implement the response before I can get the resonse
            .then(data => {
                console.log('sent');
                changeFeedback('Email Sent');
                onChangeEmail('');
                onChangeSubject('');
                onChangeBody('');
            })
            .catch(err => {
                console.warn(err);
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
                <View style={styles.subjectSection}>
                    <Text style={styles.text}>Subject:</Text>
                    <TextInput
                        style={styles.subjectInput}
                        onChangeText={text => onChangeSubject(text)}
                        value={fsubject}
                        blurOnSubmit={true}
                        maxLength={48}
                    />
                </View>
                <View style={styles.bodySection}>
                    <Text style={styles.text}>Body:</Text>
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

    subjectSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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

    subjectInput: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#5db370',
        padding: 8,
        margin: 10,
        width: 250
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
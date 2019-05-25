import React from 'react';
import { StyleSheet } from 'react-native';
import {
    Container,
    H2,
    Content,
    Button,
    Text,
    Item,
    Form,
    Label,
    Input
} from 'native-base';

import { baseUrl } from '../constants/api';

import { handleResponse, storeData } from '../helpers/api';

import { ErrorMessage } from '../components/ErrorMessage';

export default class SignUpScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Emote'
    };

    state = {
        displayName: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        errorMessage: ''
    };

    submitForm = () => {
        const {
            displayName,
            email,
            password,
            firstName,
            lastName
        } = this.state;

        this.setState({
            errorMessage: ''
        });

        // Validate form has proper fields
        // @todo validate for email/password
        if (!displayName || !email || !password) {
            this.setState({
                errorMessage:
                    'You must enter a Display Name, Email, and Password.'
            });
            return;
        }
        const data = {
            display_name: displayName,
            email,
            password,
            first_name: firstName,
            last_name: lastName
        };

        fetch(`${baseUrl}signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(handleResponse)
            .then(storeData)
            .then(() => this.props.navigation.navigate('Main'))
            .catch(({ message }) => {
                this.setState({
                    errorMessage: message
                });
            });
    };

    render() {
        const { errorMessage } = this.state;

        return (
            <Container style={styles.container}>
                <Content style={styles.content}>
                    <H2 style={styles.content}>Sign Up</H2>
                    <Form style={styles.content}>
                        <Item stackedLabel>
                            <Label>Email *</Label>
                            <Input
                                autoCapitalize='none'
                                keyboardType='email-address'
                                onChangeText={(email) =>
                                    this.setState({ email })
                                }
                            />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Password *</Label>
                            <Input
                                secureTextEntry={true}
                                onChangeText={(password) =>
                                    this.setState({ password })
                                }
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Display Name *</Label>
                            <Input
                                onChangeText={(displayName) =>
                                    this.setState({ displayName })
                                }
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>First Name</Label>
                            <Input
                                onChangeText={(firstName) =>
                                    this.setState({ firstName })
                                }
                            />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Last Name</Label>
                            <Input
                                onChangeText={(lastName) =>
                                    this.setState({ lastName })
                                }
                            />
                        </Item>
                        <Button
                            full
                            style={styles.button}
                            onPress={this.submitForm}>
                            <Text>Sign Up</Text>
                        </Button>
                        <ErrorMessage message={errorMessage} />
                    </Form>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    content: {
        marginTop: 10,
        textAlign: 'center'
    },
    button: {
        margin: 10
    }
});

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

export default class LoginScreen extends React.Component {
    submitForm = () => {
        // Validate form has proper input

        // Submit credentials

        // In promise response, if validated, direct to main page
        this.props.navigation.navigate('Main');
    };

    render() {
        return (
            <Container style={styles.container}>
                <Content style={styles.content}>
                    <H2 style={styles.content}>Emote</H2>
                    <Form style={styles.content}>
                        <Item stackedLabel>
                            <Label>Email</Label>
                            <Input />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Password</Label>
                            <Input />
                        </Item>
                        <Button
                            full
                            style={styles.button}
                            onPress={this.submitForm}>
                            <Text>Login</Text>
                        </Button>
                    </Form>
                    <Text
                        onPress={() =>
                            this.props.navigation.navigate('SignUp')
                        }>
                        Sign Up
                    </Text>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        backgroundColor: '#fff',
        flex: 1
    },
    content: {
        textAlign: 'center'
    },
    button: {
        margin: 10
    }
});

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    AsyncStorage
} from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Form,
    Label,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text,
    List,
    ListItem,
    Item,
    Input,
    Toast
} from 'native-base';

import { baseUrl } from '../constants/api';

import { putUserInChat } from '../actions/chats';
import {
    handleResponse,
    addAuthHeader
} from '../helpers/api';

const AddUserForm = ({ addUserToChat, cid: chatId, user }) => {
    const { 
        id: userId, 
        display_name: displayName
    } = user;
    return (
        <Form style={styles.contentContainer}>
            <Item stackedLabel>
                <Label>User display name</Label>
                <Text>
                    { displayName }
                </Text>
            </Item>
            <Button 
                full
                onPress={() => addUserToChat(chatId, userId)}>
                <Text>Add To Chat</Text>
            </Button>
        </Form>
    );
}

class AddUserToChatScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        email: '',
        foundUser: null,
        error: ''
    };

    _submitForm = async () => {
        const { email } = this.state;
        const headers = await addAuthHeader();
        return fetch(`${baseUrl}user/${email}`, {
            headers
        })
            .then(handleResponse)
            .then((data) => {
                this.setState({
                    foundUser: data,
                    email: ''
                });
            })
            .catch(({ message }) => {
                this.setState({
                    error: message
                });
            });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.addedUser !== this.props.addedUser) {
            this.props.navigation.navigate('Chat');
        }
    }

    render() {
        const { navigation, putUserInChat } = this.props;
        const { foundUser, email, error } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>
                    <Container>
                        <Header>
                            <Left>
                                <Button transparent>
                                    <Icon
                                        name="md-arrow-back"
                                        onPress={() =>
                                            navigation.pop()
                                        }
                                    />
                                </Button>
                            </Left>
                            <Body>
                                <Title>
                                    <Text>Add User</Text>
                                </Title>
                            </Body>
                            <Right />
                        </Header>
                        <Content>
                            <Form style={styles.content}>
                                <Item stackedLabel>
                                    <Label>Search by email address</Label>
                                    <Input
                                        autoCapitalize='none'
                                        keyboardType='email-address'
                                        onChangeText={(email) =>
                                            this.setState({ email })
                                        }
                                        value={email}
                                    />
                                </Item>
                                <Button
                                    full
                                    style={styles.button}
                                    onPress={this._submitForm}>
                                    <Text>Search</Text>
                                </Button>
                            </Form>
                            { error ? <Text>{ error }</Text> : null }
                            {
                                foundUser ? 
                                <AddUserForm 
                                    addUserToChat={putUserInChat}
                                    cid={navigation.getParam('chatId')}
                                    user={foundUser} 
                                /> : null
                            }
                        </Content>
                    </Container>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = ({
    chatsReducer: { addedUser }
}) => {
    return {
        addedUser
    };
};

const mapDispatchToProps = (dispatch) => ({
    putUserInChat: bindActionCreators(putUserInChat, dispatch)
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    chatButton: {
        top: 3
    },
    contentContainer: {
        paddingTop: 30
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3
            },
            android: {
                elevation: 20
            }
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center'
    },
    navigationFilename: {
        marginTop: 5
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddUserToChatScreen);

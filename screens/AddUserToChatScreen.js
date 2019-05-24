import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Platform,
    ScrollView,
    StyleSheet,
    View
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
    Item,
    Input,
    Toast
} from 'native-base';

import { baseUrl } from '../constants/api';

import { fetchAddUserToChat } from '../actions/chats';
import { handleResponse, addAuthHeader } from '../helpers/api';

import { ErrorMessage } from '../components/ErrorMessage';

const AddUserForm = ({ addUserToChat, cid: chatId, user, socket }) => {
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
                onPress={() => addUserToChat(socket, chatId, userId)}>
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
        errorMessage: ''
    };

    _submitForm = async () => {
        // clear previous error message
        this.setState({
            errorMessage: ''
        });
        
        const { email } = this.state;
        const headers = await addAuthHeader();
        return fetch(`${baseUrl}user/${email}`, {
            headers
        })
            .then(handleResponse)
            .then((data) => {
                // if successful, clear email and update foundUser
                this.setState({
                    foundUser: data,
                    email: ''
                });
            })
            .catch(({ message }) => {
                // if error, update error message
                this.setState({
                    errorMessage: message
                });
            });
    };

    componentDidUpdate(prevProps) {
        // if adding user successful, display toast and navigate back to chat
        if (prevProps.addedUser !== this.props.addedUser) {
            Toast.show({
                text: `${this.props.addedUser.displayName} added to chat`,
                buttonText: "Okay",
                type: "success",
                duration: 2000,
                onClose: () => this.props.navigation.navigate('Chat')
            });
        }
    }

    render() {
        const { navigation, fetchAddUserToChat, socket } = this.props;
        const { foundUser, email, errorMessage } = this.state;
        return (
            <View style={styles.container}>
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
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>
                    <Container>
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
                            <ErrorMessage message={errorMessage} />
                            {
                                foundUser ? 
                                <AddUserForm 
                                    addUserToChat={fetchAddUserToChat}
                                    cid={navigation.getParam('chatId')}
                                    user={foundUser} 
                                    socket={socket} 
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
    chatsReducer: { addedUser, socket }
}) => {
    return {
        socket,
        addedUser
    };
};

const mapDispatchToProps = (dispatch) => ({
    fetchAddUserToChat: bindActionCreators(fetchAddUserToChat, dispatch)
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

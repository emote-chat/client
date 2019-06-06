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

import { setFoundUser, fetchFindUserByEmail, fetchAddUserToChat } from '../actions/chats';

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
                    {displayName}
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
        const { email } = this.state;
        const { fetchFindUserByEmail } = this.props;

        await fetchFindUserByEmail(email);

        this.setState({
            email: ''
        });
    };

    componentDidUpdate(prevProps) {
        const {
            addedUser,
            navigation,
            error
        } = this.props;

        // if adding user successful, display toast and navigate back to chat
        if (addedUser && prevProps.addedUser !== addedUser) {
            Toast.show({
                text: `${addedUser.displayName} added to chat`,
                buttonText: "Okay",
                type: "success",
                duration: 2000,
                onClose: () => navigation.navigate('Chat')
            });
        }

        // if error, display toast (and stay on same screen)
        if (error && prevProps.error !== error) {
            Toast.show({
                text: `${error.message}; try again.`,
                buttonText: "Okay",
                type: "danger",
                duration: 2000
            });
        }
    }

    render() {
        const { foundUser, navigation, fetchAddUserToChat, socket } = this.props;
        const { email } = this.state;
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
    chatsReducer: { error, foundUser, addedUser, socket }
}) => {
    return {
        error,
        socket,
        foundUser,
        addedUser
    };
};

const mapDispatchToProps = (dispatch) => ({
    setFoundUser: bindActionCreators(setFoundUser, dispatch),
    fetchFindUserByEmail: bindActionCreators(fetchFindUserByEmail, dispatch),
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

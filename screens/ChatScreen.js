import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    Container,
    Header,
    Title,
    Content,
    Form,
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
import { Icon as MaterialIcon } from 'react-native-elements';

import {
    createMessage,
    createSocketConnection,
    addUserToChat,
    removeUserFromChat,
    addReaction,
    fetchMessages,
    fetchCreateMessage,
    fetchAddReaction,
    fetchRemoveUserFromChat
} from '../actions/chats';

import { ChatMessage } from '../components/ChatMessage';
import { EmojiMenu } from '../components/EmojiMenu';

class ChatScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedMessage: null,
            inputText: ''
        };
    }
    
    componentDidMount() {
        const { 
            socket,
            fetchMessages,
            navigation, 
            createMessage, 
            addReaction, 
            addUserToChat, 
            removeUserFromChat
        } = this.props;
        const cid = navigation.getParam('chatId');
        
        fetchMessages(cid);
        
        socket.emit('joinChat', cid);

        socket.on('receiveMessage', (data) => {
            createMessage(data);
        });

        socket.on('receiveReaction', (data) => {
            addReaction(data);
        });

        socket.on('receiveAddedUser', (data) => {
            addUserToChat(data);
        });

        socket.on('receiveRemovedUser', (data) => {
            removeUserFromChat(data);
        });

        socket.on('removedSelf', () => {
            this.displayToast();
        });
    }

    componentWillUnmount() {
        const { socket, currentChat } = this.props;
        socket.emit('leaveChat', currentChat.id);
    }

    displayToast() {
        const {
            currentChat,
            currentUser,
            navigation
        } = this.props;

        Toast.show({
            text: `${currentUser.display_name}, you have left ${currentChat.name}`,
            buttonText: "Okay",
            type: "success",
            duration: 2000,
            onClose: () => navigation.navigate('Chats')
        });
    }

    // Send message form
    submitForm = () => {
        const { inputText } = this.state;
        const { navigation, fetchCreateMessage } = this.props;
        const cid = navigation.getParam('chatId');

        fetchCreateMessage(this.socket, cid, inputText);

        this.setState({ 
            inputText: '' 
        });
    };

    confirmLeavingChat = () => {
        const { 
            currentChat, 
            currentUser, 
            navigation, 
            fetchRemoveUserFromChat 
        } = this.props;

        const alertTitle = `Leaving chat ${navigation.getParam('chatName')}`;
        const alertBody = 'Are you sure you want to leave?';
        Alert.alert(
            alertTitle,
            alertBody,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                { 
                    text: 'OK', 
                    onPress: () => {
                        const isSelf = true;
                        fetchRemoveUserFromChat(
                            this.socket, 
                            currentChat.id, 
                            currentUser.id, 
                            isSelf
                        )
                    }
                }
            ]
        );
    }

    render() {
        const {
            navigation,
            currentUser,
            messages,
            currentChat
        } = this.props;
        const {
            emojiMenuOpen,
            inputText,
            selectedMessage
        } = this.state;
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
                            {navigation.getParam('chatName')}
                        </Title>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() =>
                                this.props.navigation.navigate('AddUserToChat', {
                                    chatId: currentChat.id
                                })
                            }>
                            <Icon name="person-add" />
                        </Button>
                        <Button
                            transparent
                            onPress={this.confirmLeavingChat}>
                            <MaterialIcon
                                name="logout"
                                type="material-community"
                                color="red"
                                iconStyle={styles.materialIcon}
                            />
                        </Button>
                    </Right>
                </Header>
                <ScrollView
                    style={styles.chatContainer}
                    contentContainerStyle={styles.contentContainer}
                    ref={ref => this.scrollView = ref}
                    onContentSizeChange={() => {
                        this.scrollView.scrollToEnd({ animated: true });
                    }}>
                    <Container>
                        <Content>
                            {messages && messages.map((message) => {
                                    const mId = message.id;
                                    const _handleLongPress = () => {
                                        this.setState({
                                            selectedMessage: mId
                                        });
                                    };

                                    const handleEmojiClick = (emoji) => {
                                        this.props.fetchAddReaction(
                                            this.socket,
                                            currentChat.id,
                                            mId,
                                            emoji
                                        );
                                        this.setState({
                                            selectedMessage: null
                                        });
                                    };

                                    const isOpen = selectedMessage == mId;
                                    const isSelf = currentUser &&
                                        currentUser.id == message.users_id;
                                    const user = currentChat &&
                                        currentChat.users.find(
                                            ({ id }) => id == message.users_id
                                        );
                                    const displayName = user && user.display_name;

                                    return (
                                        <TouchableOpacity
                                            key={mId}
                                            onLongPress={
                                                _handleLongPress
                                            }>
                                            <ChatMessage
                                                key={mId}
                                                message={message}
                                                isSelf={isSelf}
                                                displayName={displayName}
                                                users={
                                                    currentChat &&
                                                    currentChat.users
                                                }
                                            />
                                            {isOpen && (
                                                <EmojiMenu
                                                    onClick={
                                                        handleEmojiClick
                                                    }
                                                />
                                            )}
                                        </TouchableOpacity>
                                    );
                                })}
                        </Content>
                    </Container>
                </ScrollView>
                <KeyboardAvoidingView
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                    behavior="position">
                    <Form style={styles.content}>
                        <Item style={styles.chatInput} regular>
                            <Input
                                placeholder="Type your message here!"
                                value={inputText}
                                onChangeText={(inputText) =>
                                    this.setState({ inputText })
                                }
                            />
                            <Button
                                style={styles.chatButton}
                                onPress={this.submitForm}>
                                <Text>Send</Text>
                            </Button>
                        </Item>
                    </Form>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const mapStateToProps = ({
    chatsReducer: { currentChat, chats, socket },
    userReducer: { currentUser },
    messageReducer: { messages }
}) => {
    return {
        socket,
        chats,
        currentChat,
        currentUser,
        messages
    };
};

const mapDispatchToProps = (dispatch) => ({
    createSocketConnection: bindActionCreators(createSocketConnection, dispatch),
    addReaction: bindActionCreators(addReaction, dispatch),
    addUserToChat: bindActionCreators(addUserToChat, dispatch),
    removeUserFromChat: bindActionCreators(removeUserFromChat, dispatch),
    createMessage: bindActionCreators(createMessage, dispatch),
    fetchMessages: bindActionCreators(fetchMessages, dispatch),
    fetchRemoveUserFromChat: bindActionCreators(fetchRemoveUserFromChat, dispatch),
    fetchAddReaction: bindActionCreators(fetchAddReaction, dispatch),
    fetchCreateMessage: bindActionCreators(fetchCreateMessage, dispatch)
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    chatContainer: {
        marginBottom: 50
    },
    chatInput: {
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
    },
    materialIcon: {
        marginTop: 5
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatScreen);

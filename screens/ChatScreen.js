import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    KeyboardAvoidingView
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
    List,
    ListItem,
    Item,
    Input
} from 'native-base';

import {
    fetchMessagesInChat,
    putMessage,
    createReaction
} from '../actions/chats';

import { ChatMessage } from '../components/ChatMessage';
import { EmojiMenu } from '../components/EmojiMenu';

class ChatScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        selectedMessage: null,
        inputText: ''
    };

    componentDidMount() {
        const cid = this.props.navigation.getParam('chatId');
        this.props.fetchMessagesInChat(cid);
    }

    // Send message form
    _submitForm = () => {
        const { inputText } = this.state;
        const cid = this.props.navigation.getParam('chatId');
        this.props.putMessage(cid, inputText);
        this.setState({ inputText: '' });
    };

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
        const chatId = navigation.getParam('chatId');
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.chatContainer}
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
                                    {navigation.getParam('chatName')}
                                </Title>
                            </Body>
                            <Right />
                        </Header>
                        <Content>
                            {messages &&
                                messages.map((message) => {
                                    const mId = message.id;
                                    const _handleLongPress = () => {
                                        this.setState({
                                            selectedMessage: mId
                                        });
                                    };

                                    const handleEmojiClick = (
                                        emoji
                                    ) => {
                                        this.props.createReaction(
                                            mId,
                                            emoji
                                        );
                                        this.setState({
                                            selectedMessage: null
                                        });
                                    };

                                    const isOpen =
                                        selectedMessage == mId;
                                    const isSelf =
                                        currentUser &&
                                        currentUser.id ==
                                            message.users_id;
                                    const user =
                                        currentChat &&
                                        currentChat.users.find(
                                            ({ id }) =>
                                                id == message.users_id
                                        );
                                    const displayName =
                                        user && user.display_name;

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
                                                displayName={
                                                    displayName
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
                        bottom: 0
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
                                onPress={this._submitForm}>
                                <Text>Send</Text>
                            </Button>
                        </Item>
                    </Form>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

function mapStateToProps({
    chatsReducer: { currentChat },
    userReducer: { currentUser },
    messageReducer: { messages }
}) {
    return {
        currentChat,
        currentUser,
        messages
    };
}

const mapDispatchToProps = (dispatch) => ({
    fetchMessagesInChat: bindActionCreators(
        fetchMessagesInChat,
        dispatch
    ),
    createReaction: bindActionCreators(createReaction, dispatch),
    putMessage: bindActionCreators(putMessage, dispatch)
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    chatContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: 70
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
)(ChatScreen);

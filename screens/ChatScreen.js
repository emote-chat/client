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
import { fetchMessagesInChat, putMessage } from '../actions/chats';
import { WebBrowser } from 'expo';

import { ChatMessage } from '../components/ChatMessage';

class ChatScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        inputText: ''
    };

    // Send message form
    _submitForm = () => {
        const { inputText } = this.state;
        const cid = this.props.navigation.getParam('chatId')
        this.props.putMessage(cid, inputText);
    };

    componentDidMount() {
        const cid = this.props.navigation.getParam('chatId')
        this.props.fetchMessagesInChat(cid);
    }

    render() {
        const { navigation, messages } = this.props;
        const { currentUser } = this.props;
        const chatId = navigation.getParam('chatId');
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
                                    {navigation.getParam('chatName')}
                                </Title>
                            </Body>
                            <Right />
                        </Header>
                        <Content>
                            {messages &&
                                messages.map(
                                    ({
                                        text,
                                        id,
                                        users_id,
                                        created_at
                                    }) => (
                                        <ChatMessage
                                            text={text}
                                            key={id}
                                            userId={users_id}
                                            currentUserId={currentUser.id}
                                            currentUserName={currentUser.display_name}
                                            createdTimestamp={created_at}
                                        />
                                    )
                                )}
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
                            <Input placeholder="Type your message here!"
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

function mapStateToProps({ chatsReducer: { currentChat },
                           userReducer: { currentUser },
                           messageReducer: { messages } }) {
    return {
        currentChat, 
        currentUser,
        messages
    };
}

const mapDispatchToProps = (dispatch) => ({
    fetchMessagesInChat: bindActionCreators(fetchMessagesInChat, dispatch),
    putMessage: bindActionCreators(putMessage, dispatch)
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
)(ChatScreen);

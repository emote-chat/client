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

import {
    Container,
    Header,
    Title,
    Content,
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

import { WebBrowser } from 'expo';

import { ChatMessage } from '../components/ChatMessage';

// @NOTE Fake data for now
const messages = [
    {
        id: 1,
        message: "hi i'm testing this app",
        user: 'michele',
        isSelf: true
    },
    {
        id: 2,
        message: 'cool it is working!',
        user: 'sonam',
        isSelf: false
    }
];

class ChatScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        const { navigation } = this.props;
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
                            {messages.map(
                                ({ message, id, isSelf, user }) => (
                                    <ChatMessage
                                        message={message}
                                        key={id}
                                        isSelf={isSelf}
                                        user={user}
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
                    <Item style={styles.chatInput} regular>
                        <Input placeholder="Type your message here!" />
                        <Button style={styles.chatButton}>
                            <Text>Send</Text>
                        </Button>
                    </Item>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

function mapStateToProps({ messages }) {
    return { messages };
}

const mapDispatchToProps = {};

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

import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    FlatList,
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import {
    createMessage,
    setCurrentUser,
    setCurrentChat,
    createChat
} from '../actions';

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
    ListItem,
    Item,
    Input
} from 'native-base';

// import { WebBrowser } from 'expo';

const chatNames = [
    {
        id: 1,
        name: 'Best friends!'
    },
    {
        id: 2,
        name: 'Family ❤️'
    },
    {
        id: 3,
        name: 'OSU People'
    }
];

class ChatsScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    createMessage = () =>
        this.props.createMessage(1, 1, 'Test', 'David', {
            David: ':joy:',
            Nick: ':laughing:'
        });
    setCurrentUser = () => this.props.setCurrentUser('David');
    setCurrentChat = () => this.props.setCurrentChat(1);
    createChat1 = () =>
        this.props.createChat(1, 'Tea Chats', ['David', 'Nick']);
    createChat2 = () =>
        this.props.createChat(2, 'Coffee Chats', ['David', 'Ryan']);

    renderChats = ({ item, index }) => {
        return (
            <ListItem
                key={item.id}
                button={true}
                first={index === 0}
                onPress={() =>
                    this.props.navigation.navigate('Chat', {
                        chatName: item.name,
                        chatId: item.id
                    })
                }>
                <Left>
                    <Text>{item.name}</Text>
                </Left>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </ListItem>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>
                    <Container>
                        <Header>
                            <Left>
                                <Button transparent>
                                    <Icon name="menu" />
                                </Button>
                            </Left>
                            <Body>
                                <Title>Chats</Title>
                            </Body>
                            <Right />
                        </Header>
                        <Content>
                            <FlatList
                                data={chatNames}
                                renderItem={this.renderChats}
                                navigation={this.props.navigation}
                                keyExtractor={(item, index) =>
                                    String(index)
                                }
                            />
                            <Button
                                style={styles.button}
                                onPress={this.createMessage}>
                                <Text>Add message</Text>
                            </Button>
                            <Button
                                style={styles.button}
                                onPress={this.setCurrentUser}>
                                <Text>Set current user</Text>
                            </Button>
                            <Button
                                style={styles.button}
                                onPress={this.setCurrentChat}>
                                <Text>Set current chat</Text>
                            </Button>
                            <Button
                                style={styles.button}
                                onPress={this.createChat1}>
                                <Text>Add chat 1</Text>
                            </Button>
                            <Button
                                style={styles.button}
                                onPress={this.createChat2}>
                                <Text>Add chat 2</Text>
                            </Button>
                        </Content>
                    </Container>
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps({ chats }) {
    return { chats };
}

const mapDispatchToProps = {
    createMessage,
    setCurrentUser,
    setCurrentChat,
    createChat
};

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
)(ChatsScreen);

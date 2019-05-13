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
    FlatList,
    TouchableHighlight,
    AsyncStorage
} from 'react-native';
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
import { fetchChats, setCurrentChat, putUserInChat } from '../actions/chats';
import { setCurrentUser } from '../actions/user';

class ChatsScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    // Get user info from AsyncStorage and store in redux state
    getUser = async () => {
        try {
            const storedUser = await AsyncStorage.getItem('user');
            const user = JSON.parse(storedUser); 
            if (user) {
                const { id, display_name } = user;
                return {
                    id,
                    display_name
                };
            }
        } catch (error) {
            console.log(error);
            return Promise.reject({ message: 'Error getting data' });
        }

    }

    componentDidMount() {
        if (!this.props.currentUser) {
            this.getUser().then(user => this.props.setCurrentUser(user));
        }

        this.props.fetchChats();
    }

    renderChats = ({ item, index }) => {
        return (
            <ListItem
                key={item.id}
                button={true}
                first={index === 0}
                onPress={() => {
                    this.props.setCurrentChat(item);
                    this.props.navigation.navigate('Chat', {
                        chatName: item.name,
                        chatId: item.id
                    });
                    // Chat information needs to be updated after new chat is created
                    // Need to implement function to concat the new chat, doing inefficient fetch for now
                    //this.props.fetchChats();
                }}>
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
        const { navigation, chats } = this.props;
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
                            <Button
                                style={styles.button}
                                onPress={() =>
                                    navigation.navigate('CreateChat')
                                }>
                                <Text>Create new chat</Text>
                            </Button>
                            <Button
                                style={styles.button}
                                onPress={() =>
                                    this.props.putUserInChat(1, 3)
                                }>
                                <Text>Add user 3 to chat 1</Text>
                            </Button>
                            {
                                <FlatList
                                    data={chats}
                                    renderItem={this.renderChats}
                                    navigation={navigation}
                                    keyExtractor={(item, index) =>
                                        String(index)
                                    }
                                />
                            }
                        </Content>
                    </Container>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = ({ chatsReducer: { chats },
                           userReducer: { currentUser } }) => {
    return {
        chats,
        currentUser
    };
};

const mapDispatchToProps = (dispatch) => ({
    fetchChats: bindActionCreators(fetchChats, dispatch),
    setCurrentChat: bindActionCreators(setCurrentChat, dispatch),
    setCurrentUser: bindActionCreators(setCurrentUser, dispatch),
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
)(ChatsScreen);

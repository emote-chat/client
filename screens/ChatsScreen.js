import React from 'react';
import { connect } from 'react-redux';
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
import { fetchChats, setCurrentUser } from '../actions';

class ChatsScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    async componentDidMount() {
        const storedUser = await AsyncStorage.getItem('user');
        const user = JSON.parse(storedUser);
        await setCurrentUser(user);
        fetchChats(user);
    }

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
        const { chats, navigation } = this.props;

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
                            {chats &&
                                chats.length && (
                                    <FlatList
                                        data={chats}
                                        renderItem={this.renderChats}
                                        navigation={navigation}
                                        keyExtractor={(item, index) =>
                                            String(index)
                                        }
                                    />
                                )}
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
    fetchChats
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

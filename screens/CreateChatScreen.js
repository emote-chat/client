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
    Input
} from 'native-base';

import { fetchCreateChat } from '../actions/chats';

class CreateChatScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        name: ''
    };

    componentDidUpdate(prevProps) {
        const { chats, navigation, error } = this.props;

        if (error && prevProps.error !== error) {
            Toast.show({
                text: `${error.message}; try again.`,
                buttonText: "Okay",
                type: "danger",
                duration: 2000
            });
        }

        if (prevProps.chats !== chats) {
            navigation.pop();
        }
    }

    _submitForm = async () => {
        const { name } = this.state;
        const { fetchCreateChat } = this.props;
        // create new chat using name input field
        fetchCreateChat(name);
    };

    render() {
        const { navigation } = this.props;
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
                            <Text>Create Chat</Text>
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
                                    <Label>Name</Label>
                                    <Input
                                        onChangeText={(name) =>
                                            this.setState({ name })
                                        }
                                    />
                                </Item>
                                <Button
                                    full
                                    style={styles.button}
                                    onPress={this._submitForm}>
                                    <Text>Create</Text>
                                </Button>
                            </Form>
                        </Content>
                    </Container>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = ({
    chatsReducer: { error, chats }
}) => {
    return {
        error,
        chats
    };
};

const mapDispatchToProps = (dispatch) => ({
    fetchCreateChat: bindActionCreators(fetchCreateChat, dispatch)
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
        paddingTop: 10
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
)(CreateChatScreen);

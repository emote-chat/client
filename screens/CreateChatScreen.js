import React from 'react';
import { connect } from 'react-redux';
import {
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    AsyncStorage
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
    List,
    ListItem,
    Item,
    Input
} from 'native-base';
import { putChat } from '../actions';
class CreateChatScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        name: ''
    };

    _submitForm = async () => {
        const { name } = this.state;
        const storedUser = await AsyncStorage.getItem('user');
        const user = JSON.parse(storedUser);
        this.props.putChat(name, user);
    };

    render() {
        const { navigation } = this.props;
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
                                    <Text>Create Chat</Text>
                                </Title>
                            </Body>
                            <Right />
                        </Header>
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

function mapStateToProps() {
    return {};
}

const mapDispatchToProps = {
    putChat
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
)(CreateChatScreen);

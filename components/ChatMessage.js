import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Card, CardItem } from 'native-base';

export class ChatMessage extends React.Component {
    state = {
        currentEmojiSelected: null
    };

    _handleKeyPress = (id) =>
        this.setState(({ currentEmojiSelected }) => ({
            currentEmojiSelected:
                currentEmojiSelected === id ? null : id
        }));

    render() {
        const { message, isSelf, displayName, users } = this.props;
        return (
            <Card transparent style={styles.content}>
                <Text style={isSelf ? styles.self : styles.user}>
                    {displayName}
                </Text>
                <Text
                    style={
                        isSelf ? styles.messageSelf : styles.message
                    }>
                    {message.text}
                </Text>
                <CardItem footer style={styles.footer}>
                    {message.reactions &&
                        message.reactions.map(
                            ({ emoji, users_id }, index) => {
                                const onPress = () =>
                                    this._handleKeyPress(emoji);
                                const reactionUser = users.find(
                                    (u) => u.id === users_id
                                );
                                return (
                                    <View key={index}>
                                        <Text onPress={onPress}>
                                            {this.state
                                                .currentEmojiSelected !==
                                            emoji
                                                ? emoji
                                                : reactionUser
                                                    ? `${emoji}: ${
                                                          reactionUser.display_name
                                                      }`
                                                    : ''}
                                        </Text>
                                    </View>
                                );
                            }
                        )}
                </CardItem>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        padding: 10,
        margin: 10
    },
    footer: {
        padding: 0,
        margin: 0
    },
    user: {
        textAlign: 'left'
    },
    self: {
        textAlign: 'right'
    },
    messageSelf: {
        backgroundColor: '#007AFF',
        color: 'white',
        padding: 10
    },
    message: {
        backgroundColor: 'grey',
        color: 'white',
        padding: 10
    }
});

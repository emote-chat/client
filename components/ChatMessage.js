import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card, CardItem } from 'native-base';
import { Overlay } from 'react-native-elements';

import { EmojiUsers } from './EmojiUsers';

export class ChatMessage extends React.Component {
    state = {
        isOpen: false
    };

    _handleKeyPress = () =>
        this.setState(({ isOpen }) => ({
            isOpen: !isOpen
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
                        Object.keys(message.reactions).map(
                            (emoji, index) => {
                                return (
                                    <Text
                                        key={index}
                                        style={styles.emoji}
                                        onPress={
                                            this._handleKeyPress
                                        }>
                                        {`${emoji} ${
                                            message.reactions[emoji]
                                                .length
                                        }`}
                                    </Text>
                                );
                            }
                        )}
                    <Overlay
                        isVisible={this.state.isOpen}
                        height={'auto'}
                        onBackdropPress={this._handleKeyPress}>
                        <EmojiUsers
                            emojis={message.reactions}
                            allUsers={users}
                        />
                    </Overlay>
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
    emoji: {
        paddingRight: 10
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

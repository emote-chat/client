import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Card } from 'native-base';

export class ChatMessage extends React.Component {
    render() {
        const { message, isSelf, displayName } = this.props;
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
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        margin: 10,
        padding: 10
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

import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Content } from 'native-base';

export class ChatMessage extends React.Component {
    render() {
        const { text, userId, createdTimestamp, currentUserId, currentUserName } = this.props;
        // Need to fetch display name for users other than self, which will involve the restructuring of the chats/messages state, put the below just as a placeholder
        return (
            <Content style={styles.content}>
                <Text style={userId === currentUserId ? styles.self : styles.user}>
                    {userId === currentUserId ? currentUserName : userId}
                </Text>
                <Text
                    style={
                       userId === currentUserId ? styles.messageSelf : styles.message
                    }>
                    {text}
                </Text>
            </Content>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        margin: 10
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

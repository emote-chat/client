import React from 'react';
import { Card, CardItem, Body } from 'native-base';
import { StyleSheet, Text } from 'react-native';

export class EmojiUsers extends React.Component {
    render() {
        const { emojis, allUsers } = this.props;
        return (
            <Card transparent style={styles.container}>
                {Object.keys(emojis).map((emoji, index) => {
                    const users = emojis[emoji];
                    return (
                        <Card transparent key={index}>
                            <CardItem>
                                <Text style={styles.header}>
                                    {`${users.length} ${
                                        users.length > 1
                                            ? 'people'
                                            : 'person'
                                    } reacted with ${emoji}`}
                                </Text>
                            </CardItem>
                            <CardItem>
                                {users &&
                                    users.map((user, index) => {
                                        const foundUser = allUsers.find(
                                            ({ id }) => id == user
                                        );
                                        return (
                                            <Text key={index}>
                                                {foundUser
                                                    ? foundUser.display_name
                                                    : 'User is no longer in chat'}
                                                {index <
                                                users.length - 1
                                                    ? ', '
                                                    : ''}
                                            </Text>
                                        );
                                    })}
                            </CardItem>
                        </Card>
                    );
                })}
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 5,
        marginRight: 5
    },
    header: {
        color: 'grey',
        marginTop: 10
    },
    emojis: {
        marginBottom: 10
    }
});

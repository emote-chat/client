import React from 'react';
import { Card, CardItem, Body } from 'native-base';
import { StyleSheet, Text } from 'react-native';
import { emojis } from '../constants/emojis';

export class EmojiMenu extends React.Component {
    render() {
        const { recommended } = this.props;
        return (
            <Card transparent style={styles.container}>
                {recommended.length ? (
                    <Card transparent>
                        <Text style={styles.header}>Recommended</Text>
                        <Text style={styles.emojis}>
                            {recommended.map(({ emoji }, index) => (
                                <Text
                                    key={index}
                                    onPress={() =>
                                        this.props.onClick(emoji)
                                    }>
                                    {emoji}
                                </Text>
                            ))}
                        </Text>
                    </Card>
                ) : null}
                {recommended.length ? (
                    <Text style={styles.header}>All</Text>
                ) : null}
                <Text style={styles.emojis}>
                    {emojis.map((emoji) => (
                        <Text
                            key={emoji}
                            onPress={() => this.props.onClick(emoji)}>
                            {emoji}
                        </Text>
                    ))}
                </Text>
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
        display: 'flex',
        marginBottom: 10
    }
});

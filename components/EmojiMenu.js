import React from 'react';
import { Content, Text, Card, CardItem, Body } from 'native-base';
import { StyleSheet } from 'react-native';
import { emojis } from '../constants/emojis';

export class EmojiMenu extends React.Component {
    render() {
        return (
            <Card transparent>
                <Text>
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
    content: {
        padding: 10,
        textAlign: 'center'
    }
});

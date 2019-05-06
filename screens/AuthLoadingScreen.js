import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const user = await AsyncStorage.getItem('user');
        if (user) {
            const { userToken } = JSON.parse(user);
            this.props.navigation.navigate('Main');
        } else {
            this.props.navigation.navigate('Auth');
        }
    };

    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

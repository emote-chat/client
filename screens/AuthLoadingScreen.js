import React from 'react';
import { connect } from 'react-redux';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View
} from 'react-native';
import { Toast } from 'native-base';

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            socket: this.props.socket,
            navigation: this.props.navigation
        }

        this._bootstrapAsync();
    }

    clearAsyncStorage = async () => {
        await AsyncStorage.clear();
    }

    _bootstrapAsync = async () => {
        const { socket, navigation } = this.state;
        const user = await AsyncStorage.getItem('user');

        if (!user) {
            navigation.navigate('Auth');
            return;
        }

        const { expirationTime } = JSON.parse(user);
        if (expirationTime > Date.now()) {
            // user has a valid (not yet expired) token
            navigation.navigate('Main');
            return;
        }

        // user has invalid/expired token
        if (socket) {
            socket.disconnect();
        }

        Toast.show({
            text: "Invalid/expired token; you must login again.",
            buttonText: "Okay",
            type: "danger",
            duration: 2000,
            position: "top",
            onClose: () => {
                this.clearAsyncStorage();
                navigation.navigate('Auth');
            }
        });
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

const mapStateToProps = ({
    chatsReducer: { socket }
}) => {
    return {
        socket
    };
};

export default connect(
    mapStateToProps,
    null
)(AuthLoadingScreen);

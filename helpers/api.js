import { AsyncStorage } from 'react-native';

const handleResponse = (response) => {
    return response.json().then((json) => {
        if (!response.ok) {
            const { message } = json;
            const error = Object.assign({}, json, {
                status: response.status,
                message: message
            });

            return Promise.reject(error);
        }
        return json;
    });
};

const storeData = ({ access_token, user }) => {
    try {
        const userData = JSON.stringify({
            ...user,
            userToken: access_token
        });
        AsyncStorage.setItem('user', userData);
        return Promise.resolve();
    } catch (error) {
        console.error(error);
        return Promise.reject({ message: 'Error setting data' });
    }
};

const addAuthHeader = async (headers = {}, addUserId) => {
    try {
        const storedUser = await AsyncStorage.getItem('user');
        const user = JSON.parse(storedUser);
        if (user) {
            const user = JSON.parse(storedUser);
            const newHeaders = addUserId
                ? {
                      authorization: `Bearer ${user.userToken}`,
                      userId: user.id
                  }
                : { authorization: `Bearer ${user.userToken}` };
            return {
                ...headers,
                ...newHeaders
            };
        }
    } catch (error) {
        console.error(error);
        return Promise.reject({ message: 'Error getting data' });
    }
};

export { handleResponse, storeData, addAuthHeader };

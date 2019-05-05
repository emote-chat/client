import * as types from '../constants/actionTypes';
import { baseUrl } from '../constants/api';
import { handleResponse, storeData } from '../helpers/api';
import { AsyncStorage } from 'react-native';

export function setCurrentUser(user, userToken) {
    return {
        type: types.SET_CURRENT_USER,
        payload: { user, userToken }
    };
}

// Chats
export function getChats() {
    return {
        type: types.GET_CHATS
    };
}

export function createMessage(id, cid, message, user, emojis) {
    return {
        type: types.CREATE_MESSAGE,
        payload: {
            id,
            chats_id: cid,
            message,
            user,
            emojis
        }
    };
}

export function createChat(name, users) {
    return {
        type: types.CREATE_CHAT,
        payload: {
            name,
            users
        }
    };
}

export function fetchChats({id, userToken}) {
    return function(dispatch) {
        dispatch(getChats());
        return fetch(`${baseUrl}chat`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: `Bearer ${userToken}`,
                userId: id
            }
        }).then(handleResponse);
    };
}

export function putChat(name, user) {
    return function(dispatch) {
        dispatch(createChat());
        return fetch(`${baseUrl}chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                userId: 1,
                authorization: `Bearer ${user.userToken}`
            },
            body: JSON.stringify({ name })
        }).then(handleResponse);
    };
}

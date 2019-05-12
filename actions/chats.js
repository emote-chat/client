import * as types from '../constants/actionTypes';
import { baseUrl } from '../constants/api';
import {
    handleResponse,
    storeData,
    addAuthHeader
} from '../helpers/api';

export const setCurrentChat = (chat) => {
    return {
        type: types.SET_CURRENT_CHAT,
        payload: chat
    };
};

const getChats = (data) => {
    return {
        type: types.GET_CHATS,
        payload: data
    };
};

export const createMessage = (id, cid, message, user, emojis) => {
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
};

const createChat = (data) => {
    return {
        type: types.CREATE_CHAT,
        payload: data
    };
};

const addReaction = (data) => {
    return {
        type: types.ADD_REACTION,
        payload: data
    };
};

export const fetchChats = (data) => {
    return async (dispatch, getState) => {
        const headers = await addAuthHeader();
        return fetch(`${baseUrl}chat`, {
            headers
        })
            .then(handleResponse)
            .then((data) => {
                dispatch(getChats(data));
            });
    };
};

export const putChat = (name) => {
    return async (dispatch) => {
        const addUserId = true;
        const headers = await addAuthHeader(
            {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            addUserId
        );
        return fetch(`${baseUrl}chat`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ name })
        })
            .then(handleResponse)
            .then((data) => {
                dispatch(createChat(data));
            });
    };
};

export const createReaction = (messageId, emoji) => {
    return async (dispatch) => {
        const addUserId = true;
        const headers = await addAuthHeader(
            {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            addUserId
        );
        return fetch(`${baseUrl}message/${messageId}/add-reaction`, {
            method: 'POST',
            headers,
            body: JSON.stringify({emoji})
        })
            .then(handleResponse)
            .then((data) => {
                dispatch(addReaction(data));
            });
    };
};
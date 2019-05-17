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

const getMessages = (data) => {
    return {
        type: types.GET_MESSAGES,
        payload: data
    };
};

export const createMessage = (data) => {
    return {
        type: types.CREATE_MESSAGE,
        payload: data
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

const createUserInChat = (cid, userId, displayName) => {
    return {
        type: types.CREATE_USER_IN_CHAT,
        payload: {
            cid,
            userId,
            displayName
        }
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
            })
            .catch((error) => console.log('Error:', error));
    };
};

export const fetchMessagesInChat = (cid) => {
    return async (dispatch, getState) => {
        const headers = await addAuthHeader();
        return fetch(`${baseUrl}chat/${cid}`, {
            headers
        })
            .then(handleResponse)
            .then((data) => {
                dispatch(getMessages(data));
            })
            .catch((error) => console.log('Error:', error));
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
            })
            .catch((error) => console.log('Error:', error));
    };
};

export const putUserInChat = (cid, userId) => {
    return async (dispatch) => {
        const addUserId = true;
        const headers = await addAuthHeader(
            {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            addUserId
        );
        return fetch(`${baseUrl}chat/${cid}/${userId}`, {
            method: 'POST'
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
        return fetch(`${baseUrl}message/${messageId}/reaction`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ emoji })
        })
            .then(handleResponse)
            .then((data) => {
                dispatch(addReaction(data));
            })
            .catch((error) => console.log('Error:', error));
    };
};

export const putMessage = (cid, text) => {
    return async (dispatch) => {
        const addUserId = true;
        const headers = await addAuthHeader(
            {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            addUserId
        );
        return fetch(`${baseUrl}chat/${cid}/message`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ text })
        })
            .then(handleResponse)
            .then((data) => {
                dispatch(createMessage(data));
            })
            .catch((error) => console.log('Error:', error));
    };
};

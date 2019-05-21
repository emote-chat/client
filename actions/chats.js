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

const addUserToChat = (data) => {
    return {
        type: types.ADD_USER_TO_CHAT,
        payload: data
    };
};

const removeUserFromChat = (data) => {
    return {
        type: types.REMOVE_USER_FROM_CHAT,
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
            })
            .catch((error) => console.log('Error:', error));
    };
};

export const fetchMessages = (cid) => {
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

export const fetchCreateChat = (name) => {
    return async (dispatch) => {
        const headers = await addAuthHeader();
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

export const fetchAddUserToChat = (cid, uid) => {
    return async (dispatch) => {
        const headers = await addAuthHeader();
        return fetch(`${baseUrl}chat/${cid}/${uid}`, {
            method: 'POST',
            headers
        })
            .then(handleResponse)
            .then((data) => {
                // add chat id to payload
                data.cid = cid;
                dispatch(addUserToChat(data));
            })
            .catch((error) => console.log('Error:', error));
    };
};

export const fetchRemoveUserFromChat = (cid, uid) => {
    return async (dispatch) => {
        const headers = await addAuthHeader();
        return fetch(`${baseUrl}chat/${cid}/${uid}`, {
            method: 'DELETE',
            headers
        })
            .then(handleResponse)
            .then(({ chats_id: cid }) => {
                dispatch(removeUserFromChat(cid));
            })
            .catch((error) => console.log('Error:', error));
    };
};

export const fetchCreateReaction = (messageId, emoji) => {
    return async (dispatch) => {
        const headers = await addAuthHeader();
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

export const fetchCreateMessage = (cid, text) => {
    return async (dispatch) => {
        const headers = await addAuthHeader();
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

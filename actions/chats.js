import * as types from '../constants/actionTypes';
import { baseUrl } from '../constants/api';
import {
    handleResponse,
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

export const createSocketConnection = (data) => {
    return {
        type: types.CREATE_SOCKET_CONNECTION,
        payload: data
    };
};

export const addReaction = (data) => {
    return {
        type: types.ADD_REACTION,
        payload: data
    };
};

export const addUserToChat = (data) => {
    return {
        type: types.ADD_USER_TO_CHAT,
        payload: data
    };
};

export const removeUserFromChat = (data) => {
    return {
        type: types.REMOVE_USER_FROM_CHAT,
        payload: data
    };
};

const removeSelfFromChat = (data) => {
    return {
        type: types.REMOVE_SELF_FROM_CHAT,
        payload: data
    };
};

const socketCreateMessage = (socket, data) => {
    return async () => {
        return await socket.emit('createMessage', data);
    }
}

const socketAddReaction = (socket, data) => {
    return async () => {
        return await socket.emit('addReaction', data);
    }
}

const socketAddUserToChat= (socket, data) => {
    return async () => {
        return await socket.emit('addUserToChat', data);
    }
}

const socketRemoveUserFromChat = (socket, data) => {
    return async () => {
        return await socket.emit('removeUserFromChat', data);
    }
}

export const fetchChats = () => {
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

export const fetchAddUserToChat = (socket, cid, uid) => {
    return async (dispatch) => {
        const headers = await addAuthHeader();
        return fetch(`${baseUrl}chat/${cid}/${uid}`, {
            method: 'POST',
            headers
        })
            .then(handleResponse)
            .then((data) => {
                // add chat id to payload
                data.chats_id = cid;
                dispatch(addUserToChat(data));
                dispatch(socketAddUserToChat(socket, data));
            })
            .catch((error) => console.log('Error:', error));
    };
};

export const fetchRemoveUserFromChat = (socket, cid, uid, isSelf = false) => {
    return async (dispatch) => {
        const headers = await addAuthHeader();
        return fetch(`${baseUrl}chat/${cid}/${uid}`, {
            method: 'DELETE',
            headers
        })
            .then(handleResponse)
            .then(data => {
                if (isSelf) {
                    dispatch(removeSelfFromChat(data));
                } else {
                    dispatch(removeUserFromChat(data));
                }
                dispatch(socketRemoveUserFromChat(socket, data));
            })
            .catch((error) => console.log('Error:', error));
    };
};

export const fetchAddReaction = (socket, chatId, messageId, emoji) => {
    return async (dispatch) => {
        const headers = await addAuthHeader();
        return fetch(`${baseUrl}message/${messageId}/reaction`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ emoji })
        })
            .then(handleResponse)
            .then((data) => {
                data.chats_id = chatId;
                dispatch(addReaction(data));
                dispatch(socketAddReaction(socket, data));
            })
            .catch((error) => console.log('Error:', error));
    };
};

export const fetchCreateMessage = (socket, cid, text) => {
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
                dispatch(socketCreateMessage(socket, data));
            })
            .catch((error) => console.log('Error:', error));
    };
};

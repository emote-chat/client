import * as types from '../constants/actionTypes';
import { baseUrl } from '../constants/api';
import {
    handleResponse,
    addAuthHeader
} from '../helpers/api';
import io from 'socket.io-client';

export const setCurrentChat = (chat) => {
    return {
        type: types.SET_CURRENT_CHAT,
        payload: chat
    };
};

const setError = (error) => {
    return {
        type: types.SET_ERROR,
        payload: error
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

export const createSocketConnection = () => {
    return {
        type: types.CREATE_SOCKET_CONNECTION,
        payload: io(baseUrl.slice(0, baseUrl.search('api')))
    };
};

export const addReaction = (data) => {
    return {
        type: types.ADD_REACTION,
        payload: data
    };
};

export const setFoundUser = (data) => {
    return {
        type: types.SET_FOUND_USER,
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

const socketAddUserToChat = (socket, data) => {
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
    return async (dispatch) => {
        const headers = await addAuthHeader();
        return fetch(`${baseUrl}chat`, {
            headers
        })
            .then(handleResponse)
            .then((data) => {
                dispatch(getChats(data));
            })
            .catch((error) => {
                dispatch(setError(error));
            });
    };
};

export const fetchMessages = (chatId) => {
    return async (dispatch) => {
        const headers = await addAuthHeader();
        return fetch(`${baseUrl}chat/${chatId}`, {
            headers
        })
            .then(handleResponse)
            .then((data) => {
                dispatch(getMessages(data));
            })
            .catch((error) => {
                dispatch(setError(error));
            });
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
            .catch((error) => {
                dispatch(setError(error));
            });
    };
};

export const fetchFindUserByEmail = (email) => {
    return async (dispatch) => {
        const headers = await addAuthHeader();
        return fetch(`${baseUrl}user/${email}`, {
            headers
        })
            .then(handleResponse)
            .then((data) => {
                dispatch(setFoundUser(data));
            })
            .catch((error) => {
                dispatch(setError(error));
            });
    };
};

export const fetchAddUserToChat = (socket, chatId, userId) => {
    return async (dispatch) => {
        const headers = await addAuthHeader();
        return fetch(`${baseUrl}chat/${chatId}/${userId}`, {
            method: 'POST',
            headers
        })
            .then(handleResponse)
            .then((data) => {
                // add chat id to payload
                data.chats_id = chatId;
                dispatch(addUserToChat(data));
                dispatch(socketAddUserToChat(socket, data));
            })
            .catch((error) => {
                dispatch(setError(error));
            });
    };
};

export const fetchRemoveUserFromChat = (socket, chatId, userId, isSelf = false) => {
    return async (dispatch) => {
        const headers = await addAuthHeader();
        return fetch(`${baseUrl}chat/${chatId}/${userId}`, {
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
            .catch((error) => {
                dispatch(setError(error));
            });
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
                // add chat id to payload
                data.chats_id = chatId;
                dispatch(addReaction(data));
                dispatch(socketAddReaction(socket, data));
            })
            .catch((error) => {
                dispatch(setError(error));
            });
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
            .catch((error) => {
                dispatch(setError(error));
            });
    };
};

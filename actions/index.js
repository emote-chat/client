import * as types from '../constants/actionTypes';

// Action Creators
export function setCurrentUser(user) {
    return {
        type: types.SET_CURRENT_USER,
        payload: user
    };
}

export function setCurrentChat(chatId) {
    return {
        type: types.SET_CURRENT_CHAT,
        payload: chatId
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

export function createChat(id, name, users) {
    return {
        type: types.CREATE_CHAT,
        payload: {
            id,
            name,
            users
        }
    };
}

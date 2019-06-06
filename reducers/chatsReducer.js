import * as types from '../constants/actionTypes';

const chatsInitialState = {
    currentChat: null,
    chats: [],
    foundUser: null,
    addedUser: null,
    socket: null,
    error: null
};

function chatsReducer(state = chatsInitialState, action) {
    const { payload, type } = action;
    switch (type) {
        case types.GET_CHATS:
            return {
                ...state,
                chats: payload
            };

        case types.SET_CURRENT_CHAT:
            return {
                ...state,
                currentChat: payload
            };

        case types.SET_ERROR:
            return {
                ...state,
                error: payload,
                foundUser: null,
                addedUser: null
            };

        case types.CREATE_CHAT:
            return {
                ...state,
                chats: state.chats.concat(payload)
            };

        case types.CREATE_SOCKET_CONNECTION:
            return {
                ...state,
                socket: payload
            }

        case types.SET_FOUND_USER:
            return {
                ...state,
                foundUser: payload,
                addedUser: null
            }

        case types.ADD_USER_TO_CHAT:
            const { id, display_name: displayName, chats_id: chatId } = payload;

            const user = {
                id,
                displayName
            };

            const updatedChatWithUser = {
                ...state.currentChat,
                users: state.currentChat.users.concat(user)
            };

            return {
                ...state,
                addedUser: user,
                foundUser: null,
                chats: state.chats.map(
                    (chat) => chat.id === chatId ? updatedChatWithUser : chat
                ),
                currentChat: updatedChatWithUser
            };

        case types.REMOVE_SELF_FROM_CHAT:
            return {
                ...state,
                chats: state.chats.filter(
                    (chat) => chat.id !== payload.chats_id
                )
            }

        case types.REMOVE_USER_FROM_CHAT:
            const updatedChatWithoutUser = {
                ...state.currentChat,
                users: state.currentChat.users.filter(
                    user => user.id !== payload.users_id
                )
            };

            return {
                ...state,
                chats: state.chats.map(
                    (chat) => chat.id === payload.chats_id ? updatedChatWithoutUser : chat
                ),
                currentChat: updatedChatWithoutUser
            }

        default:
            return state;
    }
}

export default chatsReducer;

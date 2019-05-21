import * as types from '../constants/actionTypes';

const chatsInitialState = {
    currentChat: null,
    chats: [],
    addedUser: null
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

        case types.CREATE_CHAT:
            return {
                ...state,
                chats: state.chats.concat(payload)
            };

        case types.ADD_USER_TO_CHAT:
            const { id, display_name: displayName, cid } = payload;
            
            const user = {
                id,
                displayName
            };

            const cidIndex = state.chats.findIndex(
                (chat) => chat.id === cid
            );

            // make copy of chat to update
            const chatToUpdate = Object.assign({}, state.chats[cidIndex]);
            // concat added user and return new array of users
            const updatedChatUsers = { users: chatToUpdate.users.concat(user) };
            // make copy of updated chat to replace given chat in the state
            const updatedChat = { ...chatToUpdate, ...updatedChatUsers };

            return {
                ...state,
                addedUser: user,
                chats: state.chats.map(
                    (chat, i) => i === cidIndex ? updatedChat : chat
                )
            };

        case types.REMOVE_USER_FROM_CHAT:
            return {
                ...state,
                chats: state.chats.filter(
                    (chat) => chat.id !== payload
                )
            }

        default:
            return state;
    }
}

export default chatsReducer;

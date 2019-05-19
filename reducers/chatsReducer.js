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
        case types.CREATE_USER_IN_CHAT:
            const { id, display_name: displayName, cid } = payload;
            const user = {
                id,
                displayName
            };
            const cidIndex = state.chats.findIndex(
                (chat) => chat.id === cid
            );
            return {
                ...state,
                addedUser: user,
                chats: {
                    ...state.chats,
                    [state.chats[cidIndex].users]: [
                        ...state.chats[cidIndex].users,
                        user
                    ]
                }
            };
        case types.DELETE_USER_FROM_CHAT:
            return {
                ...state,
                chats: state.chats.filter(
                    (chat) => chat.id !== payload.cid
                )
            }
        default:
            return state;
    }
}

export default chatsReducer;

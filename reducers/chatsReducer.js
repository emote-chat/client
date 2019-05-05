import * as types from '../constants/actionTypes';

const chatsInitialState = {
    currentChat: null,
    chats: []
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
        default:
            return state;
    }
}

export default chatsReducer;

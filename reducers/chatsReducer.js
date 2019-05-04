import * as types from '../constants/actionTypes';

const userInitialState = {
    user: '',
    currentChat: 0,
    chats: []
};

function chatsReducer(state = userInitialState, action) {
    console.log('chatsReducer');
    console.log(state);
    const { payload, type } = action;

    switch (type) {
        case types.SET_CURRENT_USER:
            return {
                ...state,
                user: payload
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

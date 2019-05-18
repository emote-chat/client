import * as types from '../constants/actionTypes';

const messageInitialState = {
    messages: []
};

function messageReducer(state = messageInitialState, action) {
    const { payload, type } = action;

    switch (type) {
        case types.GET_MESSAGES:
            return {
                ...state,
                messages: payload
            };
        case types.CREATE_MESSAGE:
            return {
                ...state,
                messages: state.messages.concat(payload)
            };
        case types.ADD_REACTION: {
            const { messages_id } = payload;
            const newMessages = state.messages.map((m) => {
                return m.id == messages_id
                    ? { ...m, reactions: [...m.reactions, payload] }
                    : m;
            });
            return {
                ...state,
                messages: newMessages
            };
        }

        default:
            return state;
    }
}

export default messageReducer;

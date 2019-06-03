import * as types from '../constants/actionTypes';

const messageInitialState = {
    messages: []
};

function messageReducer(state = messageInitialState, action) {
    const { payload, type } = action;

    switch (type) {
        case types.GET_MESSAGES: {
            const messages = payload.map((m) => {
                const reactions = {};
                m.reactions.forEach(({ users_id, emoji }) => {
                    if (reactions[emoji]) {
                        const foundUser = reactions[emoji].find(
                            (u) => u === users_id
                        );
                        if (!foundUser)
                            reactions[emoji].push(users_id);
                    } else {
                        reactions[emoji] = [users_id];
                    }
                });
                return { ...m, reactions };
            });

            return {
                ...state,
                messages
            };
        }

        case types.CREATE_MESSAGE:
            return {
                ...state,
                messages: state.messages.concat(payload)
            };

        case types.ADD_REACTION: {
            const { messages_id, emoji, users_id } = payload;

            const newMessages = state.messages.map((m) => {
                const isMessage = m.id == messages_id;
                if (isMessage) {
                    const newReactions = Object.assign(
                        {},
                        m.reactions
                    );
                    newReactions[emoji]
                        ? newReactions[emoji].push(users_id)
                        : (newReactions[emoji] = [users_id]);
                    return { ...m, reactions: newReactions };
                } else {
                    return m;
                }
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

import * as types from '../constants/actionTypes';

const userInitialState = {
    user: {}
};

function userReducer(state = userInitialState, action) {
    const { payload, type } = action;
    switch (type) {
        case types.SET_CURRENT_USER:
            return {
                ...state,
                user: payload
            };
        default:
            return state;
    }
}

export default userReducer;

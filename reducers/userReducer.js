import * as types from '../constants/actionTypes';

const userInitialState = {
    currentUser: null
};

function userReducer(state = userInitialState, action) {
    const { payload, type } = action;
    switch (type) {
        case types.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            };
        default:
            return state;
    }
}

export default userReducer;

import * as types from '../constants/actionTypes';

export const setCurrentUser = (user) => {
    return {
        type: types.SET_CURRENT_USER,
        payload: user
    };
};

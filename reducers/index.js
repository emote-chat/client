import { combineReducers } from 'redux';
import userReducer from './userReducer';
import messageReducer from './messageReducer';
import chatsReducer from './chatsReducer';

export default (rootReducer = combineReducers({
    userReducer,
    messageReducer,
    chatsReducer
}));

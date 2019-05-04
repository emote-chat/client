import { combineReducers } from 'redux';
import messageReducer from './messageReducer';
import chatsReducer from './chatsReducer';

/* Current shape of state:
 {
  user: "David",
  currentChat: id 
  chats: [ { id: 1,
    name: 'Tea Chats',
    users: ['David', 'Nick'] },
    { id: 2,
      name: 'Coffee Chats',
      users: ['David', 'Ryan'] } ]
  messages: [
    { id: 0, chats_id: 1, user: 'David', message: 'ayyyyy', emojis: { David: ':joy:', Nick: ':laughing:' } },
    { id: 1, chats_id: 1, user: 'Nick', message: 'lmao', emojis: {} }
  ]
} */

export default (rootReducer = combineReducers({
    messageReducer,
    chatsReducer
}));

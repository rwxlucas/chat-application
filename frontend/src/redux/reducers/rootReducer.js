import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { chatReducer } from './chatReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
    user: userReducer
});
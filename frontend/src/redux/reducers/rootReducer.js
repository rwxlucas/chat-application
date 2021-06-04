import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { chatReducer } from './chatReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer
});
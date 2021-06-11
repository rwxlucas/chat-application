import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { chatReducer } from './chatReducer';
import { userReducer } from './userReducer';
import { LOGOUT } from '../actions/authAction';

const appReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
    user: userReducer
});

const rootReducer = (state, action) => {
    if(action.type === LOGOUT) return appReducer(undefined, action);
    return appReducer(state, action)
}

export default rootReducer;
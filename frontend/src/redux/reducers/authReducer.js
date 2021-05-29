import { LOGIN, LOGOUT } from '../actions/authAction';

const initialState = '';

export const authReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN:
            localStorage.setItem('xauthorization', action.payload);
            return state = action.payload;
        case LOGOUT:
            localStorage.removeItem('xauthorization');
            return state = '';
        default: return state;
    };
};
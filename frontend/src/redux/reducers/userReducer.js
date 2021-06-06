import { SET_USER_INFO } from '../actions/userAction';

const initialState = {};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                ...action.payload
            };
        default: return state;
    };
};
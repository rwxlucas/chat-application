import { SET_USER_INFO, ADD_FRIEND_REQUEST } from '../actions/userAction';

const initialState = {};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                ...action.payload
            };
        case ADD_FRIEND_REQUEST:
            return {
                ...state,
                friendList: [...state.friendList, action.payload]
            }
        default: return state;
    };
};
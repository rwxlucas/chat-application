import { SET_USER_INFO, ADD_FRIEND_REQUEST, REMOVE_FRIEND_REQUEST, ACCEPT_USER_REQUEST } from '../actions/userAction';

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
                friendRequests: [...state.friendRequests, action.payload]
            };
        case REMOVE_FRIEND_REQUEST:
            return {
                ...state,
                friendRequests: state.friendRequests.filter(item => item.username !== action.payload)
            };
        case ACCEPT_USER_REQUEST:
            return {
                ...state,
                friendRequests: state.friendRequests.filter(item => item.username !== action.payload)
            };
        default: return state;
    };
};
export const SET_USER_INFO = 'SET_USER_INFO';
export const ADD_FRIEND_REQUEST = 'ADD_FRIEND_REQUEST';

export const setUserInfoAction = (object) => ({ type: SET_USER_INFO, payload: object });
export const addFriendRequestAction = (object) => ({ type: ADD_FRIEND_REQUEST, payload: object });
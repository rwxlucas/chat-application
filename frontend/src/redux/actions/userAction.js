export const SET_USER_INFO = 'SET_USER_INFO';
export const ADD_FRIEND_REQUEST = 'ADD_FRIEND_REQUEST';
export const REMOVE_FRIEND_REQUEST = 'REMOVE_FRIEND_REQUEST';
export const ACCEPT_USER_REQUEST = 'ACCEPT_USER_REQUEST';

export const setUserInfoAction = (object) => ({ type: SET_USER_INFO, payload: object });
export const addFriendRequestAction = (object) => ({ type: ADD_FRIEND_REQUEST, payload: object });
export const removeFriendRequestAction = user => ({ type: REMOVE_FRIEND_REQUEST, payload: user });
export const acceptUserRequestAction = user => ({type: ACCEPT_USER_REQUEST, payload: user});
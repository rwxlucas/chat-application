export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const loginAction = (xauthorization) => ({type: LOGIN, payload: xauthorization});
export const logoutAction = () => ({type: LOGOUT});
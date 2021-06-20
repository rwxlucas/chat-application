import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { loginAction, logoutAction } from '../redux/actions/authAction';

const ProtectedRoute = ({ component: Component, auth, login, logout, ...rest }) => {

	useEffect(() => {
		const token = localStorage.getItem('xauthorization');
		if (token) login(token);
		else logout();
	}, [])

	return (
		<Route
			{...rest}
			component={props => (
				auth ? <Component {...props} /> : <Redirect to={'/login'} exact />
			)}
		/>
	)
}

const mapDispatchToProps = dispatch => ({
	login: xauthorization => dispatch(loginAction(xauthorization)),
	logout: () => dispatch(logoutAction()),
});


const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
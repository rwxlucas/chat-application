import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({component: Component, auth, ...rest}) => {
	return (
		<Route 
			{...rest}
			component={props => (
				auth ? <Component {...props} /> : <Redirect to={'/login'} exact />
			)}
		/>
	)
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, null)(ProtectedRoute);
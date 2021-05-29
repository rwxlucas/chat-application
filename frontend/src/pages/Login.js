import React, { useState } from 'react'
import { connect } from 'react-redux';
import { loginAction, logoutAction } from '../redux/actions/authAction'
import authService from '../services/authService'
import { Link } from 'react-router-dom'
import "./Login.scss"

const Login = (props) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const submitLogin = async (e) => {
		e.preventDefault();
		try {
			const loginRequest = await authService.login(username, password);
			props.login(loginRequest.data.xauthorization);
		} catch (error) {
			if (error) {
				setUsername('');
				setPassword('');
				e.target.username.focus();
				alert(error.response.data.message)
			}
		}
	}
	return (
		<div className={'login'} >
			<form onSubmit={e => submitLogin(e)} className={'login-box'} >
				<div className={'login-box-header'} >Login</div>
				<div className={'login-box-input'}>
					<input
						autoComplete="off"
						type="text"
						name={'username'}
						placeholder={'Username'}
						value={username}
						onChange={(e) => setUsername(e.target.value)} />
					<input
						autoComplete="off"
						type="password"
						name={'password'}
						placeholder={'Password'}
						value={password}
						onChange={(e) => setPassword(e.target.value)} />
				</div>
				<div className={'login-box-button'} >
					<button>Enter</button>
				</div>
				<div className={'login-box-footer'} >
					<div>Don't have an account? <br /> <Link to={'/register'} ><span>Register</span></Link> </div>
				</div>
			</form>
		</div>
	)
}

const mapDispatchToProps = dispatch => ({
	login: xauthorization => dispatch(loginAction(xauthorization)),
	logout: () => dispatch(logoutAction()),
});

export default connect(null, mapDispatchToProps)(Login);
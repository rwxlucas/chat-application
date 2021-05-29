import React, { useState } from 'react'
import { connect } from 'react-redux';
import { loginAction, logoutAction } from '../redux/actions/authAction'
import authService from '../services/authService'
import { Link, useHistory } from 'react-router-dom'
import "./Login.scss"

const Register = ({ login, ...rest }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const history = useHistory();

	const submitRegister = async (e) => {
		e.preventDefault();
		try {
			const registerRequest = await authService.register(username, password, email);
			if(registerRequest.status === 200) return history.push('/login');
		} catch (error) {
			if (error) {
				setUsername('');
				setPassword('');
				setEmail('');
				e.target.username.focus();
				alert(error.response.data.message);
			}
		}
	}
	return (
		<div className={'login'} >
			<form onSubmit={e => submitRegister(e)} className={'login-box'} >
				<div className={'login-box-header'} >Register</div>
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
					<input
						autoComplete="off"
						type="email"
						name={'email'}
						placeholder={'Email'}
						value={email}
						onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div className={'login-box-button'} >
					<button>Submit</button>
				</div>
				<div className={'login-box-footer'} >
					<div>Already have an account? <br /> <Link to={'/login'} ><span>Log in</span></Link> </div>
				</div>
			</form>
		</div>
	)
}

const mapDispatchToProps = dispatch => ({
	login: xauthorization => dispatch(loginAction(xauthorization)),
	logout: () => dispatch(logoutAction()),
});

export default connect(null, mapDispatchToProps)(Register);
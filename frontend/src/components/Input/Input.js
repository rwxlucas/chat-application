import React from 'react'

import './Input.scss'

const Input = ({ icon, placeholder, inputValue, setInputValue }) => {

	return (
		<div className={`
		input
		${icon ? 'icon' : ''}
		`} >
			<input
				type="text"
				placeholder={placeholder ? placeholder : ''}
				value={inputValue}
				onChange={e => setInputValue(e.target.value)} />
			{icon ? <i className={icon}></i> : null}
		</div>
	)
}

export default Input

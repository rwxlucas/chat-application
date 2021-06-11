import React, { useState } from 'react'

import './Input.scss'

const Input = ({ icon, iconPos, placeholder, inputValue, setInputValue, inpClass, inpDisabled }) => {

	const [replacement, setReplacement] = useState('');

	return (
		<div className={`${icon ? 'icon' : ''} ${inpClass ? inpClass : 'input'}`} >
			<input
				type="text"
				placeholder={placeholder ? placeholder : ''}
				value={inputValue ? inputValue : replacement}
				disabled={inpDisabled}
				onChange={e => setInputValue ? setInputValue(e.target.value) : setReplacement(e.target.value)} />
			{icon ? <i className={icon}></i> : null}
		</div>
	)
}

export default Input
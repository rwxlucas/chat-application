import React from 'react'

import './Input.scss'

const Input = ({ icon, iconPos, placeholder, inputValue, setInputValue, inpClass, inpDisabled }) => {

	return (
		<div className={`${icon ? 'icon' : ''} ${inpClass ? inpClass : 'input'}`} >
			<input
				type="text"
				placeholder={placeholder ? placeholder : ''}
				value={inputValue}
				disabled={inpDisabled}
				onChange={e => setInputValue(e.target.value)} />
			{icon ? <i className={icon}></i> : null}
		</div>
	)
}

export default Input
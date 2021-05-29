import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Input.scss'

const Input = ({icon, placeholder, inputValue, setInputValue}) => {

	return (
		<div className="input" >
			<input 
				type="text" 
				placeholder={placeholder ? placeholder : ''} 
				value={inputValue} 
				onChange={e => setInputValue(e.target.value)} />
			{icon ? <FontAwesomeIcon icon={icon} /> : null}
		</div>
	)
}

export default Input

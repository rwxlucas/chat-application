import React from 'react'
import './ChatDisplay.scss'

const ChatDisplay = ({image, name, time, message, active}) => {
	return (
		<div className={`chatDisplay ${active ? 'active' : ''}`}>
			<div>
				<img src={image} alt={`${name} photo`} />
			</div>
			<div>
				<div>
					<span>{name}</span>
					<span>{time}</span>
				</div>
				<div>
					<span>{message}</span>
				</div>
			</div>
		</div>
	)
}

export default ChatDisplay

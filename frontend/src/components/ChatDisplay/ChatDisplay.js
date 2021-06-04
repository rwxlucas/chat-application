import React from 'react'
import { connect } from 'react-redux'
import { openChatAction, loadMessagesAction } from '../../redux/actions/chatAction'
import './ChatDisplay.scss'

const ChatDisplay = ({image, name, time, message, active, open}) => {

	const openMessagesChat = () => {
		open(name, image)
	}

	return (
		<div onClick={openMessagesChat} className={`chatDisplay ${active ? 'active' : ''}`}>
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

const mapDispatchToProps = (dispatch) => ({
	open: (name, image) => dispatch(openChatAction(name, image)),
	loadMessages: (messages) => dispatch(loadMessagesAction(messages))
});


export default connect(null, mapDispatchToProps)(ChatDisplay);
import React from 'react'
import { connect } from 'react-redux';
import './ChatMessages.scss'

const ChatMessages = ({ chat }) => {
	const chatMessagesStyle = {
		height: chat.open ? '100%' : ''
	}

	return (
		<div className={'chatMessages'} style={chatMessagesStyle} >
			<div className={'chatMessages-header'} >
				<img src={chat.image} alt={`${chat.name} photo`} />
				<div>{chat.name}</div>
			</div>
			<div className={'chatMessages-body'} >
				body
			</div>

			<div className={'chatMessages-footer'} >
				footer
			</div>
		</div>
	)
}


const mapStateToProps = (state) => ({ chat: state.chat })

export default connect(mapStateToProps, null)(ChatMessages);
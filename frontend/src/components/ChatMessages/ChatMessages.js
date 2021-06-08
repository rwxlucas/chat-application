import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import Input from '../Input/Input';
import './ChatMessages.scss';

const ChatMessages = ({ chat, user }) => {

	useEffect(() => {
		console.log(chat);
	}, [])

	const [msgInput, setMsgInput] = useState('');

	const chatMessagesStyle = {
		height: chat.open ? '100%' : ''
	}

	const renderMessages = () => {
		return chat.messages.map(msg => (
			<div className={`chatMessages-body-${msg.username == user.username ? 'messageUser' : 'messageFriend'}`} >
				<div> {msg.message} </div>
				<div> {msg.date} </div>
			</div>
		))
	};

	const sendMessage = e => {
		e.preventDefault();
		console.log(msgInput);
		setMsgInput('');
	}

	return (
		<div className={'chatMessages'} style={chatMessagesStyle} >
			<div className={'chatMessages-header'} >
				<img src={chat.image} alt={`${chat.name} photo`} />
				<div>{chat.name}</div>
			</div>
			<div className={'chatMessages-body'} >
				{renderMessages()}
			</div>
			<div className={'chatMessages-footer'} >
				<form onSubmit={e => sendMessage(e)} >
					<Input inputValue={msgInput} setInputValue={setMsgInput} />
				</form>
			</div>
		</div>
	)
}


const mapStateToProps = (state) => ({
	chat: state.chat,
	user: state.user
})

export default connect(mapStateToProps, null)(ChatMessages);
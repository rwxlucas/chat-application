import React, { useState } from 'react'
import { connect } from 'react-redux';
import Input from '../Input/Input';
import { sendMessage as socketSendMessage } from '../../socket/socket';
import { loadMessagesAction } from '../../redux/actions/chatAction';
import moment from 'moment';
import './ChatMessages.scss';

const ChatMessages = ({ chat, user, loadMessage }) => {
	const [msgInput, setMsgInput] = useState('');

	const chatElement = document.getElementById('chatOverflow');

	const chatMessagesStyle = {
		height: chat.open ? '100%' : ''
	}

	const renderMessages = () => {
		if (chat.messages.length > 0) {
			return chat.messages.map((msg, index) => (
				<div key={`${msg.username}-msg-${index}`} className={`chatMessages-body-${msg.username === user.username ? 'messageUser' : 'messageFriend'}`} >
					<div> {msg.message} </div>
					<div> {msg.date} </div>
				</div>
			))
		}
	};

	const sendMessage = (e) => {
		e.preventDefault();
		loadMessage({ username: user.username, message: msgInput, date: moment().format('LT') }); // DANDO ERRO AQUI
		socketSendMessage(chat.name, msgInput, user.username);
		setMsgInput('');
		if (chatElement && chatElement.scrollHeight) setTimeout(() => chatElement.scrollTop = chatElement.scrollHeight - chatElement.clientHeight, 1);
	}

	return (
		<div className={'chatMessages'} style={chatMessagesStyle} >
			<div className={'chatMessages-header'} >
				<img src={chat.image} alt={`${chat.name}`} />
				<div>{chat.name}</div>
			</div>
			<div className={'chatMessages-body'} id={'chatOverflow'} >
				{renderMessages()}
			</div>
			<div className={'chatMessages-footer'} >
				<form onSubmit={(e) => sendMessage(e)} >
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

const mapDispatchToProps = (dispatch) => ({
	loadMessage: msg => dispatch(loadMessagesAction(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessages);
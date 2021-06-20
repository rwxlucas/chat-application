import React from 'react'
import { connect } from 'react-redux'
import { openChatAction, loadMessagesAction, closeChatAction } from '../../redux/actions/chatAction'
import './ChatDisplay.scss'

const ChatDisplay = ({chat, close, friends, active, open}) => {

	const openMessagesChat = (displayName, image, id) => {
		if(chat.id && chat.id == id) open(displayName, image, id);
		else {
			close();
			open(displayName, image, id);
		}
	};

	const renderFriendList = () => friends.map((user, index) => (
		(
			<div key={`friendList${index}`} onClick={() => openMessagesChat(user.username, user.image, user.id)} className={`chatDisplay ${active ? 'active' : ''}`}>
				<div>
					<img src={user.image} alt={`${user.displayName}`} />
				</div>
				<div>
					<div>
						<span>{user.displayName}</span>
						<span>{'08:00'}</span>
					</div>
					<div>
						<span>{'message'}</span>
					</div>
				</div>
			</div>
		)
	))

	return ( renderFriendList() )
}

const mapDispatchToProps = (dispatch) => ({
	open: (name, image, id) => dispatch(openChatAction(name, image, id)),
	close: () => dispatch(closeChatAction()),
	loadMessages: (messages) => dispatch(loadMessagesAction(messages))
});

const mapStateToProps = (state) => ({
	chat: state.chat
})
export default connect(mapStateToProps, mapDispatchToProps)(ChatDisplay);
import React, { useEffect, useState } from 'react';
import { logoutAction } from '../../redux/actions/authAction'
import { connect } from 'react-redux';
import Input from '../../components/Input/Input';
import ChatDisplay from '../../components/ChatDisplay/ChatDisplay';
import LittleMenu from '../../components/LittleMenu/LittleMenu';
import SearchFriend from '../../components/SearchFriend/SearchFriend';
import Settings from '../../components/Settings/Settings';
import ChatMessages from '../../components/ChatMessages/ChatMessages';
import { searchUser as searchUserService, searchUserById } from '../../services/friendService';
import { getUserInfo } from '../../services/userService';
import { addFriendRequestAction, setUserInfoAction } from '../../redux/actions/userAction';
import { socketInit, disconnectSocket } from '../../socket/socket';
import { socket } from '../../socket/socket'

import './Dashboard.scss';
import FriendRequests from '../../components/FriendRequests/FriendRequests';
import { loadMessagesAction } from '../../redux/actions/chatAction';

const Dashboard = ({ logout, user, setUserInfo, addFriendRequest, loadMessage, ...rest }) => {

	const [searchChat, setSearchChat] = useState('');
	const [searchUser, setSearchUser] = useState('');
	const [searchUserList, setSearchUserList] = useState(null);
	const [showMenu, setShowMenu] = useState(false);
	const [toggleChatDiv, setToggleChatDiv] = useState(false);
	const [toggleAddFriend, setToggleAddFriend] = useState(false);
	const [toggleSettingsDiv, setToggleSettingsDiv] = useState(false);
	// const [chatMessageBol, setChatMessageBol] = useState(false);
	const [toggleFriendRequests, setToggleFriendRequests] = useState(false);
	const [friendList, setFriendList] = useState([]);
	const chatElement = document.getElementById('chatOverflow');

	const chatDivStyle = { transform: toggleChatDiv ? 'translateX(-105%)' : '' };
	const settingsDivStyle = { transform: toggleSettingsDiv ? '' : 'translateX(-105%)' };
	const addFriendStyle = { transform: toggleAddFriend ? '' : 'translateX(105%)' };
	const friendRequestsStyle = { transform: toggleFriendRequests ? '' : 'translateX(105%)' };

	const backToChatDiv = () => { setToggleChatDiv(false); setToggleAddFriend(false); setSearchUser(''); setSearchUserList(null); };
	const toggleMenu = () => (setShowMenu(!showMenu));
	const addFriendOption = () => { setToggleChatDiv(true); setToggleAddFriend(true); toggleMenu(); };
	// const openChatMessage = () => { setChatMessageBol(!chatMessageBol) };
	const openFriendRequests = () => { setToggleChatDiv(!toggleChatDiv); setToggleFriendRequests(!toggleFriendRequests) };

	const searchUserFunction = async () => {
		if (!searchUser) return;
		try {
			const user = await searchUserService(searchUser);
			if (user.status === 200) setSearchUserList([user.data]);
		} catch (error) {
			if (error && error.response) return setSearchUserList([]);
		}
	}

	const optionsList = [
		{ name: 'Adicionar um amigo', exec: () => { addFriendOption() } },
		{ name: 'Logout', exec: () => { logout(); disconnectSocket(user.username) } },
	]

	const friendRequest = payload => { addFriendRequest(payload) };
	const handleMessage = payload => {
		loadMessage(payload);
		if (chatElement && chatElement.scrollHeight) setTimeout(() => chatElement.scrollTop = chatElement.scrollHeight - chatElement.clientHeight, 1);
	};

	useEffect(() => {
		(() => {
			setTimeout(async () => {
				const userInfo = await getUserInfo();
				setUserInfo(userInfo.data);
				socketInit(userInfo.data.username);
				const friends = [];
				for (const user of userInfo.data.friendList) {
					const response = await searchUserById(user).catch(err => console.log(err));
					friends.push(response.data);
				}
				setFriendList(friends);
				socket.on('friendRequest', (payload) => friendRequest(payload));
				socket.on('chat message', (payload) => handleMessage(payload));
			}, 200);
		})();
	}, [])

	return (
		<div className={'dashboard'} >
			<div className={'dashboard-leftDiv'} >
				<div className="dashboard-leftDiv-settings" style={settingsDivStyle} >
					<Settings back={setToggleSettingsDiv} />
				</div>
				<div className={'dashboard-leftDiv-header'} >
					{
						user.image ?
							<img onClick={() => setToggleSettingsDiv(!toggleSettingsDiv)} src={user.image} alt="" /> :
							<div onClick={() => setToggleSettingsDiv(!toggleSettingsDiv)} className={'dashboard-leftDiv-header-withoutImage'}> <i className="fas fa-user"></i> </div>
					}
					<div className={'dashboard-leftDiv-header-title'} >{user.displayName}</div>
					<div className={'dashboard-leftDiv-header-options'}  >
						{
							user.friendRequests && user.friendRequests.length > 0 ?
								<i onClick={openFriendRequests} class="fas fa-exclamation dashboard-leftDiv-header-options-friendRequests"></i> : null
						}
						<i onClick={toggleMenu} className="fas fa-bars"></i>
						<LittleMenu open={showMenu} options={optionsList} />
					</div>
				</div>

				<div className={'dashboard-leftDiv-chatDiv'} style={chatDivStyle}>
					<div className={'dashboard-leftDiv-chatDiv-searchChat'} >
						<div>
							<Input inputValue={searchChat} setInputValue={setSearchChat} placeholder={'Look for someone to chat'} icon={'fas fa-search'} />
						</div>
					</div>

					<div className={'dashboard-leftDiv-chatDiv-chats'} >
						<ChatDisplay friends={friendList} />
					</div>
				</div>

				<div className={'dashboard-leftDiv-addFriend'} style={addFriendStyle} >
					<SearchFriend back={backToChatDiv} icon={'fas fa-arrow-left'} value={searchUser} setValue={setSearchUser} exec={searchUserFunction} users={searchUserList} />
				</div>

				{
					user.friendRequests && user.friendRequests.length > 0 ?
						<div className={'dashboard-leftDiv-friendRequests'} style={friendRequestsStyle} >
							<FriendRequests back={openFriendRequests} requests={user.friendRequests} />
						</div> : null
				}
			</div>

			<div className={'dashboard-rightDiv'}>
				<ChatMessages />
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logoutAction()),
	setUserInfo: (obj) => dispatch(setUserInfoAction(obj)),
	addFriendRequest: (obj) => dispatch(addFriendRequestAction(obj)),
	loadMessage: msg => dispatch(loadMessagesAction(msg))
});
const mapStateToProps = (state) => ({
	user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
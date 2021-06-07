import React, { useEffect, useState } from 'react';
import { logoutAction } from '../../redux/actions/authAction'
import { connect } from 'react-redux';
import Input from '../../components/Input/Input';
import ChatDisplay from '../../components/ChatDisplay/ChatDisplay';
import LittleMenu from '../../components/LittleMenu/LittleMenu';
import SearchFriend from '../../components/SearchFriend/SearchFriend';
import Settings from '../../components/Settings/Settings';
import ChatMessages from '../../components/ChatMessages/ChatMessages';
import { searchUser as searchUserService } from '../../services/friendService';
import { getUserInfo } from '../../services/userService';
import { addFriendRequestAction, setUserInfoAction } from '../../redux/actions/userAction';
import { socketInit, sendMessage, disconnectSocket } from '../../socket/socket';
import { socket } from '../../socket/socket'

import './Dashboard.scss';
import FriendRequests from '../../components/FriendRequests/FriendRequests';
const Dashboard = ({ logout, user, setUserInfo, addFriendRequest, ...rest }) => {

	const [searchChat, setSearchChat] = useState('');
	const [searchUser, setSearchUser] = useState('');
	const [searchUserList, setSearchUserList] = useState(null);
	const [showMenu, setShowMenu] = useState(false);
	const [toggleChatDiv, setToggleChatDiv] = useState(false);
	const [toggleAddFriend, setToggleAddFriend] = useState(false);
	const [toggleSettingsDiv, setToggleSettingsDiv] = useState(false);
	const [chatMessageBol, setChatMessageBol] = useState(false);
	const [toggleFriendRequests, setToggleFriendRequests] = useState(false);

	const chatDivStyle = { transform: toggleChatDiv ? 'translateX(-105%)' : '' };
	const settingsDivStyle = { transform: toggleSettingsDiv ? '' : 'translateX(-105%)' };
	const addFriendStyle = { transform: toggleAddFriend ? '' : 'translateX(105%)' };
	const friendRequestsStyle = { transform: toggleFriendRequests ? '' : 'translateX(105%)' };

	const backToChatDiv = () => { setToggleChatDiv(false); setToggleAddFriend(false); setSearchUser(''); setSearchUserList(null); };
	const toggleMenu = () => (setShowMenu(!showMenu));
	const addFriendOption = () => { setToggleChatDiv(true); setToggleAddFriend(true); toggleMenu(); };
	const openChatMessage = () => { setChatMessageBol(!chatMessageBol) };
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
		{ name: 'Logout', exec: () => {logout(); disconnectSocket(user.username)} },
	]

	const friendRequest = (payload) => { addFriendRequest(payload); }

	useEffect(async () => {
		const userInfo = await getUserInfo();
		setUserInfo(userInfo.data);
		socketInit(userInfo.data.username);
		socket.on('friendRequest', (payload) => {friendRequest(payload); console.log('alo')})
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
							<Input
								inputValue={searchChat}
								setInputValue={setSearchChat}
								placeholder={'Look for someone to chat'}
								icon={'fas fa-search'} />
						</div>
					</div>

					<div className={'dashboard-leftDiv-chatDiv-chats'} >
						<ChatDisplay
							name={'Lucas'}
							message={'Você está em casa cara? Poxa, te chamei umas 30 vezes.'}
							image={'data:image/jpeg;base64,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'}
							time={'08:03'}
						/>
						<ChatDisplay
							name={'Teste'}
							message={'Você está em casa cara? Poxa, te chamei umas 30 vezes.'}
							image={'data:image/jpeg;base64,/9j/iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAY+0lEQVR42u1dCXhUVZYOrW339LQ9n35uQ2MMoVJvrUAIkKr3qiqVvRJRFkV22UGUTXawEVni2jraLq0ztOO0tk5r2y5tj9iOiuIyitq2+9YKIqgo2IoQFvHO+d9SdauSAGpeLcm933e/qlQqleSec8/5z3/OPbegQIzDGrIvVKkpxkZNi7zv9w/oLVakCw1Jqhij6+Eduh5lgUAlUxXzYXr5CLEyXWAoSmgO7fq9gUCU6XqEQQlUxdhSVBT7sVidzm72ZWMeCf1rCN0VPj0ekOXQYvp2N7FCnXhoijmZhL3fFnyEwQKQJWjxy6EZYnU6u9kvqagjYe90d75t/o1dilIxQqxOpzf7fYo0PfJe0udHmKZE9wAIitXp9CN2pKwa9wHpu8Kn+Y0mzH7XGKoanaZzOx+KoKnmtWJlusDoXlxeSH5/K+/3NdV41ufz/UysThcYumreyJt+TY18pSh9g2JlusDwqf3KSOhf8aZfUoxLxcp0Gd9v3Jbc/Yj3jfd7nWicIFamC4xevQxdVRHzc4SPQP1dZyhK+OqU3a8a7xYWFh4jVqYLjB49tGMJ7G3mkb8iGQvb/4nyH4IoIkYw6FeDjbIcHqlL5iRNNqaoyBjK4YH4Xg9/75+L1c2L3R8ZkUz0RJiqhrdrWnmh+/2ioqIfU2g4gOoAziVccIemRF7WNPMjep+VHYTlSJ1RfMZeS6kUY52mhJbJ8oAQFEesdu6Nbqoauss1/3ikHX0jvkHZPoNcw2Uk+JdJ6Htc4dr0cJRnCduc7nttIim8j6jlp1U5Os13UuR4sew5Mkp9FT3sIg8n7tfCBxAN0A5/DEJzhc4LVpNNpvoMe5YY1tfWVJxHv2m9rhYb1vN0hSCw+Q6yiZIkHS0kkOURkEOj0ndzcpc7r6kRW6AkcDLrrF9DPYtNHcKaVo5hZ948jY3+02w2ft18NnH9QjbukXls1D2z2JBfT2Z1i0aw4JC4/fP4WcVM+/zwM35/qEZIwYNxilL+rwBiVMkzhHb0LJq/JDN+C5nzB8jnP07C+D9VM17U1fDH7ZlwayeT4AJ9KllkzOns9CsnWAI+59VlbNaHq9mcTy5msz9qtudWbuLrjzEvZue+vZyd/dBcVr9kBOsTillWAQrB1xaoqtl84oml/yyk9h2HpmlHyXJFuaYFx1H4dhMJeQMAWNJvJ8FZ+mzLl1tmnYRfMTDOTvvleDbhyYVsxsaVtsBJwLO2rGYzN69iMz849ISiuAoy6dnFrGHZKNa7T9T6HW7I6eQb1mrFSeApxiFGcXH5vyAEQ/yuK+bfQOGmC/pQIK1N4FYaZdFxg9iI/z6PTX9zubWLZ209fIEfVBm2kPKQIpz98FxmjhhoWZekNSCgqJmv+pRgXyHd9scRkhQ0qUbvGhA17sK1JWyFFrZEibBiyZ54LtFrsmp/T1PbUAB6T1moik16bjE7/9NLrN37fYXe1oRFgGsAhqA0M4cNqNJYC2/y+8vDQtTcKCwMHEOh2kRVM9cTSt/bltAhWAjap9jPI32jbHSkks2Px9gVQ6vZrWNr2ANTatnjM+rY83Ma2Ovz69nK06tYsdLa/NfMGcZmbiJhfbjKEwWwrcFqyy0M+6/prHd5pRU9JC1BeIvNG3TxQfz8CYpkLtCU8FttmXXJEToEXj8gyuaSsNeMqmHPzGxgG5fE2WcXNrI9q5vY182nsn3NTWwfPd/rzJZVTWxeY5WlMG1hgMHXTbJ2qlcKYE1yKwCLo++fzcqMqkTIaCtB5H1FMfQuKfhjj/X9TNHDsykOfzdd8DDfxc4uHxSMskuGVLHHz6tjH17QaAl1f3NSwLtpfrWy9dxFr28n5Ti1Imp9joX4dc4tKDYWGHnPTEtAnioBXALhjLFrz7eVQE6GisA2iGa6lPD9SmiwpoefTzfzrokPEYJeRDv3kXPr2CfLGhO7GgLftbJtgadPvPfdRXFW0dvBA/T5/em5+7VL9kAg4x6dnxElmENKMOaBOay0fywFE1BEcy+o6M4fyvXq61Pk8O1g4loJnnZkHZn4a8+qZm8tjFsChODb2+GHmlCYp8lNBAK28CX6/Gk1MXbnhJoUS6D6DVZeXcfGP7EgQ5agmQ2/4zym4+9SOWCoBpd3auFLkjGBkixbWpl62vG1/aLsppHVbPPSuOXHW1Yf/k5vb8JN3DepNuH/8XsACPH51w2vZj7JVgwXD5TXkBI8Nt8y1Z5jAsIdp181geMJIvZBlM7IGBYV9T8J7Fzy0IX9D0Mw/ckHX3lmtQXmILCWVd9P6OkKcDOBxUIHdBWRwP+DlOxren3niia2wokOeCUoM6ssitcChh6Fh9akyAOkU/XMM22ewGUMKQOJaKgTsXf9BtCu/ytfgCk7sfuM+hh7aW59wrd3lOATGIA+97Ih1aynlFS4P06stRQAv+/zi+JscVOVZRk0jhYO9I6yQVdPtASEEM4zV0BKds5ry9iApoaU8LDT1CdSmnUU+frt6bs+SrH778fXsC9X2H66owVvRQA0d9Jc5ISArs9/jEAlXICrIJ8vb2QXDExTAsXO8lVOGszGP77AEpRFC3ckN/CxTRKdddt0Vl5bl1AAi7JWwzsoVe3PZ9l3U3Rzga6b+13ha44Pnlods8gZmOfdq7wRvqsAX5CC4feVOApQRqDrBSKH9qxOjRTwPpBIAIkKxxzCNJf2i7HGVWPYlBeWJpJA35ouhs/faieO8HzSc0vYkBsms+CguJ2PUMxWHIXf3zeSl5KP0XErqoy5PB3hY2GvIl+PHefVrk9XgM8vamJnhSstIskKAUsj7E0nuuDfu9vhEm4fV0NhYtRSGJ23BpTZK4tUkyKMttLBM95fafH9AIuudeCnnSVMfu/cdy6in1vAhtw4hUUnDk5kC/kagmT6GDSx+T8+X0X+HVChUzU/wtEqXvjYVUFa1HsJje9Z7e2ub0UCkbI1DbBJIJj/UFmUbVoSbxNvQGEQcj43q4ENJ2q5OM0a2IoQopRxlIXOaGTx5aMt8w1iZ8JTC61djYnnSAKNuGsGG3ztJItuho/v3ZcE2zPU5o53STDiRd7AcbXu3ct/ko97/8h04WMnIbx7imJxmPxdHu309hRgG7GAleVRS5CYJinAx79oPKgS7m22f+5Xw6q/rigNH+jpUNB80YhVP1BsWAqBWL5PRcwikzDxHCAS7kOGwH12JZGutp+ZVPXwK+hMks/ov1u62QfwGkgU7ivz7PDOC8HDouxc2TYdjK+3krCRLHIVoJqUAcJtTwHweos1G7850Bzf9uaChv2XEzaI0c/h//FxIWOKQihmymxP2C7ZpaR8P/yNogw4P6/Rvi6b8/mCCyzUUKOSvbkgnkDcHQ7wyL/fMqaGjY1WsquHVbN/UEjHCxbPkTcwOQVAIunTdhQAgsdnXEOfNTocPbBmZPUevI6/f9PiOPvd2bUWoKxwMEJPJ/WcSDvryYnX4PqKnfcBgwTo9Tj9/tkU+kIRJT45FYj8g/ISp+al8NFFg/6JfbzZH0jJF6+E7wpl7dRaVkSmGMoGggcAE4J1ASYEunlpo2X2Fac+AAL4LE0BdjmfB+FfOrjKEpj9mSZ7kH6HS07hEWHr2wQi755Qyy4iEmliVaWVaDLLqH6QAGY5TYN+HxRtJOGI2Q0xdiklsf5A739pbtyySPgsuES8T04tGfuopKR/nzyL81GeFfnUNf0l9A/V9LPN/j4PkT6InDtpUU92ULS760DqvDbftgRfX9xkJZF4BYBgdiAKabaFjvkFCf5Jqh3gw0V8Jj779+Nt0ohXFj4TiSgDmOIDUrSNS+yJ51vJ8kDR3L8V79/DJbLw9V+m1bM+gaQ7sKqIlcgL/vLYcfmRzaM/1Gb4ogn/BvP4pAP4vET4WMhNtNiDQ5UWt+AqAbh9ZPrm0M7DrgPpY5QlXQB8+XtkzpFoWkep5ZtG1rAx0cqE5XKtGD5ziFlp/Y6DMZRu+NjSxtx9iKwlNgjCTllNKp2dEDJuK8iDnoTdVNm42aV3NWeBQbN6LXw+0/cy0cinEdDsybF4+Dt8ju/FDgukhFu2hXKVAq5D4nY9HvFzZ5DwYUm85Ctca3IpUdV8tZJlCUpC03Ib9PmNsTzowz9wJaHljsjgfVslQBJpCVG5mpNV5FG61g4SV9TU77kZSSjMikFVVkYyE2RVi8NVTKmuTGQsHTzwmRwIBXIU9JWdwqd0Ifwp5D/hW1tWZU74/CJC6daTSYfpT0fp6QgdX0uclZCd8HA5gTrQxK4Jz6QSv07WprJvOigMP4gy+FyT/w+obeqtrulXnKLMV+fVZ2THHMyc7nWsD/z7HeRbkeBBiAjgF+xto3Q8QthDzSg7t9YuIn1war0VLcB67cmwBePT1nCfUgoewNGyHHMFiFX5bprYRQAymfL7h+tXXdS9Y3kT+4hQOgQMdI7HLYTQQQahHmC/Ewl8mzIzL6YLGBc0xhJ4wD5EEtmcM0fPjz9e+ynV6D/nmn4IH7voizQCJlfmrnZQ+u7DQOjZmFBYWC9Q1zJ3iESRQ1flRjmXEpnOm36QHi+Sz8ym6e9sExYJ7KYb2lodTJTwF1kHhEhSuDX7bpx8OYUve1fn3k7K59niJLCQwi5ROG5AN36TVQXAqVue8HEJlRax+z2xAn+eXMvlCqw+AzuzdmsJmhtQgcKr/O6/nipq9zULYXkFCFGreHYslmIFKF18XXZ2v2SOdkkfK2YmJg3ki9j93k1srj9PSVoBOyIIfyLLwaIMi3/YEUT6PMrvfmTdxO733gogbT3MtMvZEqeH5ODczJZ0F/fvTwULuy00qtuJFrBWYvdnBgv8lk468xQxyeL5Hj1C/5Q58y+bV7ihHwgKnMrNxRi6s0YEfyegjRJ6JVk9tA/X2WWS+HndNf/wRw9RDluY/8wRWSCHrDMLfEioGVdmCP0b1S7tC/DXRJUvWy7ITsKnK4PBh6fXcdGA1WPo9Yw0mqKmBZclzD+BP5yj2yd8f8bdADZdI9ffgDiBvZIUMb0FfwXaUTzvDw38X9JEoQDZyXIudY6uJbuKGIu8VQBfRFWJgwb6d/PlG5cI858tN3APHarh3YBzla2X1G/wLNf8IwyZUSvQfzazhKiwRmcTLYEDzA969qw40cNq3+A1fPh3A1G/+wX6zxophArjkZGUM4v7Vb8Z8dACmOt5/4/mTCLtm0U3QGv/i9NScQDOEHp1wPN43KFjXaZAvyxEpucdKlTYIxQgy6xgbVrhqHGDNwqghso0ujfXJX+Qm962rDEnq366yoT1XT+jISU5pCvhdR4RQOE4H/+jjYtA/7lRLobCVlRjOXmBNzwhhOg+nKm8AqwaJABgLhBCOKuQJITss4SepIc1JbiKDwF/Q122BP+f/UhgO1U4j45WcpGAsavUi47juh76NR8B3E316oIBzD4jiMfpNcmycTo4Qn0FjGjHK4AavpNXACQjRAiYG4zgPErH9+RCQU96CuBGCz4F/PRMoQC5MHHMfFkaF6D4o8M7XgG4EjAowIbZovY/V7iAlYNSFUD3h8d6YAHMJ3kF+Ov59UIBckQBLsFRck4BJLrFtONpYMV4gleAF8Tpn5xRgObBqRZALjHGe6AA5sO8Ajw7W2CAXFGAi9IwAO4y9oAHMP7ERwFPiERQzijA4qZYmgIEh3pRCvZbXgEemCx4gFw59j6zPsa1k6FkXUlFXccrAB1H5pnA28fVCiYwB5hA9EVEWzo3I4j7jnFjqhdh4CK+GASNE0UuIPu5ALSjQ2cTyc0F6JHPqaG06oELCA7nk0HwO0IBsqwA5ILfsw6JJLOBdD7g/ZN8HlxPj1Ij8MwuBoDZ+XJFXNQDZLkeAHxMSv8guhDbk36CihItoY6Vn7kVwY3UZOmDpXFRE5DlPMB9k1Mrg6kp9d2eFITg8CFxAYl+AGi0+Le5gg3MdgiIU9mpNYFh766Yo4TQfXwzKLQwE5FAlkJAWN4VSAWnNpOkPs1neFgWHlqcfixMAMHsRQBwwXX9ktVARNd/Qfcte3ffsOIP1vJAEK3Pt18oCkOzBQDRzVxO6SpuvurpNbMnn1zWnSqDP7TvsbF76L5M3UBFaXh2/P81Z6X5f9242fvuIFxOAIQQulUIN5CthlHp/t+DJFBrRjA0g6eEp1FH650uKBHCyVg5OG5W7eNcfh2wqoGN7T5feS/vFYBoRgIbX7r9gVCTjv5Awg1k1vzfMKKGM/9Wg4i1JJ5uGekQRg0iH+HdwI0jhBvI9KHQYegaqqb0BpiawQ6hoWmuG0ASAjdpfCqigYwdCMWVN2no/1NJKu2ZMQX4ua+iB06gJCqE6I9ZO7VWWIEM5P+xyeZT+3gf3yBKDf0u451CKRr4dx4MnkOMFHrtCzDoNfiLWx3ZE/cZaZEDsjygIQuNossr7GaRzh9DVmD9jDpBDXtZ/UMKAPaVB390vewznpI/Bxk/kDlOAFeznUctY0RI6B3zh9vQ+pemXh8jyx5UAB82NRwI1ro9AzXnmrhHpgsr4FXt39KU5pAAf+FXqHFHVq+TPyK9WniMyA94gvyfpEYQAT1190tqeGJBtoffHw4TEGnhL4wS9HDHxv24em98rDK98OP5jHQGPbyIwFyTfmXcG/Pjolikg6p+/hP3BXG3iAL5a5p5ekGuDHDQPC+APxaXNSIsFK7gewC/Zhv4tbpRXDb/CEa2IJeGpoTOcxXAxQO3ClfwvQo+YPonViVJH/uGFnNbSUlQKci1QWj0RwQIH+JdAa5r3TBbRAXfBfWD9Ll6WPoF0tYdQXMKcnWovv4adRL5OKAno4KhlCdA6ZLIFn67bB+O3ml66hXytMEewEYryOUBYoLwwDeJG8QlGw+ggEGUkB8e6MPRezPN79PjZq1XX19BHoxumhS+3nUFrhJcTGfYd60SoPBQ8f67i+JsYJDv+mVfCeNXQoML8mUcd5x0NIUpj7mgUHPcAe4VtO7pFcJuk+qFqwSR5kvx+0T4KKFlBfk2JGlAT3StTCiBal8xs4b6CwIPCEuQKnzcAILjdumgT1Mit5SXl/+wIB9HcfGAflRGvoVXAkQHN42sSdzYLcx+k3WFfWvhg+0zHpLImhbk8yj1h2oIFH7GKwEKSHC8HERRVwaGED46ro8ms5+8GTyB+J/qdaJxQkFnGOT/TyV3sIPHBPBz6G+HUrKuRhnvckK95wntD6Q+v750s69GnkPVVUFnGug2Tv5sG88WQusnVcfY27QLsCC7ugjDBwx0P8X5oHhL0oRPF3Kv73TC584WVmpKeGNKiEgLUE9HzXH7GBamM7sEWDpU9P4bnejVnHsXU3e+sbZXr14nFHTmgcOLGt11yysBMAFy3TjqjEso9nUyawCwCwv3EjVzGB+zO3ppepLft0u7jJuPy3fAd7gDN1sRMPyD7Q6SuAALgwOnqC20rMHqzuHrt1NSB+FvsHe0VYyvKdE9kmJcUFAQO7KgKw1w2qocXI5ikvQsYu8ALqSoYn9fZGODfHML7sWO2PnrqIZ/bNRG+YqaKnxq5rAprxg+T3CBFmogJXiddwmuNYjRxZRriDPYQnFyPiiCK3j8nejds7CxKqHUeprJp6jonoyc5cuHUVTU/yRdNW8k0mgvbw0AkqAIuKAaVTGblsSt2BnuYVeO+XgXtyC0Q3iL2n0A3KSvd4Fe+BO6gHOmpmlHCcmn1xeqwUb7buJK1pYi1FI3jCsJKOJk7E7Hv7ZkSRl2O+Ec/gYA179Mq2WzKeuJE7sWyEsz9/T4NZ3fu4M6eUtC0gflC6SjFcU8nxbwA9sttFaEMlrk6XQG4a4Jtexd4hBcsLXXwzDSLc3e6wgd1TobaLf/ihjNIaFKK5LxtdrxCZD7tC6HBwrpfosBMkRSzJW0a7akWwSXSYQyoAAVB1JuIRfxIvndrRfYl1nvcxTCVYrDuePYPXvnkjX42X2OwL9cYTdlfJRA3RVDq9lIOp0bcLCKlOLjbcG7Pfs0f3Bc9+7dfyIk+h2HppUX0rGzpUQgveUuLL/YippUBgjktGCUzabmydcPr2EPTq233AVy7J+QmUZfXbgMKEerudo+0bSDbuH6kJQIFzM/O6vBsjK4kGECJWsASgHo4NtL2tjt9jHt8AFdMdaRqR9Nfv6nQoIdNHr00I5VpYoxtMAP0v24O9OtgmsZXFPsTrwOweEI+zgiYXDDFi5ZWkKnbC4ksAbAtripis0hpZlCtDSuYBtIShQqs3e2zxE4Hvkwjkf0zimdLVQDsYYEXxXrajF95nFCRSn1w1lMuYWnVDWy0xVCukK4SgHBSc6uda1FsdJ6+pz3yGpbwk4VuH1Pb2SrokTu1bTgOK24vFBIJvPjiEBxKEC3mk4hUuUuSqS8RruwhRdSe4px8Nn6523ixthONPYGXNDsVyKD6Q6FU4QIcotd/BkuuaZdOULVzYsp5r6f8uobSKjv0fwcvfTbEmyqkhi76aTTNrqE+U3a4U+peuQ2RTMW+pWKJrk47C8Q5j3fRuxI5B78/pCsU4USuY8q0K/UVGEUbteiNPUEaoA5HALWpIhZUmL0AUNXWBg4piut0v8D1HLTMIZOOhsAAAAASUVORK5CYII='}
							time={'08:03'}
						/>
					</div>
				</div>

				<div className={'dashboard-leftDiv-addFriend'} style={addFriendStyle} >
					<SearchFriend
						back={backToChatDiv}
						icon={'fas fa-arrow-left'}
						value={searchUser}
						setValue={setSearchUser}
						exec={searchUserFunction}
						users={searchUserList}
					/>
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
	addFriendRequest: (obj) => dispatch(addFriendRequestAction(obj))
});
const mapStateToProps = (state) => ({
	user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Input from '../Input/Input';

import './SearchFriend.scss';

const SearchFriend = ({ value, setValue, back, icon, exec, users }) => {

	const renderResponse = () => {
		if (users === null) return null;
		if (users.length > 0) return users.map(((user, index) =>
			<div key={`addFriendDivResponse${index}`} >
				<div>
					<img src={user.image} alt={`${user.username} photo`} />
				</div>
				<div>
					{user.username}
				</div>
			</div>
		))
		else return (<div> User not found! </div>)
	}

	return (
		<div className={'searchDiv'} >
			<div className={'searchDiv-addFriend'} >
				<div className={'searchDiv-addFriend-back'} >
					<i className={icon} onClick={back} ></i>
				</div>
				<div className={'searchDiv-addFriend-searchInput'} >
					<Input inputValue={value} setInputValue={setValue} />
				</div>
				<div className={'searchDiv-addFriend-submit'} >
					<button onClick={exec} >Search</button>
				</div>

			</div>
			<div className={'searchDiv-usersDiv'} >
				{renderResponse()}
			</div>
		</div>
	)
}

export default SearchFriend

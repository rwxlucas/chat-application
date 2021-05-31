import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Input from '../Input/Input';

import './SearchFriend.scss';

const SearchFriend = ({ value, setValue, back, icon, exec, users }) => {

	const renderResponse = () => {
		if (users === null) return null;
		if (users.length > 0) return (
			<div>
				alooo
				<div>
					<img src={users[0].image} alt={`${users[0].username} photo`} />
				</div>
				<div>
					{users[0].username}
				</div>
			</div>
		)
		else return (<div> User not found! </div>)
	}

	return (
		<div className={'addFriend'} >
			<div className={'addFriend-back'} ><FontAwesomeIcon onClick={back} icon={icon} /></div>
			<div className={'addFriend-searchInput'} >
				<Input inputValue={value} setInputValue={setValue} />
			</div>
			<div className={'addFriend-submit'} >
				<button onClick={exec} >Search</button>
			</div>

			<div> {renderResponse()} </div>
		</div>
	)
}

export default SearchFriend

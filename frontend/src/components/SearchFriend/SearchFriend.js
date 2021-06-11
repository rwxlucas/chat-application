import React from 'react';
import Input from '../Input/Input';
import { sendAddRequest } from '../../socket/socket'
import { connect } from 'react-redux';

import './SearchFriend.scss';

const SearchFriend = ({ user, value, setValue, back, icon, exec, users }) => {

	const renderResponse = () => {
		if (users === null) return null;
		if (users.length > 0) return users.map(((item, index) =>
			<div key={`addFriendDivResponse${index}`} >
				<div>
					{item.image ? <img src={item.image} alt={`${item.displayName}`} /> : <i className="fas fa-user"></i>}
				</div>
				<div>
					{item.displayName}
				</div>
				<button onClick={() => { sendAddRequest(user.username, item.username) }} >Add</button>
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

const mapStateToProps = (state) => ({
	user: state.user
});

export default connect(mapStateToProps, null)(SearchFriend);

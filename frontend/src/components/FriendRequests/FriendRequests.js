import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { removeFriendRequestAction, acceptUserRequestAction } from '../../redux/actions/userAction';
import { add, removeRequest } from '../../services/friendService'

import './FriendRequests.scss';
const FriendRequests = ({ requests, removeFriendRequest, acceptUserRequest, active, back }) => {

	const declineUser = (username) => {
		removeRequest(username);
		removeFriendRequest(username);
		requests = requests.filter(item => item.username != username);
		if(requests.length == 0) back();
	};
	const acceptUser = (username) => {
		add(username);
		acceptUserRequest(username);
		requests = requests.filter(item => item.username != username);
		if(requests.length == 0) back();
	}

	return (<>
		<div className={'friendRequestsHeader'} >
			<i onClick={back} className={"fas fa-arrow-left"}></i>	Friend Requests
		</div>
		{
			requests.map((req, index) => (
				<div key={`friendRequestDiv${index}`} className={`friendRequests ${active ? 'active' : ''}`}>
					<div>
						<img src={req.image} alt={`${req.name} photo`} />
					</div>
					<div>
						<div> {req.name} </div>
						<div>
							<div onClick={() => acceptUser(req.username)} ><i className="fas fa-check"></i></div>
							<div onClick={() => declineUser(req.username)}><i  className="fas fa-times"></i></div>
						</div>
					</div>
				</div>
			))
		}
	</>)
};

const mapDispatchToProps = (dispatch) => ({
	removeFriendRequest: user => dispatch(removeFriendRequestAction(user)),
	acceptUserRequest: user => dispatch(acceptUserRequestAction(user))
});
const mapStateToProps = (state) => ({
	user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequests);
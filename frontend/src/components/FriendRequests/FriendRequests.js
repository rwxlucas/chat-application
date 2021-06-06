import React, { useEffect } from 'react';
import { add } from '../../services/friendService'
import { connect } from 'react-redux';
import { removeFriendRequestAction } from '../../redux/actions/userAction';

import './FriendRequests.scss';
const FriendRequests = ({ requests, removeFriendRequest, active }) => {

	const decline = () => {};

	return (<>
		<div className={'friendRequestsHeader'} >Friend Requests</div>
		{
			requests.map((req, index) => (
				<div key={`friendRequestDiv${index}`} className={`friendRequests ${active ? 'active' : ''}`}>
					<div>
						<img src={req.image} alt={`${req.name} photo`} />
					</div>
					<div>
						<div> {req.name} </div>
						<div>
							<div onClick={() => add(req.username)} ><i className="fas fa-check"></i></div>
							<div onClick={() => removeFriendRequest(req.username)}><i  className="fas fa-times"></i></div>
						</div>
					</div>
				</div>
			))
		}
	</>)
};

const mapDispatchToProps = (dispatch) => ({
	removeFriendRequest: (user) => dispatch(removeFriendRequestAction(user))
});
const mapStateToProps = (state) => ({
	user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequests);
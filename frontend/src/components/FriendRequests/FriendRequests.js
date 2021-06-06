import React from 'react';
import './FriendRequests.scss';

const FriendRequests = ({ requests, active }) => {
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
							<div><i className="fas fa-check"></i></div>
							<div><i className="fas fa-times"></i></div>
						</div>
					</div>
				</div>
			))
		}
	</>)
}

export default FriendRequests

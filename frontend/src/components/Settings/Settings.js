import React, { useState } from 'react';
import './Settings.scss';

const Settings = ({ back, image }) => {
	const [editName, setEditName] = useState(false)
	const [editStatus, setEditStatus] = useState(false)

	return (
		<div className={'settings'}>
			<div className="settings-back">
				<i onClick={() => back(false)} class="fas fa-arrow-left"></i>
				<span> Perfil</span>
			</div>

			<div className="settings-image">
				<div>
					<img src={image} alt="" />
					<div> <i class="fas fa-camera"></i> </div>
				</div>
			</div>

			<div className={"settings-info"} >
				<div className={editName ? 'active' : ''} >
					<div>Name</div>
					<div><i onClick={() => setEditName(!editName)} class="fas fa-pen"></i></div>
				</div>



				<div className={editStatus ? 'active' : ''} >
					<div >Status</div>
					<div><i  onClick={() => setEditStatus(!editStatus)} class="fas fa-pen"></i></div>
				</div>
			</div>
		</div>
	)
}

export default Settings

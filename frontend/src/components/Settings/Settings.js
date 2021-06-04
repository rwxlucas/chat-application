import React, { useState } from 'react';
import { processFile } from '../../utils/utils'
import './Settings.scss';

const Settings = ({ back }) => {
	const [editName, setEditName] = useState(false);
	const [editStatus, setEditStatus] = useState(false);
	const [image, setImage] = useState('');

	const iconDivStyle = { border: !image ? '1px solid #222' : '' }
	const imageConfig = async (e) => {
		const file = e.target.files[0]
		const uploadedImage = await processFile(file);
		setImage(`${uploadedImage}`);
	}
	return (
		<div className={'settings'}>
			<div className="settings-back">
				<i onClick={() => back(false)} className="fas fa-arrow-left"></i>
				<span> Perfil</span>
			</div>

			<div className="settings-image">
				<div style={iconDivStyle} >
					<div>
						<i className="fas fa-camera"></i>
					</div>
					<img src={image} />
					<label htmlFor="imageUploader">
					</label>
					<input onChange={e => imageConfig(e)} accept="image/*" type="file" id="imageUploader" />
				</div>
			</div>

			<div className={"settings-info"} >
				<div className={editName ? 'active' : ''} >
					<div>Name</div>
					<div><i onClick={() => setEditName(!editName)} className="fas fa-pen"></i></div>
				</div>



				<div className={editStatus ? 'active' : ''} >
					<div >Status</div>
					<div><i onClick={() => setEditStatus(!editStatus)} className="fas fa-pen"></i></div>
				</div>
			</div>
		</div>
	)
}

export default Settings

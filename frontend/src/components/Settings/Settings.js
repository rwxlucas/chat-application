import React, { useEffect, useState } from 'react';
import { processFile } from '../../utils/utils';
import { connect } from 'react-redux';
import { setUserInfoAction } from '../../redux/actions/userAction';
import { setUserInfo as setUserInfoService } from '../../services/userService'
import Input from '../../components/Input/Input'

import './Settings.scss';
const Settings = ({ back, user, setUserInfo }) => {
	const [editName, setEditName] = useState(false);
	const [editStatus, setEditStatus] = useState(false);
	const [userDisplayName, setUserDisplayName] = useState('');
	const [userStatus, setUserStatus] = useState('');
	const [image, setImage] = useState('');

	const iconDivStyle = { border: !image ? '1px solid #222' : '' };
	const imageConfig = async (e) => {
		if (e.target.files.length < 0) return;
		const file = e.target.files[0]
		const uploadedImage = await processFile(file);
		setImage(`${uploadedImage}`);
		try {
			const updatedInfo = await setUserInfoService(user.displayName, user.status, uploadedImage);
			setUserInfo(updatedInfo);
		} catch (error) {
			console.log(error)
		}
	};

	const uploadUserDisplay = async () => {
		if (editName && userDisplayName !== user.displayName) {
			try {
				const updatedInfo = await setUserInfoService(userDisplayName, user.status, user.image);
				setUserInfo(updatedInfo);
			} catch (error) {
				console.log(error);
			}
		}
		setEditName(!editName);
	}

	const uploadUserStatus = async () => {
		if (editStatus && userStatus !== user.status) {
			try {
				const updatedInfo = await setUserInfoService(user.displayName, userStatus, user.image);
				setUserInfo(updatedInfo);
			} catch (error) {
				console.log(error);
			}
		}
		setEditStatus(!editStatus);
	}

	useEffect(() => {
		setUserDisplayName(user.displayName);
		setUserStatus(user.status);
	}, [user.displayName, user.status])

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
					{ user.image ? <img src={user.image} /> : <i className="fas fa-user"></i> }
					<label htmlFor="imageUploader">
					</label>
					<input onChange={e => imageConfig(e)} accept="image/*" type="file" id="imageUploader" />
				</div>
			</div>

			<div className={"settings-info"} >
				<div className={editName ? 'active' : ''} >
					<Input
						inpActive={editName}
						inpClass={'settingsInput'}
						placeholder={user.displayName}
						inpDisabled={!editName}
						inputValue={userDisplayName}
						setInputValue={setUserDisplayName} />
					<div>
						{
							!editName ?
								<i onClick={() => uploadUserDisplay()} className="fas fa-pen"></i>:
								<i onClick={() => uploadUserDisplay()} className="fas fa-check"></i>
						}
					</div>
				</div>

				<div className={editStatus ? 'active' : ''} >
					<Input
						inpActive={editStatus}
						inpClass={'settingsInput'}
						placeholder={user.status}
						inpDisabled={!editStatus}
						inputValue={userStatus}
						setInputValue={setUserStatus} />
					<div>
						{
							!editStatus ?
								<i onClick={() => uploadUserStatus()} className="fas fa-pen"></i> :
								<i onClick={() => uploadUserStatus()} className="fas fa-check"></i>
						}
					</div>
				</div>
			</div>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => ({
	setUserInfo: (obj) => dispatch(setUserInfoAction(obj))
});
const mapStateToProps = (state) => ({
	user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
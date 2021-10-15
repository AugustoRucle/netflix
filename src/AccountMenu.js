import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import { Popover, Divider } from 'antd';

import './AccountMenu.css';

const profiles = [
	{
		src: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png",
		name: "Ani"
	},
	{
		src: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/64623a33850498.56ba69ac2a6f7.png",
		name: "Vale ruiz"
	},
	{
		src: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/bf6e4a33850498.56ba69ac3064f.png",
		name: "Padre y Madre"
	}
];

function Profile (props) {
	const { src, name } = props;
	return <div className="profile">
		<img
			className="profile-img"
			src={src}
			alt={`profile__${name}`}
		/>

		<p className="profile-name">
			{name}
		</p>
	</div>
}

function Content () {
	return <div className="account-dropdow-menu">
		<div className="profiles">
			{profiles.map((profile) => <Profile {...profile} />)}
		</div>

		<a
			className="account-link"
			href="#">
			Administrar perfiles
		</a>

		<Divider className="account-divider" />
		
		<div className="account-settings">
			<a
				className="account-link font-weight-bold"
				href="#">
				Cuenta
			</a>

			<a
				className="account-link font-weight-bold"
				href="#">
				Centro de ayuda
			</a>

			<a
				className="account-link font-weight-bold"
				href="#">
				Cerrar sesión
			</a>
		</div>
	</div>
}

function AccountMenu () {
	const [open, handleOpen] = React.useState(false);

	const toggleOpen = (event) => {
		handleOpen(!open);
	};

	return <div className="account-menu">
		<Popover
			overlayClassName="account-menu-popover"
			placement="bottomRight"
			trigger="hover"
			content={Content}
			onVisibleChange={toggleOpen}
		>
			<div className="account-dropdown-button">
				<img
					className="account-dropdown-button__avatar"
					src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
					alt="profile netflix"
				/>

				<FontAwesomeIcon
					className={`account-dropdown-button__icon ${open && 'account-dropdown-button__icon-open'}`}
					icon={faCaretDown}
				/>
			</div>
		</Popover>
	</div>
}

export default AccountMenu;
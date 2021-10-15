import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Badge , Popover} from 'antd';

import './Releases.css';

function Content ()  {
	return   <div className="releases-popover__content">
		<div className="releases-popover__release">			
			<img
				src="https://elcomercio.pe/resizer/XjG6j7_LmDHsNQf-f4Ki_g2KC-M=/1200x800/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/T26JCJCXEBDULA3QQK3HAU7O7A.jpg"
				className="releases-popover__portada"
				alt="portada"
			/>

			<div className="releases-popover__about-release">
				<p className="releases-popover__title">
					The seven deadly sins la maldición de la luz
				</p>
				<p className="releases-popover__time">
					Hace 1 día
				</p>
			</div>
		</div>

		<div className="releases-popover__release">			
			<img
				src="https://www.playerone.vg/wp-content/uploads/2019/04/shieldHero-1.jpg"
				className="releases-popover__portada"
				alt="portada"
			/>

			<div className="releases-popover__about-release">
				<p className="releases-popover__title">
					The rising of the shield hero
				</p>
				<p className="releases-popover__time">
					Hace 1 día
				</p>
			</div>
		</div>
  </div>
}

function Releases () {
	return <div className="releases">
		<Popover
			overlayClassName="releases-popover"
			placement="bottomRight"
			trigger="hover"
			content={Content}
		>
			<Badge
				className="cursor-pointer"
				count={5}
			>
				<FontAwesomeIcon
					className="releases__icon"
					icon={faBell}
				/>
			</Badge>
		</Popover>
	</div>
}

export default Releases;
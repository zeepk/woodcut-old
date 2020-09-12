import React from 'react';
import QuestIcon from '../../images/questIcon.png';
// import RuneScoreLogo from '../../images/RuneScore.png';
import SkillLogo from '../../images/1_overall.png';
import MaxCape from '../../images/maxCape.png';

const Badge = (props) => {
	var icon = null;
	var message = '';
	var width = '100px';
	var color = 'rgb(96, 58, 58)';
	switch (props.icon) {
		case 'quests':
			icon = QuestIcon;
			color = '#377797';
			width = '120px';
			message = 'Quest Cape';
			break;
		case 'max':
			icon = MaxCape;
			message = 'Maxed';
			break;
		case 'maxTotal':
			icon = SkillLogo;
			message = 'Max Total';
			break;
		case 'all120':
			icon = SkillLogo;
			message = '120 All';
			break;
		case 'maxXP':
			icon = SkillLogo;
			message = 'Max XP';
			break;
		default:
			icon = QuestIcon;
	}
	return (
		<div
			style={{
				backgroundColor: color,
				color: 'white',
				width: width,
				height: '25px',
				borderRadius: '10px',
				textAlign: 'left',
				fontSize: '15px',
				margin: '10px 0',
			}}
		>
			<img
				src={icon}
				alt="quest cape"
				style={{
					display: 'inline',
					height: '17px',
					margin: '0 5px 2px 5px',
				}}
			/>
			{message}
		</div>
	);
};

export default Badge;

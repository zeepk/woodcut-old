import React, { useState } from 'react';
import RuneScoreLogo from '../../images/RuneScore.png';
import SkillLogo from '../../images/1_overall.png';
import QuestIcon from '../../images/questIcon.png';
import CircularProgress from '@material-ui/core/CircularProgress';
const RS3Avatar = (props) => {
	const player_name = props.player_name;
	const [avatarLoading, updateAvatarLoading] = useState(true);
	console.log(props.badges);
	return (
		<div className="p-grid user-data" style={{ margin: '0 0 30px 0' }}>
			<div className="p-col-4">
				<img
					src={`http://secure.runescape.com/m=avatar-rs/${player_name}/chat.png`}
					alt={'nice'}
					onLoad={() => updateAvatarLoading(false)}
				/>
				{avatarLoading ? (
					<CircularProgress size={'80px'} color="secondary" />
				) : (
					<div />
				)}
			</div>
			<div className="p-col-8">
				<h1
					style={{
						color: 'white',
						textAlign: 'left',
						fontFamily: 'RuneScape UF',
						// fontSize: '20px',
					}}
				>
					{player_name}
				</h1>
				<div style={{ textAlign: 'left' }}>
					<img
						src={RuneScoreLogo}
						alt="runescore"
						style={{ display: 'inline' }}
					/>
					<p
						style={{
							color: 'white',
							display: 'inline',
							margin: '0 0 0 5px',
						}}
					>
						{props.runescore.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
					</p>
				</div>
				<div style={{ textAlign: 'left', margin: '5px 0 0 0' }}>
					<img
						src={SkillLogo}
						alt="overall xp"
						style={{ display: 'inline', height: '20px' }}
					/>
					<p
						style={{
							color: 'white',
							display: 'inline',
							margin: '0 0 0 5px',
						}}
					>
						{props.xp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
					</p>
				</div>
			</div>
			<span>
				{props.badges.quests && (
					<div
						style={{
							backgroundColor: '#377797',
							color: 'white',
							width: '120px',
							height: '25px',
							borderRadius: '10px',
							textAlign: 'left',
							fontSize: '15px',
							margin: '10px 0',
						}}
					>
						<img
							src={QuestIcon}
							alt="quest cape"
							style={{
								display: 'inline',
								height: '17px',
								margin: '0 5px 2px 5px',
							}}
						/>
						Quest Cape
					</div>
				)}
				{(props.badges.max || props.badges.maxTotal) && (
					<div
						style={{
							backgroundColor: 'rgb(113, 41, 41)',
							color: 'white',
							width: '100px',
							height: '25px',
							borderRadius: '10px',
							textAlign: 'left',
							fontSize: '15px',
							margin: '10px 0',
						}}
					>
						<img
							src={SkillLogo}
							alt="maxed"
							style={{
								display: 'inline',
								height: '17px',
								margin: '0 5px 2px 5px',
							}}
						/>
						{props.badges.maxTotal ? 'Max Total' : 'Maxed'}
					</div>
				)}
			</span>
		</div>
	);
};

export default RS3Avatar;

import React, { useState } from 'react';
import RuneScoreLogo from '../../images/RuneScore.png';
import SkillLogo from '../../images/1_overall.png';
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
		</div>
	);
};

export default RS3Avatar;

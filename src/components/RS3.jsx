import React, { useState, useEffect } from 'react';
import { rs3_data_array } from '../Data';
import { useLocation } from 'react-router-dom';
import RS3Skills from './tables/RS3Skills';
import RS3Activities from './tables/RS3Activities';
import RS3Minigames from './tables/RS3Minigames';
import RuneScoreLogo from '../images/RuneScore.png';
import SkillLogo from '../images/1_overall.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TabView, TabPanel } from 'primereact/tabview';
const axios = require('axios');

const RS3 = () => {
	const [skillData, updateSkillData] = useState([]);
	const [skillHistory, updateSkillHistory] = useState({});
	const [activityData, updateActivityData] = useState([]);
	const [minigameData, updateMinigameData] = useState([]);
	const [avatarLoading, updateAvatarLoading] = useState(true);
	const [isError, updateError] = useState(false);
	const [loading, updateLoading] = useState(true);
	const proxyurl = 'https://api.allorigins.win/get?url=';
	const player_name =
		useLocation().search.substr(1).split('%20').join(' ').toLowerCase() || '';
	const organizeData = (data_array) => {
		const skill_data = [];
		const minigame_data = [];
		for (var i = 0; i < 29; i++) {
			const separatedArray = data_array[i].split('-1').join('0').split(',');
			skill_data.push({
				id: i,
				name: rs3_data_array[i],
				rank: separatedArray[0],
				level: separatedArray[1],
				xp: separatedArray[2],
				delta: 0,
			});
		}
		for (i = 29; i < 59; i++) {
			const separatedArray = data_array[i].split('-1').join('0').split(',');
			minigame_data.push({
				name: rs3_data_array[i],
				rank: separatedArray[0],
				score: separatedArray[1],
				delta: 0,
			});
		}
		updateSkillData(skill_data);
		updateMinigameData(minigame_data);
	};
	const integrateDeltas = () => {
		for (var i = 0; i < 29; i++) {
			// console.log(skillData[i]);
			skillData[i].delta = skillHistory.statRecords[0].stats[i][3];
		}
		for (i = 29; i < 59; i++) {
			// console.log(minigameData[i]);
		}
	};
	if (
		skillData.length > 0 &&
		minigameData.length > 0 &&
		skillHistory.statRecords !== undefined
	) {
		integrateDeltas();
		// updateLoading(false);
	}
	// integrateDeltas();
	useEffect(() => {
		const username = player_name.split(' ').join('+').split('%20').join('+');
		axios({
			method: 'put',
			url: `https://hidden-oasis-88699.herokuapp.com/users/delta/${username}`,
			data: {
				username: username,
			},
		})
			.then((response) => {
				updateSkillHistory(response.data);
			})
			.catch((err) => console.log(err))
			.finally(() => updateLoading(false));
		fetch(
			`${proxyurl}https://secure.runescape.com/m=hiscore/index_lite.ws?player=${player_name}`
		)
			.then((res) => res.json())
			.then((res) => {
				if (res.contents.includes('error')) {
					updateError(true);
				} else {
					organizeData(res.contents.split('\n'));
				}
			})
			.catch((err) => console.log('error in call'));
		fetch(
			`${proxyurl}https://apps.runescape.com/runemetrics/profile/profile?user=${player_name}&activities=20`
		)
			.then((res) => res.json())
			// .then(res => this.setState({log: res}))
			.then((res) => {
				if (JSON.parse(res.contents).error === 'NO_PROFILE') {
					updateError(true);
				} else {
					updateActivityData(JSON.parse(res.contents));
				}
			});
	}, [player_name]);

	if (loading) {
		return (
			<div style={{ height: '100vh' }}>
				<CircularProgress
					style={{
						position: 'fixed',
						left: '50vw',
						top: '50vh',
					}}
					size={'100px'}
					color="secondary"
				/>
			</div>
		);
	} else {
		if (isError) {
			return (
				<div style={{ height: '95vh', padding: '20px 0 0 0', color: 'white' }}>
					<h1>{`Unable to find ${player_name} on the RuneScape Hiscores...`}</h1>
				</div>
			);
		} else {
			return (
				<div>
					<div
						className="p-grid"
						style={{ margin: 0, padding: '3vh 3vw 10vh 3vw' }}
					>
						<div className="p-col-12 p-md-3">
							<div
								className="p-grid user-data"
								style={{ margin: '0 0 30px 0' }}
							>
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
											{minigameData[24].score
												.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
											{skillData[0].xp
												.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
										</p>
									</div>
								</div>
							</div>
							<TabView>
								<TabPanel header="Activities">
									<RS3Activities data={activityData} />
								</TabPanel>
								<TabPanel header="Minigames">
									<RS3Minigames data={minigameData} />
								</TabPanel>
							</TabView>
						</div>
						<div className="p-col-12 p-md-1" />
						<div className="p-col-12 p-md-8">
							<RS3Skills data={skillData} />
						</div>
					</div>
				</div>
			);
		}
	}
};

export default RS3;

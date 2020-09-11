import React, { useState, useEffect } from 'react';
import { rs3_data_array } from '../Data';
import { useLocation } from 'react-router-dom';
import RS3Skills from './rs3/RS3Skills';
import RS3Activities from './rs3/RS3Activities';
import RS3Minigames from './rs3/RS3Minigames';
import RS3User from './rs3/RS3User';
import RS3Avatar from './rs3/RS3Avatar';
import RS3Home from './rs3/RS3Home';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TabView, TabPanel } from 'primereact/tabview';
const axios = require('axios');

const RS3 = () => {
	const [skillData, updateSkillData] = useState([]);
	const [skillHistory, updateSkillHistory] = useState({});
	const [activityData, updateActivityData] = useState([]);
	const [minigameData, updateMinigameData] = useState([]);
	const [isError, updateError] = useState(false);
	const [loading, updateLoading] = useState(true);
	const [badges, updateBadges] = useState({
		max: false,
		maxTotal: false,
		comp: false,
		trim: false,
		quests: false,
	});
	const proxyurl = 'https://api.allorigins.win/get?url=';
	const player_name =
		useLocation()
			.search.substr(1)
			.split('%20')
			.join(' ')
			.split('+')
			.join(' ')
			.toLowerCase() || '';
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
			skillData[i].delta = skillHistory.statRecords[0].stats[i][3];
		}
		for (i = 29; i < 59; i++) {
			minigameData[i - 29].delta = skillHistory.statRecords[0].stats[i][2];
			// minigameData[i - 29].delta = 8;
		}
		console.log(minigameData);
	};
	if (
		skillData.length > 0 &&
		minigameData.length > 0 &&
		skillHistory.statRecords !== undefined
	) {
		integrateDeltas();
	}
	useEffect(() => {
		const updatedBadges = {
			max: false,
			maxTotal: false,
			comp: false,
			trim: false,
			quests: false,
		};
		if (player_name === '') {
			updateLoading(false);
			return;
		}
		const username = player_name.split(' ').join('+').split('%20').join('+');
		const gainsAPICall = axios({
			method: 'put',
			url: `https://hidden-oasis-88699.herokuapp.com/users/delta/${username}`,
			data: {
				username: username,
			},
		})
			.then((response) => {
				updateSkillHistory(response.data);
			})
			.catch((err) => console.log(err));
		// .finally();
		const statsAPICall = fetch(
			`${proxyurl}https://secure.runescape.com/m=hiscore/index_lite.ws?player=${player_name}`
		)
			.then((res) => res.json())
			.then((res) => {
				if (res.contents.includes('error')) {
					updateError(true);
				} else {
					updatedBadges.max =
						res.contents
							.split('\n')
							.slice(1, 29)
							.find((skill) => +skill.split(',')[1] < 99) === null;
					updatedBadges.maxTotal = res.contents.split('\n')[0][1] === 2898;
					organizeData(res.contents.split('\n'));
				}
			})
			.catch((err) => console.log(err));
		const activitiesAPICall = fetch(
			`${proxyurl}https://apps.runescape.com/runemetrics/profile/profile?user=${player_name}&activities=20`
		)
			.then((res) => res.json())
			// .then(res => this.setState({log: res}))
			.then((res) => {
				if (JSON.parse(res.contents).error === 'NO_PROFILE') {
					updateError(true);
				} else {
					updatedBadges.quests =
						JSON.parse(res.contents).questscomplete === 295;
					updateActivityData(JSON.parse(res.contents));
				}
			});
		const detailsAPICall = fetch(
			`${proxyurl}https://secure.runescape.com/m=website-data/playerDetails.ws?names=["zee pk"]&callback=jQuery000000000000000_0000000000&_=0`
		).then((res) => console.log(res));

		Promise.all([
			gainsAPICall,
			statsAPICall,
			activitiesAPICall,
			detailsAPICall,
		]).then(() => {
			updateLoading(false);
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
		if (player_name === '') {
			return <RS3Home />;
		} else if (isError) {
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
							<RS3Avatar
								player_name={player_name}
								xp={skillData[0].xp}
								runescore={minigameData[24].score}
								badges={badges}
							/>
							<TabView>
								<TabPanel header="Activities">
									<RS3Activities data={activityData} />
								</TabPanel>
								<TabPanel header="User Info">
									<RS3User />
								</TabPanel>
							</TabView>
						</div>
						<div className="p-col-12 p-md-1" />
						<div className="p-col-12 p-md-8">
							<TabView>
								<TabPanel header="Stats">
									<RS3Skills data={skillData} />
								</TabPanel>
								<TabPanel header="Minigames">
									<RS3Minigames data={minigameData} />
								</TabPanel>
							</TabView>
						</div>
					</div>
				</div>
			);
		}
	}
};

export default RS3;

import React, { useState, useEffect } from 'react';
import { rs3_data_array } from '../Data';
import { useLocation } from 'react-router-dom';
import RS3Skills from './tables/RS3Skills';
import RS3Minigames from './tables/RS3Minigames';

import CircularProgress from '@material-ui/core/CircularProgress';

const RS3 = () => {
	const [skillData, updateSkillData] = useState([]);
	const [minigameData, updateMinigameData] = useState([]);
	const [userData, updateUserData] = useState([]);
	const [loading, updateLoading] = useState(true);
	// console.log("running fetch");
	const proxyurl = 'https://api.allorigins.win/get?url=';
	const player_name = useLocation().search.substr(1) || 'zee pk';
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
			});
		}
		for (i = 29; i < 59; i++) {
			const separatedArray = data_array[i].split('-1').join('0').split(',');
			minigame_data.push({
				name: rs3_data_array[i],
				rank: separatedArray[0],
				score: separatedArray[1],
			});
		}
		updateSkillData(skill_data);
		updateMinigameData(minigame_data);
	};
	useEffect(() => {
		fetch(
			`${proxyurl}https://secure.runescape.com/m=hiscore/index_lite.ws?player=${player_name}`
		)
			.then((res) => res.json())
			.then((res) => {
				organizeData(res.contents.split('\n'));
			})
			.catch()
			.finally(() => updateLoading(false));
		fetch(
			`${proxyurl}https://apps.runescape.com/runemetrics/profile/profile?user=${player_name}&activities=20`
		)
			.then((res) => res.json())
			// .then(res => this.setState({log: res}))
			.then(
				(res) => {
					console.log(JSON.parse(res.contents));
				},

				(error) => {
					console.log('profile private');
				}
			);
	}, []);
	if (skillData.length > 0) {
		console.table(skillData);
	} else {
		console.log('No skill data yet...');
	}
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
		return (
			<div>
				<div className="p-grid" style={{ margin: 0, padding: '10px' }}>
					<div className="p-col-12 p-md-8">
						<RS3Skills data={skillData} />
					</div>
					<div className="p-col-12 p-md-1" />
					<div className="p-col-12 p-md-3">
						<RS3Minigames data={minigameData} />
					</div>
				</div>
			</div>
		);
	}
};

export default RS3;

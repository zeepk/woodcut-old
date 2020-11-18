import React, { useState, useEffect } from 'react';
import { rs3_data_array } from '../Data';
import { useLocation } from 'react-router-dom';
import XPChart from './XPChart';
import RS3Skills from './rs3/RS3Skills';
import RS3UserActivityList from './rs3/RS3UserActivityList';
import RS3Minigames from './rs3/RS3Minigames';
import RS3User from './rs3/RS3User';
import RS3Avatar from './rs3/RS3Avatar';
import RS3Leaderboards from './rs3/RS3Leaderboards';
import CircularProgress from '@material-ui/core/CircularProgress';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import styled from 'styled-components';
import { TabView, TabPanel } from 'primereact/tabview';
const { DateTime } = require('luxon');

const API_URL = process.env.REACT_APP_API_URL;

const axios = require('axios');

const RS3 = () => {
	const [skillData, updateSkillData] = useState([]);
	const [dxpData, updateDxpData] = useState([]);
	const [skillHistory, updateSkillHistory] = useState({});
	const [minigameData, updateMinigameData] = useState([]);
	const [isError, updateError] = useState(false);
	const [loading, updateLoading] = useState(true);
	const [user2, updateUser2] = useState('');
	const [clanName, updateClanName] = useState('');
	const dxpEndDate = '11-16-2020';
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
				day: 0,
				week: 0,
				month: 0,
				year: 0,
			});
		}
		for (i = 29; i < 59; i++) {
			const separatedArray = data_array[i].split('-1').join('0').split(',');
			minigame_data.push({
				name: rs3_data_array[i],
				rank: separatedArray[0],
				score: separatedArray[1],
				day: 0,
				week: 0,
				month: 0,
				year: 0,
			});
		}
		updateSkillData(skill_data);
		updateMinigameData(minigame_data);
	};
	const integrateDeltas = () => {
		for (var i = 0; i < 29; i++) {
			skillData[i].day = skillHistory.statRecords[0].stats[i][3];
			skillData[i].week = skillHistory.statRecords[0].stats[i][4];
			skillData[i].month = skillHistory.statRecords[0].stats[i][5];
			skillData[i].year = skillHistory.statRecords[0].stats[i][6];
		}
		for (i = 29; i < 59; i++) {
			minigameData[i - 29].day = skillHistory.statRecords[0].stats[i][2];
			minigameData[i - 29].week = skillHistory.statRecords[0].stats[i][3];
			minigameData[i - 29].month = skillHistory.statRecords[0].stats[i][4];
			minigameData[i - 29].year = skillHistory.statRecords[0].stats[i][5];
		}
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
			all120: false,
			maxXP: false,
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
			url: `${API_URL}/users/delta/${username}`,
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
			`${proxyurl}https://secure.runescape.com/m=hiscore/index_lite.ws?player=${player_name}`,
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
							.find((skill) => +skill.split(',')[1] < 99) === undefined;
					updatedBadges.maxTotal =
						res.contents.split('\n')[0].split(',')[1] === '2898';
					updatedBadges.maxXP =
						res.contents.split('\n')[0].split(',')[2] === '5600000000';
					const inventionNot120 = res.contents
						.split('\n')
						.slice(1, 29)
						.filter((skill) => +skill.split(',')[2] < 104273167);

					updatedBadges.all120 =
						inventionNot120.length === 0 ||
						(inventionNot120.length === 1 &&
							+inventionNot120[0][2] >= 80618654);

					organizeData(res.contents.split('\n'));
				}
			})
			.catch((err) => console.log(err));
		const activitiesAPICall = fetch(
			`${proxyurl}https://apps.runescape.com/runemetrics/profile/profile?user=${player_name}&activities=20`,
		)
			.then((res) => res.json())
			.then((res) => {
				if (res.error === 'NO_PROFILE') {
					updateError(true);
				} else {
					updatedBadges.quests = res.questscomplete === 295;
				}
			});
		const clanNameAPICall = fetch(`${API_URL}/users/details/${username}`)
			.then((res) => res.json())
			.then((res) => {
				updateClanName(res[0].clan);
			});
		const dxpAPICall = fetch(
			`${API_URL}/users/daterangegain/${username}?startDate=11-06-2020&endDate=${dxpEndDate}`,
		)
			.then((res) => res.json())
			.then((res) => {
				res.rangeGains && updateDxpData(res.rangeGains);
			});

		Promise.all([
			gainsAPICall,
			statsAPICall,
			activitiesAPICall,
			clanNameAPICall,
			dxpAPICall,
		]).then(() => {
			updateBadges(updatedBadges);
			updateLoading(false);
		});
	}, [player_name]);

	const handleSubmit = (e) => {
		e.preventDefault();
		window.location.href = `/compare/?user1=${player_name
			.split(' ')
			.join('+')
			.split('%20')
			.join('+')}&user2=${user2}`;
	};

	if (loading) {
		return (
			<div style={{ height: '100vh' }}>
				<CircularProgress
					style={{
						position: 'fixed',
						left: '45vw',
						top: '45vh',
					}}
					size={'10vw'}
					color="secondary"
				/>
			</div>
		);
	} else {
		if (player_name === '') {
			return <RS3Leaderboards />;
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
								clanName={clanName}
							/>
							<TabView>
								<TabPanel header="User Info">
									<RS3User skills={skillData} badges={badges} />
								</TabPanel>
								<TabPanel header="Activities">
									<RS3UserActivityList player_name={player_name} />
								</TabPanel>
							</TabView>
							<FormContainer
								className="p-formgroup-inline"
								onSubmit={(e) => handleSubmit(e)}
							>
								<div className="p-field">
									<label htmlFor="lastname5" className="p-sr-only">
										User 2
									</label>
									<InputText
										id="lastname5"
										type="text"
										placeholder="Player"
										onChange={(e) =>
											updateUser2(e.target.value.split(' ').join('+'))
										}
									/>
								</div>
								<Button type="submit" label="Compare Me!" />
							</FormContainer>
						</div>
						<div className="p-col-12 p-md-1" />
						<div className="p-col-12 p-md-8">
							<TabView style={{ overflow: 'auto' }}>
								<TabPanel header="Stats">
									<RS3Skills data={skillData} dxpData={dxpData} />
								</TabPanel>
								<TabPanel header="Chart">
									<XPChart player_name={player_name} />
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
const FormContainer = styled.form`
	/* margin: 2vh auto 0 5vw; */
	margin: 2vh auto 0 auto;
	max-width: 470px;
	padding: 10px;
	.p-inputtext {
		font-size: 1.3rem;
		font-family: RuneScape UF;
		padding: 0 0 0 5px;
		width: 150px;
	}
`;

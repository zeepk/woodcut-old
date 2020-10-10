import React, { useState } from 'react';
import { calcVirtualLevel, skillIcon, rs3_data_array } from '../../Data';
import { TabView, TabPanel } from 'primereact/tabview';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Column } from 'primereact/column';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const RS3CompareChart = (props) => {
	const columnOptions = [
		{ label: 'Day', value: 'day' },
		{ label: 'Week', value: 'week' },
		{ label: 'Month', value: 'month' },
		{ label: 'Year', value: 'year' },
	];
	const [avatarLoading, updateAvatarLoading] = useState(true);
	const [duration, changeDuration] = useState('day');
	var user1Skills;
	var user2Skills;
	try {
		user1Skills = props.skillData.user1SkillHistory.statRecords[0].stats;
		user2Skills = props.skillData.user2SkillHistory.statRecords[0].stats;
	} catch (error) {
		return <Username>Players not found.</Username>;
	}
	const skillData = user1Skills.slice(0, 29).map((skill, index) => {
		const skillObj = {
			id: index,
			name: rs3_data_array[index],
			rank: +skill[0],
			level: +skill[1],
			xp: +skill[2],
			day: +skill[3],
			week: +skill[4],
			month: +skill[5],
			year: +skill[6],
			rank2: +user2Skills[index][0],
			level2: +user2Skills[index][1],
			xp2: +user2Skills[index][2],
			day2: +user2Skills[index][3],
			week2: +user2Skills[index][4],
			month2: +user2Skills[index][5],
			year2: +user2Skills[index][6],
		};
		return skillObj;
	});
	const minigameData = user1Skills
		.slice(29, user1Skills.length - 1)
		.map((minigame, index) => {
			const minigameObj = {
				id: index + 29,
				name: rs3_data_array[index + 29],
				rank: +minigame[0],
				score: +minigame[1],
				day: +minigame[2],
				week: +minigame[3],
				month: +minigame[4],
				year: +minigame[5],
				rank2: +user2Skills[index + 29][0],
				score2: +user2Skills[index + 29][1],
				day2: +user2Skills[index + 29][2],
				week2: +user2Skills[index + 29][3],
				month2: +user2Skills[index + 29][4],
				year2: +user2Skills[index + 29][5],
			};
			return minigameObj;
		});

	return (
		<View>
			<Header className="p-grid">
				<div className="p-col-5">
					<a href={`/rs3/?${props.displayNames[0]}`} style={{ color: 'white' }}>
						<Avatar
							src={`https://secure.runescape.com/m=avatar-rs/${props.displayNames[0]}/chat.png`}
							alt={'nice'}
							onLoad={() => updateAvatarLoading(false)}
						/>
						{avatarLoading ? (
							<CircularProgress size={'30px'} color="secondary" />
						) : (
							<Username>{props.displayNames[0].replace('+', ' ')}</Username>
						)}
					</a>
				</div>
				<div className="p-col"></div>
				<div className="p-col-5">
					<a href={`/rs3/?${props.displayNames[1]}`} style={{ color: 'white' }}>
						<Avatar
							src={`https://secure.runescape.com/m=avatar-rs/${props.displayNames[1]}/chat.png`}
							alt={'nice'}
							onLoad={() => updateAvatarLoading(false)}
						/>
						{avatarLoading ? (
							<CircularProgress size={'30px'} color="secondary" />
						) : (
							<Username>{props.displayNames[1].replace('+', ' ')}</Username>
						)}
					</a>
				</div>
			</Header>
			<TabView>
				<TabPanel header="Skills">
					<DataTable
						value={skillData}
						scrollable
						ScrollWidth={'1000px'}
						style={{ minWidth: '600px' }}
					>
						<Column
							style={{ textAlign: 'left' }}
							field="rank"
							header="Rank"
							body={(rowData) => (
								<div>
									{rowData.rank
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
										.replace('-1', '')}
								</div>
							)}
						></Column>
						<Column
							style={{ textAlign: 'left' }}
							field="level"
							header="Level"
							body={(rowData) => (
								<div>
									{calcVirtualLevel(rowData)
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								</div>
							)}
						></Column>
						<Column
							style={{ textAlign: 'left' }}
							field="xp"
							header="XP"
							body={(rowData) => (
								<div className={rowData.xp > rowData.xp2 ? 'gainz' : ''}>
									{rowData.xp
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
										.replace('-1', '0')}
								</div>
							)}
						></Column>
						<Column
							style={{ textAlign: 'right' }}
							field={duration}
							header={
								<Dropdown
									style={{
										position: 'relative',
										zIndex: 1000,
										minWidth: '100px',
									}}
									value={duration}
									options={columnOptions}
									onChange={(e) => {
										changeDuration(e.value);
									}}
									placeholder="Select a Duration"
								/>
							}
							body={(rowData) => (
								<div
									style={{ color: 'silver' }}
									className={rowData[duration] > 0 ? 'gainz' : ''}
								>
									{`
						+${rowData[duration].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
								</div>
							)}
						></Column>
						<Column
							style={{ textAlign: 'center', width: 'auto' }}
							field="code"
							header="Skill"
							body={(rowData) => (
								<div>
									{skillIcon(rowData.id)}
									{/* {rowData.name} */}
								</div>
							)}
						></Column>
						<Column
							style={{ textAlign: 'right' }}
							field={duration}
							header={
								<Dropdown
									style={{
										position: 'relative',
										zIndex: 1000,
										minWidth: '100px',
									}}
									value={duration}
									options={columnOptions}
									onChange={(e) => {
										changeDuration(e.value);
									}}
									placeholder="Select a Duration"
								/>
							}
							body={(rowData) => (
								<div
									style={{ color: 'silver' }}
									className={rowData[duration + '2'] > 0 ? 'gainz' : ''}
								>
									{`
						+${rowData[duration + '2'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
								</div>
							)}
						></Column>
						<Column
							style={{ textAlign: 'right' }}
							field="xp2"
							header="XP"
							body={(rowData) => (
								<div className={rowData.xp2 > rowData.xp ? 'gainz' : ''}>
									{rowData.xp2
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
										.replace('-1', '0')}
								</div>
							)}
						></Column>
						<Column
							style={{ textAlign: 'right' }}
							field="level2"
							header="Level"
							body={(rowData) => {
								const levelObject = {
									id: rowData.id,
									name: rowData.name,
									xp: rowData.xp2,
									level: rowData.level2,
									rank: rowData.rank2,
								};
								return (
									<div>
										{calcVirtualLevel(levelObject)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
									</div>
								);
							}}
						></Column>
						<Column
							style={{ textAlign: 'right' }}
							field="rank2"
							header="Rank"
							body={(rowData) => (
								<div>
									{rowData.rank2
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
										.replace('-1', '')}
								</div>
							)}
						></Column>
					</DataTable>
				</TabPanel>

				<TabPanel header="Minigames">
					<DataTable
						value={minigameData}
						scrollable
						ScrollWidth={'1000px'}
						style={{ minWidth: '600px' }}
					>
						<Column
							style={{ textAlign: 'left' }}
							field="rank"
							header="Rank"
							body={(rowData) => (
								<div>
									{rowData.rank
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
										.replace('-1', '')}
								</div>
							)}
						></Column>
						<Column
							style={{ textAlign: 'left' }}
							field="score"
							header="Score"
							body={(rowData) => (
								<div className={rowData.score > rowData.score2 ? 'gainz' : ''}>
									{rowData.score
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
										.replace('-1', '0')}
								</div>
							)}
						></Column>
						<Column
							style={{ textAlign: 'left' }}
							field={duration}
							header={
								<Dropdown
									style={{
										position: 'relative',
										zIndex: 1000,
										minWidth: '100px',
									}}
									value={duration}
									options={columnOptions}
									onChange={(e) => {
										changeDuration(e.value);
									}}
									placeholder="Select a Duration"
								/>
							}
							body={(rowData) => (
								<div
									style={{ color: 'silver' }}
									className={rowData[duration] > 0 ? 'gainz' : ''}
								>
									{`
						+${rowData[duration].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
								</div>
							)}
						></Column>
						<Column
							style={{ textAlign: 'center', width: 'auto' }}
							field="name"
							header="Minigame"
						></Column>
						<Column
							style={{ textAlign: 'right' }}
							field={duration}
							header={
								<Dropdown
									style={{
										position: 'relative',
										zIndex: 1000,
										minWidth: '100px',
									}}
									value={duration}
									options={columnOptions}
									onChange={(e) => {
										changeDuration(e.value);
									}}
									placeholder="Select a Duration"
								/>
							}
							body={(rowData) => (
								<div
									style={{ color: 'silver' }}
									className={rowData[duration + '2'] > 0 ? 'gainz' : ''}
								>
									{`
						+${rowData[duration + '2'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
								</div>
							)}
						></Column>
						<Column
							style={{ textAlign: 'right' }}
							field="score2"
							header="Score"
							body={(rowData) => (
								<div className={rowData.score < rowData.score2 ? 'gainz' : ''}>
									{rowData.score2
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
										.replace('-1', '0')}
								</div>
							)}
						></Column>
						<Column
							style={{ textAlign: 'right' }}
							field="rank2"
							header="Rank"
							body={(rowData) => (
								<div>
									{rowData.rank2
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
										.replace('-1', '')}
								</div>
							)}
						></Column>
					</DataTable>
				</TabPanel>
			</TabView>
		</View>
	);
};

const View = styled.div`
	.p-grid {
		margin: 0;
	}

	.p-tabview {
		margin: 2vh 5vw;
		min-width: 1000px;
		padding: 0;
	}
	.p-col-5 {
		padding: 0;
	}
	min-height: 90vh;
`;
const Header = styled.div`
	position: -webkit-sticky; /* Safari */
	position: sticky;
	top: 0;
`;
const Avatar = styled.img`
	height: 70px;
`;
const Username = styled.p`
	color: white;
	display: inline;
	font-family: RuneScape UF;
	font-size: 1.5rem;
`;

export default RS3CompareChart;

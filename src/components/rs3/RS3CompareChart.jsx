import React, { useState } from 'react';
import { calcVirtualLevel, skillIcon, rs3_data_array } from '../../Data';
import { TabView, TabPanel } from 'primereact/tabview';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const RS3CompareChart = (props) => {
	const [avatarLoading, updateAvatarLoading] = useState(true);
	const user1Skills = props.skillData.user1SkillHistory.statRecords[0].stats;
	const user2Skills = props.skillData.user2SkillHistory.statRecords[0].stats;
	const skillData = user1Skills.slice(0, 29).map((skill, index) => {
		const skillObj = {
			id: index,
			name: rs3_data_array[index],
			rank: skill[0],
			level: skill[1],
			xp: skill[2],
			rank2: user2Skills[index][0],
			level2: user2Skills[index][1],
			xp2: user2Skills[index][2],
		};
		return skillObj;
	});
	const minigameData = user1Skills
		.slice(29, user1Skills.length - 1)
		.map((minigame, index) => {
			const minigameObj = {
				id: index + 29,
				name: rs3_data_array[index + 29],
				rank: minigame[0],
				score: minigame[1],
				rank2: user2Skills[index + 29][0],
				score2: user2Skills[index + 29][1],
			};
			return minigameObj;
		});

	return (
		<View>
			<Header className="p-grid">
				<div className="p-col-5">
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
				</div>
				<div className="p-col"></div>
				<div className="p-col-5">
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
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
								<div>
									{rowData.xp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
							field="xp2"
							header="XP"
							body={(rowData) => (
								<div>
									{rowData.xp2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
								<div>
									{rowData.score
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
										.replace('-1', '0')}
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
							field="score2"
							header="Score"
							body={(rowData) => (
								<div>
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

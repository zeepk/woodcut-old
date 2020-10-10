import React from 'react';
import { calcVirtualLevel, skillIcon, skillNameArray } from '../../Data';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styled from 'styled-components';

const RS3CompareChart = (props) => {
	const user1Skills = props.skillData.user1SkillHistory.statRecords[0].stats;
	const user2Skills = props.skillData.user2SkillHistory.statRecords[0].stats;
	const skillData = user1Skills.slice(0, 29).map((skill, index) => {
		const skillObj = {
			id: index,
			name: skillNameArray[index],
			rank: skill[0],
			level: skill[1],
			xp: skill[2],
			rank2: user2Skills[index][0],
			level2: user2Skills[index][1],
			xp2: user2Skills[index][2],
		};
		return skillObj;
	});

	return (
		<View>
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
							{rowData.rank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
					style={{ textAlign: 'center', width: '200px' }}
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
							{rowData.rank2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						</div>
					)}
				></Column>
			</DataTable>
		</View>
	);
};

const View = styled.div`
	.p-datatable {
		max-width: 90vw;
		margin: 2vh auto;
	}
	min-height: 90vh;
`;

export default RS3CompareChart;

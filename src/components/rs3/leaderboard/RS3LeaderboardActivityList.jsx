import React from 'react';
import styled from 'styled-components';
import { skillIcon, skillNameArray } from '../../../Data';
import { DateTime } from 'luxon';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const rowHeight = '7vh';
const avatarHeight = '5vh';

const RS3LeaderboardActivityList = (props) => {
	return (
		<DataTable
			value={props.activities}
			style={{
				border: '2px solid silver',
				borderRadius: '10px',
				maxHeight: '100vh',
				overflow: 'auto',
			}}
		>
			<Column
				header="Player"
				body={(rowData) => {
					return (
						<a href={`/rs3/?${rowData.username}`} style={{ color: 'white' }}>
							<span style={{ height: avatarHeight }}>
								<img
									src={`https://secure.runescape.com/m=avatar-rs/${rowData.username}/chat.png`}
									alt={'avatar'}
									style={{ maxHeight: avatarHeight }}
								/>
								{rowData.rsn.split('+').join(' ')}
							</span>
						</a>
					);
				}}
				style={{ textAlign: 'left', height: rowHeight }}
			/>

			<Column
				header=""
				style={{ textAlign: 'right' }}
				body={(rowData) => {
					const activityDateTime = DateTime.fromISO(
						new Date(rowData.activityDate).toISOString(),
					);
					const is200m = rowData.title.includes('200000000');
					const is120 = rowData.title.includes('104000000');
					return (
						<div>
							<ActivityTitle is120={is120} is200m={is200m}>
								{rowData.title.replace('000000XP', 'm xp')}
							</ActivityTitle>
							<ActivityDatetime>
								{activityDateTime.toLocaleString(DateTime.DATETIME_FULL)}
							</ActivityDatetime>
						</div>
					);
				}}
			/>
			<Column
				style={{ width: '35px', padding: 0 }}
				field="code"
				header=""
				body={(rowData) => (
					<div>
						{rowData.title.includes('XP in')
							? skillIcon(
									skillNameArray.indexOf(rowData.title.split(' ').reverse()[0]),
							  )
							: ''}
					</div>
				)}
			></Column>
		</DataTable>
	);
};

const ActivityTitle = styled.p`
	margin: 0;
	font-size: 16px;
	color: ${(props) =>
		props.is120 ? 'gold' : (props) => (props.is200m ? 'cyan' : 'white')};
`;
const ActivityDatetime = styled.p`
	margin: 0;
	font-size: 10px;
`;

export default RS3LeaderboardActivityList;

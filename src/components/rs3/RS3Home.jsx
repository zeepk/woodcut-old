import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { skillIcon, skillNameArray } from '../../Data';
import { DateTime } from 'luxon';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const API_URL = process.env.REACT_APP_API_URL;

const RS3Home = () => {
	const [topTenData, updateTopTenData] = useState([]);
	const [activities, updateActivities] = useState([]);
	const [topTenLoading, updateTopTenLoading] = useState(true);
	let minutesSinceUpdate = 'a few minutes';
	if (topTenData.createdDate) {
		const minutes = Math.floor(
			(new Date() - new Date(topTenData.createdDate)) / 60000
		);
		minutesSinceUpdate = minutes > 1 ? `${minutes} minutes` : '1 minute';
	}
	const rowHeight = '7vh';
	const avatarHeight = '5vh';
	useEffect(() => {
		fetch(`${API_URL}/users/topten`)
			.then((res) => res.json())
			.then((res) => {
				// console.log(res);
				updateTopTenData(res);
				updateTopTenLoading(false);
			})
			.catch((err) => console.log(err));
		fetch(`${API_URL}/users/recentactivities`)
			.then((res) => res.json())
			.then((res) => {
				// console.log(res);
				updateActivities(res.slice(0, 10));
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div style={{ minHeight: '95vh', backgroundColor: '#212121' }}>
			<h1 style={{ color: 'white' }}>Happy DXP!</h1>
			<p
				style={{ color: 'white' }}
			>{`Updates every ~10 mins. Last update was ${minutesSinceUpdate} ago.`}</p>
			{topTenLoading ? (
				<div>
					<div
						style={{
							position: 'fixed',
							left: '25vw',
							top: '40vh',
							width: '50vw',
							color: 'white',
							textAlign: 'center',
							fontSize: '1rem',
						}}
					>
						<CircularProgress size={'10vw'} color="secondary" />
						<p>Just a sec, updating all users...</p>
					</div>
				</div>
			) : (
				<div className="p-grid" style={{ margin: 0 }}>
					<div
						className="p-col-12 p-lg-4"
						style={{ color: 'white', margin: '0 auto' }}
					>
						<h3>Day</h3>
						<DataTable
							value={topTenData.day}
							style={{
								border: '2px solid silver',
								borderRadius: '10px',
								maxWidth: '95vw',
							}}
						>
							<Column
								header="Player"
								body={(rowData) => {
									return (
										<a
											href={`/rs3/?${rowData.username}`}
											style={{ color: 'white' }}
										>
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
								header="XP Gain"
								style={{ textAlign: 'right' }}
								body={(rowData) => {
									return (
										<div className="gainz">
											{'+' +
												rowData.xpgain
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
										</div>
									);
								}}
							/>
						</DataTable>
					</div>
					<div
						className="p-col-12 p-lg-4"
						style={{ color: 'white', margin: '0 auto' }}
					>
						<h3>Week</h3>
						<DataTable
							value={topTenData.week}
							style={{
								border: '2px solid silver',
								borderRadius: '10px',
								maxWidth: '95vw',
							}}
						>
							<Column
								header="Player"
								body={(rowData) => {
									return (
										<a
											href={`/rs3/?${rowData.username}`}
											style={{ color: 'white' }}
										>
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
								header="XP Gain"
								style={{ textAlign: 'right' }}
								body={(rowData) => {
									return (
										<div className="gainz">
											{'+' +
												rowData.xpgain
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
										</div>
									);
								}}
							/>
						</DataTable>
					</div>
					<div
						className="p-col-12 p-lg-4"
						style={{ color: 'white', margin: '0 auto' }}
					>
						<h3>Recent Activities</h3>
						<DataTable
							value={activities}
							style={{
								border: '2px solid silver',
								borderRadius: '10px',
								maxWidth: '95vw',
							}}
						>
							<Column
								header="Player"
								body={(rowData) => {
									return (
										<a
											href={`/rs3/?${rowData.username}`}
											style={{ color: 'white' }}
										>
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
										new Date(rowData.activityDate).toISOString()
									);
									return (
										<div>
											<ActivityTitle>
												{rowData.title.replace('000000XP', 'm xp')}
											</ActivityTitle>
											<ActivityDatetime>
												{activityDateTime.toLocaleString(
													DateTime.DATETIME_FULL
												)}
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
													skillNameArray.indexOf(
														rowData.title.split(' ').reverse()[0]
													)
											  )
											: ''}
									</div>
								)}
							></Column>
						</DataTable>
					</div>
				</div>
			)}
		</div>
	);
};

const ActivityTitle = styled.p`
	margin: 0;
	font-size: 16px;
`;
const ActivityDatetime = styled.p`
	margin: 0;
	font-size: 10px;
`;

export default RS3Home;

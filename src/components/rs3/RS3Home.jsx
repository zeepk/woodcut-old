import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { skillIcon, skillNameArray } from '../../Data';
import CircularProgress from '@material-ui/core/CircularProgress';

const API_URL = process.env.REACT_APP_API_URL;

const RS3Home = () => {
	const [topTenData, updateTopTenData] = useState([]);
	const [activities, updateActivities] = useState([]);
	const [topTenLoading, updateTopTenLoading] = useState(true);
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
			<p style={{ color: 'white' }}>{`Updates every ~10 mins. Last update was ${
				topTenData.createdDate
					? new Date().getMinutes() -
					  new Date(topTenData.createdDate).getMinutes()
					: 'a few'
			} minutes ago.`}</p>
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
									return <div>{rowData.title.replace('000000XP', 'm xp')}</div>;
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

export default RS3Home;

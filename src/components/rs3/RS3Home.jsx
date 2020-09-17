import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CircularProgress from '@material-ui/core/CircularProgress';

const RS3Home = () => {
	const [topTenData, updateTopTenData] = useState([]);
	const [topTenLoading, updateTopTenLoading] = useState(true);
	const rowHeight = '7vh';
	const avatarHeight = '5vh';
	useEffect(() => {
		fetch(`https://hidden-oasis-88699.herokuapp.com/users/topten`)
			// fetch(`http://localhost:8000/users/topten`)
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				updateTopTenData(res);
				updateTopTenLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div style={{ minHeight: '95vh', backgroundColor: '#212121' }}>
			<h1 style={{ color: 'white' }}>Leaderboards</h1>
			{topTenLoading ? (
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
			) : (
				<div className="p-grid" style={{ margin: 0 }}>
					<div
						className="p-col-12"
						style={{ color: 'white', margin: '0 auto', width: '400px' }}
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
								header="Day Gain"
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
						className="p-col-12"
						style={{ color: 'white', margin: '0 auto', width: '400px' }}
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
								header="Week Gain"
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
						className="p-col-12"
						style={{ color: 'white', margin: '0 auto', width: '400px' }}
					>
						<h3>Month</h3>
						<DataTable
							value={topTenData.month}
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
								header="Month Gain"
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
				</div>
			)}
		</div>
	);
};

export default RS3Home;

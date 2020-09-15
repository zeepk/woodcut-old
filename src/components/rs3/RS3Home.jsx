import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CircularProgress from '@material-ui/core/CircularProgress';

const RS3Home = () => {
	const [topTenData, updateTopTenData] = useState([]);
	const [topTenLoading, updateTopTenLoading] = useState(true);
	useEffect(() => {
		fetch(`https://hidden-oasis-88699.herokuapp.com/users/topten`)
			.then((res) => res.json())
			.then((res) => {
				updateTopTenData(res);
				updateTopTenLoading(false);
			})
			.catch((err) => console.log('error in call'));
	}, []);

	return (
		<div style={{ minHeight: '95vh', backgroundColor: '#212121' }}>
			<div className="p-grid" style={{ margin: 0 }}>
				<div
					className="p-col-12"
					style={{ color: 'white', margin: '0 auto', width: '400px' }}
				>
					<h1>Top Gains</h1>
					{topTenLoading ? (
						<div style={{ height: '100vh' }}>
							<CircularProgress
								style={{
									position: 'fixed',
								}}
								size={'100px'}
								color="secondary"
							/>
						</div>
					) : (
						<DataTable
							value={topTenData}
							style={{ border: '2px solid silver', borderRadius: '10px' }}
						>
							<Column
								header="Player"
								body={(rowData) => {
									return (
										<a
											href={`/rs3/?${rowData.username}`}
											style={{ color: 'white' }}
										>
											<span style={{ height: '50px' }}>
												<img
													src={`https://secure.runescape.com/m=avatar-rs/${rowData.username}/chat.png`}
													alt={'avatar'}
													style={{ maxHeight: '50px' }}
												/>
												{rowData.rsn.split('+').join(' ')}
											</span>
										</a>
									);
								}}
								style={{ textAlign: 'left', height: '80px' }}
							/>

							<Column
								header="Day Gain"
								style={{ textAlign: 'right' }}
								body={(rowData) => {
									return (
										<div style={{ color: '#1abd1a' }}>
											{'+' +
												rowData.xpgain
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
										</div>
									);
								}}
							/>
						</DataTable>
					)}
				</div>
			</div>
		</div>
	);
};

export default RS3Home;

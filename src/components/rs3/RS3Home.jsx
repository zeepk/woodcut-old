import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CircularProgress from '@material-ui/core/CircularProgress';

const RS3Home = () => {
	const [topTenData, updateTopTenData] = useState([]);
	const [topTenLoading, updateTopTenLoading] = useState(true);
	useEffect(() => {
		fetch(`http://localhost:8000/users/topten`)
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				updateTopTenData(res);
				updateTopTenLoading(false);
			})
			.catch((err) => console.log('error in call'));
	}, []);

	return (
		<div style={{ height: '95vh', backgroundColor: '#212121' }}>
			<div className="p-grid" style={{ margin: 0 }}>
				<div className="p-col-12 p-md-6 p-lg-3" style={{ color: 'white' }}>
					<h1>Daily Top 10</h1>
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
						<DataTable value={topTenData}>
							<Column
								header=""
								body={(rowData) => {
									return (
										<div style={{ height: '50px' }}>
											<img
												src={`http://secure.runescape.com/m=avatar-rs/${rowData.username}/chat.png`}
												alt={'avatar'}
												style={{ maxHeight: '50px' }}
											/>
										</div>
									);
								}}
								style={{ textAlign: 'left' }}
							/>
							<Column
								header="Player"
								body={(rowData) => {
									return <div>{rowData.rsn.split('+').join(' ')}</div>;
								}}
								style={{ textAlign: 'left' }}
							/>
							<Column
								header="Day Gain"
								style={{ textAlign: 'right', color: '#1abd1a' }}
								body={(rowData) => {
									return (
										<div>
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

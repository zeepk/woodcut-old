import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const goodProxyurl = 'https://cors-anywhere.herokuapp.com/';
const proxyurl = 'https://api.allorigins.win/get?url=';

const RS3Activities = (props) => {
	const [activityData, updateActivityData] = useState([]);

	useEffect(() => {
		// first, tries to fetch 20 activities with the good proxyurl
		fetch(
			`${goodProxyurl}https://apps.runescape.com/runemetrics/profile/profile?user=${props.player_name}&activities=20`
		)
			.then((res) => res.json())
			.then((res) => {
				updateActivityData(res);
			})
			.catch((err) => {
				// if the good proxyurl has hit its limit, we settle and use the other one
				console.log(err);
				console.log(
					'The cors-anywhere proxy URL has hit its limit. Searching again using standard proxy.'
				);
				fetch(
					`${proxyurl}https://apps.runescape.com/runemetrics/profile/profile?user=${props.player_name}&activities=20`
				)
					.then((res) => res.json())
					.then((res) => {
						updateActivityData(JSON.parse(res.contents));
					})
					.catch((err) => {
						console.log(err);
					});
			});
	}, [props.player_name]);
	if (activityData.error) {
		return <p>Profile Private</p>;
	}
	return (
		<div>
			<DataTable value={activityData['activities']}>
				<Column
					field="details"
					body={(rowData) => (
						<div style={{ textAlign: 'left' }}>
							<div style={{ fontSize: '18px' }}>
								{rowData.text.replace('000000XP', 'm xp')}
							</div>
							<div style={{ fontSize: '12px' }}>
								{rowData.details.replace('000000 e', 'm e')}
							</div>
						</div>
					)}
				></Column>
			</DataTable>
		</div>
	);
};

export default RS3Activities;

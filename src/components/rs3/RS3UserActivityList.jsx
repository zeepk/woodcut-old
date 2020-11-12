import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import RS3Activity from './RS3Activity';
import styled from 'styled-components';
const API_URL = process.env.REACT_APP_API_URL;

const RS3UserActivityList = (props) => {
	const [activityData, updateActivityData] = useState([]);

	useEffect(() => {
		fetch(
			`${API_URL}/users/recentactivities/${props.player_name.replace(' ', '+')}`
		)
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				updateActivityData(res);
			});
	}, [props.player_name]);
	if (activityData.error) {
		return <p>Profile Private</p>;
	}
	return (
		<UserActivityList>
			<DataTable value={activityData}>
				<Column
					field="details"
					body={(rowData) => <RS3Activity data={rowData} />}
				></Column>
			</DataTable>
		</UserActivityList>
	);
};

const UserActivityList = styled.div`
	max-height: 60vh;
	overflow: auto;
`;

export default RS3UserActivityList;

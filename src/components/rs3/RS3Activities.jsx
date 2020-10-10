import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const RS3Activities = (props) => {
	const activityData = props.data;
	if (activityData.error) {
		activityData.activities = [
			{ text: 'Profile Private', details: 'No activity data available' },
		];
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

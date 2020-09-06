import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const RS3Minigames = (props) => {
	const minigameData = props.data;

	return (
		<div>
			<DataTable value={minigameData}>
				<Column
					style={{ textAlign: 'left', width: '200px' }}
					field="name"
					header="Minigame"
				></Column>
				<Column
					field="rank"
					header="Rank"
					body={(rowData) => (
						<div style={{ textAlign: 'left', width: '200px' }}>
							{rowData.rank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						</div>
					)}
				></Column>
				<Column
					field="score"
					header="Score"
					body={(rowData) => (
						<div style={{ textAlign: 'left', width: '200px' }}>
							{rowData.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						</div>
					)}
				></Column>
			</DataTable>
		</div>
	);
};

export default RS3Minigames;

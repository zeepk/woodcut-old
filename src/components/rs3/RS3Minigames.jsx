import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const RS3Minigames = (props) => {
	const minigameData = props.data;

	return (
		<div>
			<DataTable value={minigameData}>
				<Column
					style={{ textAlign: 'left' }}
					field="name"
					header="Minigame"
				></Column>
				<Column
					style={{ textAlign: 'right' }}
					field="rank"
					header="Rank"
					body={(rowData) => (
						<div>
							{rowData.rank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						</div>
					)}
				></Column>
				<Column
					style={{ textAlign: 'right' }}
					field="score"
					header="Score"
					body={(rowData) => (
						<div>
							{rowData.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						</div>
					)}
				></Column>
				<Column
					style={{ textAlign: 'right' }}
					field="delta"
					header="Day Gain"
					body={(rowData) => (
						<div
							style={{ color: `${rowData.delta > 0 ? '#1abd1a' : 'silver'}` }}
						>
							{`
						+${rowData.delta.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
						</div>
					)}
				></Column>
			</DataTable>
		</div>
	);
};

export default RS3Minigames;

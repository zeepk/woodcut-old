import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Column } from 'primereact/column';

const RS3Minigames = (props) => {
	const columnOptions = [
		{ label: 'Week', value: 'week' },
		{ label: 'Month', value: 'month' },
		{ label: 'Year', value: 'year' },
	];
	const minigameData = props.data;
	const [duration, changeDuration] = useState('week');

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
					field="day"
					header="Day Gain"
					body={(rowData) => (
						<div style={{ color: `${rowData.day > 0 ? '#1abd1a' : 'silver'}` }}>
							{`
						+${rowData.day.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
						</div>
					)}
				></Column>
				<Column
					style={{ textAlign: 'right' }}
					field={duration}
					header={
						<Dropdown
							style={{ position: 'relative', zIndex: 1000, minWidth: '100px' }}
							value={duration}
							options={columnOptions}
							onChange={(e) => {
								changeDuration(e.value);
							}}
							placeholder="Select a Duration"
						/>
					}
					body={(rowData) => (
						<div
							style={{ color: 'silver' }}
							className={rowData[duration] > 0 ? 'gainz' : ''}
						>
							{`
						+${rowData[duration].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
						</div>
					)}
				></Column>
			</DataTable>
		</div>
	);
};

export default RS3Minigames;

import React, { useState } from 'react';
import { calcVirtualLevel, skillIcon } from '../../Data';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
const RS3Skills = (props) => {
	const columnOptions = [
		{ label: 'Week', value: 'week' },
		{ label: 'Month', value: 'month' },
		{ label: 'Year', value: 'year' },
	];
	const [duration, changeDuration] = useState('week');
	const vw = Math.max(
		document.documentElement.clientWidth || 0,
		window.innerWidth || 0
	);
	const truncate = vw < 550;
	const skillData = props.data;
	// console.table(skillData);
	return (
		<div>
			<DataTable
				value={skillData}
				scrollable
				ScrollWidth={'1000px'}
				style={{ minWidth: '600px' }}
			>
				<Column
					style={{ textAlign: 'left', width: `${truncate ? '10px' : '200px'}` }}
					field="code"
					header="Skill"
					body={(rowData) => (
						<div>
							{skillIcon(rowData.id)}
							{truncate ? '' : ` ${rowData.name}`}
						</div>
					)}
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
					field="level"
					header="Level"
					body={(rowData) => (
						<div>
							{calcVirtualLevel(rowData)
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						</div>
					)}
				></Column>
				<Column
					style={{ textAlign: 'right' }}
					field="xp"
					header="XP"
					body={(rowData) => (
						<div>
							{rowData.xp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
							placeholder="Select a City"
						/>
					}
					body={(rowData) => (
						<div
							style={{
								color: `${rowData[duration] > 0 ? '#1abd1a' : 'silver'}`,
							}}
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

export default RS3Skills;

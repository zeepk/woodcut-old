import React from 'react';
import { calcVirtualLevel, skillIcon } from '../../Data';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const RS3Skills = (props) => {
	const skillData = props.data;
	// console.table(skillData);
	return (
		<div>
			<DataTable value={skillData}>
				<Column
					field="code"
					header="Skill"
					body={(rowData) => (
						<div style={{ textAlign: 'left', width: '200px' }}>
							{skillIcon(rowData.id)}
							{` ${rowData.name}`}
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
			</DataTable>
		</div>
	);
};

export default RS3Skills;

import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import CircularProgress from '@material-ui/core/CircularProgress';
import { calcSkillPercentage } from '../../Data';

const RS3User = (props) => {
	var defaultOption = 0;
	const badges = props.badges;
	if (badges.maxXP || badges.all120) {
		defaultOption = 3;
	} else if (badges.maxTotal) {
		defaultOption = 2;
	} else if (badges.max) {
		defaultOption = 1;
	}
	const options = [
		{ label: 'Max', value: 'max' },
		{ label: 'Max Total', value: 'maxtotal' },
		{ label: '120 All', value: '120all' },
		{ label: 'Max XP', value: 'maxxp' },
	];
	const [selection, updateSelection] = useState(options[defaultOption].value);
	const percentage = calcSkillPercentage(selection, props.skills.slice(1, 29));
	return (
		<div>
			<div className="p-grid" style={{ margin: 0 }}>
				<div className="p-col-12">
					<Dropdown
						style={{
							width: '120px',
						}}
						value={selection}
						options={options}
						onChange={(e) => {
							updateSelection(e.value);
						}}
					/>
				</div>
				<div className="p-col-12">{`${percentage.remainder
					.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} xp left!`}</div>
				<div className="p-col-12">{`${percentage.percentage.toFixed(2)}%`}</div>
				<div className="p-col-12">
					<CircularProgress
						size={'100px'}
						variant="static"
						value={percentage.percentage}
					/>
				</div>
			</div>
		</div>
	);
};

export default RS3User;

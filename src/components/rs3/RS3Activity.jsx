import React from 'react';
import { DateTime } from 'luxon';

const RS3Activity = (props) => {
	const activityDateTime = DateTime.fromISO(
		new Date(props.data.activityDate).toISOString()
	);
	return (
		<div style={{ textAlign: 'left' }}>
			<div style={{ fontSize: '18px' }}>
				{props.data.title.replace('000000XP', 'm xp')}
			</div>

			<div style={{ fontSize: '10px' }}>
				{activityDateTime.toLocaleString(DateTime.DATETIME_FULL)}
			</div>

			<div style={{ fontSize: '12px' }}>
				{props.data.details.replace('000000 e', 'm e')}
			</div>
		</div>
	);
};

export default RS3Activity;

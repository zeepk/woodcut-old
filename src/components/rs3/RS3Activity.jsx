import React from 'react';

const RS3Activity = (props) => {
	return (
		<div style={{ textAlign: 'left' }}>
			<div style={{ fontSize: '18px' }}>
				{props.data.title.replace('000000XP', 'm xp')}
			</div>
			<div style={{ fontSize: '12px' }}>
				{props.data.details.replace('000000 e', 'm e')}
			</div>
		</div>
	);
};

export default RS3Activity;

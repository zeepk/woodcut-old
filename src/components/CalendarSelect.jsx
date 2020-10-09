import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';

const CalendarSelect = (props) => {
	const defaultDate = new Date();
	defaultDate.setDate(defaultDate.getDate() - 7);
	const [dates, updateDates] = useState([
		new Date(localStorage.getItem('chartStartDate')),
		new Date(localStorage.getItem('chartEndDate')),
	]);
	return (
		<Calendar
			value={dates}
			onChange={(e) => {
				updateDates(e.value);
				if (e.value[0] && e.value[1]) {
					window.localStorage.setItem('chartStartDate', e.value[0].toString());
					window.localStorage.setItem('chartEndDate', e.value[1].toString());
					props.updateChart(e.value[0], e.value[1]);
				}
			}}
			selectionMode="range"
			readOnlyInput
		/>
	);
};

export default CalendarSelect;

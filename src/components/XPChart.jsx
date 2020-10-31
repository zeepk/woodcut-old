import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import CalendarSelect from './CalendarSelect';
const axios = require('axios');

const API_URL = process.env.REACT_APP_API_URL;

const basicOptions = {
	maintainAspectRatio: false,
	tooltips: {
		callbacks: {
			label: function (item) {
				return item.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			},
		},
	},
	legend: {
		labels: {
			fontColor: 'white',
		},
	},
	scales: {
		xAxes: [
			{
				ticks: {
					fontColor: 'white',
				},
			},
		],
		yAxes: [
			{
				ticks: {
					fontColor: 'white',
					suggestedMin: 0,
					beginAtZero: true,
					callback: function (value) {
						return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					},
				},
			},
		],
	},
};
const XPChart = (props) => {
	if (
		localStorage.getItem('chartStartDate') === null ||
		localStorage.getItem('chartEndDate') === null
	) {
		console.log('No local storage found. Creating...');
		const defaultDate = new Date();
		defaultDate.setDate(defaultDate.getDate() - 7);
		window.localStorage.setItem('chartStartDate', defaultDate.toString());
		window.localStorage.setItem('chartEndDate', new Date().toString());
	}
	const [labels, updateLabels] = useState([]);
	const [datasets, updateDatasets] = useState([]);
	const [xpGain, updateXPGain] = useState(0);
	const player_name = props.player_name || '';
	const username = player_name.split(' ').join('+').split('%20').join('+');
	const updateChart = (startDate, endDate) => {
		axios({
			method: 'get',
			// url: `http://localhost:8000/users/daterange/${username}`,
			url: `${API_URL}/users/daterange/${username}`,
			headers: {},
			params: {
				startDate,
				endDate,
			},
		}).then((res) => {
			if (res.data.recordsInRange) {
				updateLabels(
					res.data.recordsInRange.map((record) =>
						new Date(record.date).toLocaleDateString()
					)
				);
				updateDatasets([
					{
						label: 'Total XP Gain',
						backgroundColor: '#637747',
						data: res.data.recordsInRange.map((record) => record.stats[0][3]),
					},
				]);
				updateXPGain(
					res.data.recordsInRange.reduce((a, b) => a + +b.stats[0][3], 0)
				);
			}
		});
	};
	useEffect(() => {
		updateChart(
			new Date(localStorage.getItem('chartStartDate')),
			new Date(localStorage.getItem('chartEndDate'))
		);
	}, []);

	return (
		<div>
			<span>
				<CalendarSelect updateChart={updateChart} />
				<span style={{ margin: '0 10px 0 30px' }}>Total Gain:</span>
				<span style={{ color: 'var(--gainz)' }}>{` +${xpGain
					.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}xp`}</span>
			</span>
			<Chart
				style={{ minHeight: '80vh' }}
				type="bar"
				data={{ labels, datasets }}
				options={basicOptions}
			/>
		</div>
	);
};

export default XPChart;

import React, { useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import { Chart } from 'primereact/chart';
const axios = require('axios');

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
	const defaultDate = new Date();
	defaultDate.setDate(defaultDate.getDate() - 7);
	const [labels, updateLabels] = useState([]);
	const [datasets, updateDatasets] = useState([]);
	const [dates, updateDates] = useState([defaultDate, new Date()]);
	const player_name = props.player_name || '';
	const username = player_name.split(' ').join('+').split('%20').join('+');
	const updateChart = (startDate, endDate) => {
		axios({
			method: 'get',
			url: `https://hidden-oasis-88699.herokuapp.com/users/daterange/${username}`,
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
			}
		});
	};
	useEffect(() => {
		updateChart(defaultDate, new Date());
	}, []);

	return (
		<div>
			<Calendar
				id="range"
				value={dates}
				onChange={(e) => {
					updateDates(e.value);
					console.log(e.value[0]);
					console.log(e.value[1]);
					console.log('--------------');
					if (e.value[0] && e.value[1]) {
						updateChart(e.value[0], e.value[1]);
					}
				}}
				selectionMode="range"
				readOnlyInput
			/>
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

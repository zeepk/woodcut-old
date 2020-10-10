import React, { useState, useEffect } from 'react';
import RS3CompareChart from './RS3CompareChart';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLocation } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import styled from 'styled-components';

const axios = require('axios');

const RS3Compare = () => {
	const [user1, updateUser1] = useState(
		useLocation().search.substr(1).split('&')[0]?.toLowerCase().substr(6) || ''
	);
	const [user2, updateUser2] = useState(
		useLocation().search.substr(1).split('&')[1]?.toLowerCase().substr(6) || ''
	);
	const [user1SkillHistory, updateUser1SkillHistory] = useState([]);
	const [user2SkillHistory, updateUser2SkillHistory] = useState([]);
	const [loading, updateLoading] = useState(false);
	useEffect(() => {
		if (user1 && user2) {
			getSkillData();
		}
	}, []);

	const getSkillData = () => {
		updateLoading(true);
		const user1APICall = axios({
			method: 'put',
			url: `https://hidden-oasis-88699.herokuapp.com/users/delta/${user1}`,
			data: {
				username: user1,
			},
		})
			.then((response) => {
				updateUser1SkillHistory(response.data);
			})
			.catch((err) => console.log(err));
		const user2APICall = axios({
			method: 'put',
			url: `https://hidden-oasis-88699.herokuapp.com/users/delta/${user2}`,
			data: {
				username: user2,
			},
		})
			.then((response) => {
				updateUser2SkillHistory(response.data);
			})
			.catch((err) => console.log(err));
		Promise.all([user1APICall, user2APICall]).then(() => {
			updateLoading(false);
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		window.location.href = `/compare/?user1=${user1
			.split(' ')
			.join('+')}&user2=${user2.split(' ').join('+')}`;
		if (user1 && user2) {
			getSkillData();
		}
	};
	var content = <Title>Compare two players!</Title>;
	if (loading) {
		content = (
			<div style={{ height: '100vh' }}>
				<CircularProgress
					style={{
						position: 'fixed',
						left: '45vw',
						top: '45vh',
					}}
					size={'10vw'}
					color="secondary"
				/>
			</div>
		);
	} else if (user1SkillHistory.statRecords?.length > 0) {
		content = (
			<RS3CompareChart skillData={{ user1SkillHistory, user2SkillHistory }} />
		);
	}

	return (
		<View>
			<FormContainer
				className="p-formgroup-inline"
				onSubmit={(e) => handleSubmit(e)}
			>
				<div className="p-field">
					<label htmlFor="firstname5" className="p-sr-only">
						User 1
					</label>
					<InputText
						id="firstname5"
						type="text"
						placeholder="User 1"
						onChange={(e) => updateUser1(e.target.value)}
					/>
				</div>
				<div className="p-field">
					<label htmlFor="lastname5" className="p-sr-only">
						User 2
					</label>
					<InputText
						id="lastname5"
						type="text"
						placeholder="User 2"
						onChange={(e) => updateUser2(e.target.value)}
					/>
				</div>
				<Button type="submit" label="Compare" />
			</FormContainer>
			{content}
		</View>
	);
};

const View = styled.div`
	min-height: 90vh;
`;
const FormContainer = styled.form`
	margin: 2vh auto 0 5vw;
	max-width: 600px;
`;
const Title = styled.h1`
	margin: 20vh auto;
	color: yellow;
	font-family: RuneScape UF;
`;
export default RS3Compare;

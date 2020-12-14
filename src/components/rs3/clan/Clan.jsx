import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
// import { showDxpData } from '../../../utils/constants';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CircularProgress from '@material-ui/core/CircularProgress';
import RS3LeaderboardActivityList from '../leaderboard/RS3LeaderboardActivityList';
const API_URL = process.env.REACT_APP_API_URL;

const Clan = () => {
	const [memberCount, updateMemberCount] = useState(0);
	const [members, updateMembers] = useState([]);
	const [names, updateNames] = useState([]);
	const [activities, updateActivities] = useState([]);
	const [loading, updateLoading] = useState(true);
	const rowHeight = '7vh';
	const avatarHeight = '5vh';
	const clanName =
		useLocation()
			.search.substr(1)
			.split('=')[1]
			.split('%20')
			.join(' ')
			.split('+')
			.join(' ')
			.toLowerCase() || 'gainz squad';
	useEffect(() => {
		const membersCall = fetch(`${API_URL}/clans/members/?name=${clanName}`)
			.then((res) => res.json())
			.then((res) => {
				updateNames(res.names);
				updateMemberCount(res.memberCount);
				updateMembers(res.members);
			});
		const activitiesCall = fetch(
			`${API_URL}/clans/activities/?name=${clanName}`
		)
			.then((res) => res.json())
			.then((res) => {
				updateActivities(res);
			});
		Promise.all([activitiesCall, membersCall]).then(() => {
			updateLoading(false);
		});
	}, [clanName]);
	if (loading) {
		return (
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
	}
	return (
		<ClanContainer>
			<div className="p-grid" style={{ margin: 0 }}>
				<div className="p-col-12 p-lg-4">
					<ColumnTitle>Gainz</ColumnTitle>
					<DataTable
						value={members}
						style={{
							border: '2px solid silver',
							borderRadius: '10px',
							maxWidth: '95vw',
							maxHeight: '100vh',
						}}
					>
						<Column
							header="Player"
							body={(rowData) => {
								return (
									<a
										href={`/rs3/?${rowData.username}`}
										style={{ color: 'white' }}
									>
										<span style={{ height: avatarHeight }}>
											<img
												src={`https://secure.runescape.com/m=avatar-rs/${rowData.username}/chat.png`}
												alt={'avatar'}
												style={{ maxHeight: avatarHeight }}
											/>
											{rowData.username.split('+').join(' ')}
										</span>
									</a>
								);
							}}
							style={{ textAlign: 'left', height: rowHeight }}
						/>

						<Column
							header="XP Gain"
							style={{ textAlign: 'right' }}
							body={(rowData) => {
								return (
									<div className="gainz">
										{'+' +
											rowData.dayGain
												.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
									</div>
								);
							}}
						/>
					</DataTable>
				</div>
				<div className="p-col">
					<ClanName>{clanName}</ClanName>
					<MemberCount>{memberCount} Members</MemberCount>
					<Banner
						src={`https://services.runescape.com/m=avatar-rs/${clanName
							.split(' ')
							.join('+')}/clanmotif.png`}
					/>
					<DataTable
						value={names}
						style={{
							border: '2px solid silver',
							borderRadius: '10px',
							maxWidth: '95vw',
							maxHeight: '50vh',
							overflow: 'auto',
						}}
					>
						<Column
							header="Member List"
							style={{ textAlign: 'left' }}
							field="name"
							body={(rowData) => (
								<NameLink href={`/rs3/?${rowData.name}`}>
									{rowData.name.split('+').join(' ')}
								</NameLink>
							)}
							sortable
							filter
						/>
					</DataTable>
				</div>
				<div className="p-col-12 p-lg-4">
					<ColumnTitle>Achievements</ColumnTitle>
					<RS3LeaderboardActivityList activities={activities} />
				</div>
			</div>
		</ClanContainer>
	);
};

export default Clan;

const ClanContainer = styled.div`
	color: white;
	min-height: 100vh;
`;

const ClanName = styled.p`
	font-family: RuneScape UF;
	font-size: 2rem;
	text-align: center;
	margin: 0;
	text-transform: capitalize;
`;

const MemberCount = styled.p`
	font-size: 1.2rem;
	font-family: RuneScape UF;
	text-align: center;
	margin: 0;
`;

const Banner = styled.img`
	max-width: 100%;
	margin: 0 auto 20px auto;
`;

const ColumnTitle = styled.p`
	font-size: 2rem;
	text-align: center;
`;

const NameLink = styled.a`
	font-size: 1rem;
	color: white;
	text-decoration: none;
	&:hover {
		color: var(--gainz);
	}
`;

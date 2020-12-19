import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { clanBannerLoadingText } from '../../../utils/constants';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CircularProgress from '@material-ui/core/CircularProgress';
import RS3LeaderboardActivityList from '../leaderboard/RS3LeaderboardActivityList';
const API_URL = process.env.REACT_APP_API_URL;

const Clan = () => {
	const [memberCount, updateMemberCount] = useState(0);
	const [members, updateMembers] = useState([]);
	const [activities, updateActivities] = useState([]);
	const [loading, updateLoading] = useState(true);
	const [banner, updateBanner] = useState(false);

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
		const clanCall = fetch(`${API_URL}/clans/?name=${clanName}`)
			.then((res) => res.json())
			.then((res) => {
				const clan = res.clan;
				updateMemberCount(clan.memberCount);
				updateMembers(
					clan.members.map((member) => {
						member.totalLevel = 0 - member.totalLevel;
						member.totalXp = 0 - member.totalXp;
						member.runeScore = 0 - member.runeScore;
						return member;
					})
				);
			});
		const activitiesCall = fetch(
			`${API_URL}/clans/activities/?name=${clanName}`
		)
			.then((res) => res.json())
			.then((res) => {
				updateActivities(res);
			});
		Promise.all([activitiesCall, clanCall]).then(() => {
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
						value={members.sort((a, b) => b.dayGain - a.dayGain).slice(0, 30)}
						style={{
							border: '2px solid silver',
							borderRadius: '10px',
							maxHeight: '80vh',
							overflow: 'auto',
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
						onLoad={() => updateBanner(true)}
					/>
					{!banner ? (
						<div style={{ padding: '5px' }}>
							<CircularProgress size={'80px'} color="secondary" />
							<BannerLoadingText>{clanBannerLoadingText}</BannerLoadingText>
						</div>
					) : (
						<div />
					)}
					<DataTable
						value={members}
						style={{
							border: '2px solid silver',
							borderRadius: '10px',
							maxWidth: '95vw',
							maxHeight: '90vh',
							height: 'auto',
							overflow: 'auto',
						}}
					>
						<Column
							header="Player"
							style={{ textAlign: 'left' }}
							field="username"
							body={(rowData) => (
								<NameLink href={`/rs3/?${rowData.username}`}>
									{rowData.username.split('+').join(' ')}
								</NameLink>
							)}
							sortable
							filter
						/>
						<Column
							header="Total Level"
							style={{ textAlign: 'right' }}
							field="totalLevel"
							body={(rowData) =>
								rowData.totalLevel
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									.replace('-', '')
							}
							sortable
						/>
						<Column
							header="Total XP"
							style={{ textAlign: 'right' }}
							field="totalXp"
							body={(rowData) =>
								rowData.totalXp
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									.replace('-', '')
							}
							sortable
						/>
						<Column
							header="Runescore"
							style={{ textAlign: 'right' }}
							field="runeScore"
							body={(rowData) =>
								rowData.runeScore
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									.replace('-', '')
							}
							sortable
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

const BannerLoadingText = styled.p`
	font-size: 0.8rem;
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

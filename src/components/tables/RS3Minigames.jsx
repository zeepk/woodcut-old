import React from 'react'
import { rs3_data_array, calcVirtualLevel, skillIcon } from '../../Data'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const RS3Minigames = (props) => {
	const minigameData = props.data
	// .then(function(info) {
	//     return fetch(
	//         proxyurl +
	//             'https://apps.runescape.com/runemetrics/profile/profile?user=' +
	//             player_name +
	//             '&activities=20'
	//     );
	// })
	// .then(res => res.json())
	// // .then(res => this.setState({log: res}))
	// .then(
	//     result => {
	//         this.setState({ log: result });
	//     },

	//     error => {
	//         console.log('profile private');
	//     }
	// );

	return (
		<div>
			<TableContainer style={{ color: 'white' }}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Minigame</TableCell>
							<TableCell align="right">Rank</TableCell>
							<TableCell align="right">Score</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{minigameData.map((row) => (
							<TableRow key={row.name}>
								<TableCell component="th" scope="row">
									{row.name}
								</TableCell>
								<TableCell align="right">
									{row.rank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								</TableCell>
								<TableCell align="right">
									{row.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default RS3Minigames

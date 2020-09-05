import React from 'react'
import { calcVirtualLevel, skillIcon } from '../../Data'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const RS3Skills = (props) => {
	const skillData = props.data
	return (
		<div>
			<TableContainer style={{ color: 'white' }}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Skill</TableCell>
							<TableCell align="right">Rank</TableCell>
							<TableCell align="right">Level</TableCell>
							<TableCell align="right">XP</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{skillData.map((row) => (
							<TableRow key={row.name}>
								<TableCell component="th" scope="row">
									{skillIcon(row.id)} {` ${row.name}`}
								</TableCell>
								<TableCell align="right">
									{row.rank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								</TableCell>
								<TableCell align="right">
									{calcVirtualLevel(row)
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								</TableCell>
								<TableCell align="right">
									{row.xp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default RS3Skills

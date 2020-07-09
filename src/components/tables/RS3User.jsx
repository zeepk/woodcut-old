import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

import Grid from '@material-ui/core/Grid'

const RS3User = (props) => {
	const [loading, updateLoading] = useState(true)
	return (
		<div>
			<Grid container style={{ margin: '5vh 0 0 0', color: 'white' }}>
				<Grid item xs={12}>
					<img
						src={`http://secure.runescape.com/m=avatar-rs/${props.name}/chat.png`}
						alt={'nice'}
						onLoad={() => updateLoading(false)}
					/>
					{loading ? (
						<CircularProgress size={'100px'} color="secondary" />
					) : (
						<div />
					)}
				</Grid>
				<Grid item xs={12}>
					<h1>
						{props.name.replace('_', ' ').replace('+', ' ').replace('%20', ' ')}
					</h1>
				</Grid>
				{/* <Grid item xs={12}>
					<h1>
						{props.name.replace('_', ' ').replace('+', ' ').replace('%20', ' ')}
					</h1>
				</Grid> */}
			</Grid>
		</div>
	)
}

export default RS3User

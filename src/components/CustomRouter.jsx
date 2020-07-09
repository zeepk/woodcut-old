import React from 'react'
import RS3 from './RS3'
import OSRS from './OSRS'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const CustomRouter = () => {
	return (
		<div>
			<Switch>
				<Route path="/rs3">
					<RS3 />
				</Route>
				<Route path="/osrs">
					<OSRS />
				</Route>
			</Switch>
		</div>
	)
}

export default CustomRouter

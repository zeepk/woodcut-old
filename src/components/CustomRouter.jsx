import React from 'react';
import RS3 from './RS3';
import OSRS from './OSRS';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

const CustomRouter = () => {
	return (
		<div>
			<Router>
				<Switch>
					<Route
						exact
						path="/"
						render={() => {
							return <Redirect to="/rs3" />;
						}}
					/>
					<Route path="/rs3">
						<RS3 />
					</Route>
					<Route path="/osrs">
						<OSRS />
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default CustomRouter;

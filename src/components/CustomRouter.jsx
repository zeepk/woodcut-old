import React from 'react';
import RS3 from './RS3';
import OSRS from './OSRS';
import RS3Compare from './rs3/RS3Compare';
import Clan from './rs3/clan/Clan';
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
					<Route path="/clan">
						<Clan />
					</Route>
					<Route path="/compare">
						<RS3Compare />
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

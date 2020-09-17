import React from 'react';
import './App.css';
import CustomNavbar from './components/CustomNavbar';
import Footer from './components/Footer';
import CustomRouter from './components/CustomRouter';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactGA from 'react-ga';

import 'primereact/resources/themes/luna-pink/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
function initializeReactGA() {
	ReactGA.initialize('UA-178282727-1');
	ReactGA.pageview('/homepage');
}
initializeReactGA();
function App() {
	return (
		<div className="App">
			<CustomNavbar />
			<Router>
				<CustomRouter />
			</Router>
			<Footer />
		</div>
	);
}

export default App;

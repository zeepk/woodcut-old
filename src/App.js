import React from 'react'
import './App.css'
import CustomNavbar from './components/CustomNavbar'
import CustomRouter from './components/CustomRouter'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function App() {
	return (
		<div className="App">
			<CustomNavbar />
			<Router>
				<CustomRouter />
			</Router>
		</div>
	)
}

export default App

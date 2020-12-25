import React, { useEffect, useState, useRef } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Logo from '../images/woodcutLogo.png';
import { Toast } from 'primereact/toast';
import { DateTime, Interval } from 'luxon';

const API_URL = process.env.REACT_APP_API_URL;

const CustomNavbar = () => {
	const toast = useRef(null);
	const [name, updateName] = useState([]);
	const [count, updateCount] = useState(0);

	const alertDetail = (
		<p>
			This site is currently being rewritten. Data may be invalid. Thank you for
			your patience, and feel free to send ideas for the next version to{' '}
			<a href="https://twitter.com/zeepkrs">@zeepkrs</a> on Twitter.
		</p>
	);
	useEffect(() => {
		toast.current.show({
			severity: 'warn',
			summary: 'Site Maintenance',
			detail: alertDetail,
			sticky: true,
		});
		// first, tries to fetch 20 activities with the good proxyurl
		fetch(`${API_URL}/users/playercount`)
			.then((res) => res.json())
			.then((res) => {
				updateCount(res.players);
			});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(name);
		window.location.href = `/rs3/?${name.split(' ').join('+')}`;
	};

	const now = DateTime.fromObject({
		zone: 'utc',
	});
	const then = DateTime.fromObject({
		hour: 6,
		zone: 'utc',
	}).plus({ days: now.hour < 6 ? 0 : 1 });
	// console.log(now.toLocaleString(DateTime.DATETIME_MED));
	// console.log(then.toLocaleString(DateTime.DATETIME_MED));
	const hours = Interval.fromDateTimes(now, then).length('hours');
	return (
		<div>
			<Toast ref={toast} />
			<Navbar bg="dark" variant="dark" expand="sm">
				<Navbar.Brand href="/rs3">
					<img
						src={Logo}
						alt="Woodcut"
						style={{ height: '40px', margin: '-10px 10px 0 0' }}
					/>
					Woodcut
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="/rs3">Leaderboards</Nav.Link>
						<Nav.Link href="/compare">Compare</Nav.Link>
						{/* <Nav.Link href="/osrs">Old School Runescape</Nav.Link>
				<Nav.Link href="#about">About</Nav.Link> */}
					</Nav>
					<div
						style={{
							color: 'white',
							margin: '0 30px 0 0',
							fontSize: '14px',
							textAlign: 'left',
						}}
					>{`There are ${
						count?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || 'some'
					} players online`}</div>
					<div
						style={{
							color: 'white',
							margin: '0 10px 0 0',
							fontSize: '14px',
							textAlign: 'left',
						}}
					>{`Day ends in ${Math.floor(hours)} hrs ${Math.floor(
						(hours - Math.floor(hours)) * 60
					)} mins`}</div>
					<Form inline onSubmit={(e) => handleSubmit(e)}>
						<FormControl
							type="text"
							placeholder="Search for a player"
							className="mr-sm-2"
							onChange={(e) => updateName(e.target.value)}
							style={{
								fontFamily: 'RuneScape UF',
								fontSize: '20px',
								width: '200px',
							}}
						/>
						<Button
							variant="outline-info"
							type="submit"
							style={{ margin: '0 auto' }}
						>
							Search
						</Button>
					</Form>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export default CustomNavbar;

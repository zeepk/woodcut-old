import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Logo from '../images/woodcutLogo.png';
const CustomNavbar = () => {
	const [name, updateName] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(name);
		window.location.href = `/rs3/?${name}`;
	};

	var now = new Date();
	var then = new Date(now);
	then.setUTCHours(30, 0, 0, 0);
	const hours = (then - now) / 3600000;
	return (
		<Navbar bg="dark" variant="dark">
			<Navbar.Brand href="/rs3">
				<img
					src={Logo}
					alt="Woodcut"
					style={{ height: '40px', margin: '-10px 10px 0 0' }}
				/>
				Woodcut
			</Navbar.Brand>
			<Nav className="mr-auto">
				<Nav.Link href="/rs3">Runescape 3</Nav.Link>
				{/* <Nav.Link href="/osrs">Old School Runescape</Nav.Link>
				<Nav.Link href="#about">About</Nav.Link> */}
			</Nav>
			<div
				style={{ color: 'white', margin: '0 10px 0 0', fontSize: '14px' }}
			>{`Day ends in ${Math.floor(hours)} hrs at 6am UTC`}</div>
			<Form inline onSubmit={(e) => handleSubmit(e)}>
				<FormControl
					type="text"
					placeholder="Search for a player"
					className="mr-sm-2"
					onChange={(e) => updateName(e.target.value)}
					style={{ fontFamily: 'RuneScape UF', fontSize: '20px' }}
				/>
				<Button variant="outline-info" type="submit">
					Search
				</Button>
			</Form>
		</Navbar>
	);
};

export default CustomNavbar;

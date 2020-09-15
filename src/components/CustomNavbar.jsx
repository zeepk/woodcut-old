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
	then.setUTCHours(6, 0, 0, 0);
	const hours = (then - now) / 3600000;
	return (
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
					<Nav.Link href="/rs3">Runescape 3</Nav.Link>
					{/* <Nav.Link href="/osrs">Old School Runescape</Nav.Link>
				<Nav.Link href="#about">About</Nav.Link> */}
				</Nav>
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
	);
};

export default CustomNavbar;

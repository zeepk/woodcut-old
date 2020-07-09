import React, { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
const CustomNavbar = () => {
	const [name, updateName] = useState([])

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(name)
		window.location.href = `/rs3/?${name}`
	}
	return (
		<Navbar bg="dark" variant="dark">
			<Navbar.Brand href="/rs3">Woodcut</Navbar.Brand>
			<Nav className="mr-auto">
				<Nav.Link href="/rs3">Runescape 3</Nav.Link>
				{/* <Nav.Link href="/osrs">Old School Runescape</Nav.Link>
				<Nav.Link href="#about">About</Nav.Link> */}
			</Nav>
			<Form inline onSubmit={(e) => handleSubmit(e)}>
				<FormControl
					type="text"
					placeholder="Search for a player"
					className="mr-sm-2"
					onChange={(e) => updateName(e.target.value)}
				/>
				<Button variant="outline-info" type="submit">
					Search
				</Button>
			</Form>
		</Navbar>
	)
}

export default CustomNavbar

import React from 'react';

const Footer = () => {
	return (
		<div>
			<div
				className="p-grid"
				style={{
					textAlign: 'center',
					// height: '50px',
					backgroundColor: 'black',
					color: 'white',
					margin: 0,
					padding: '0 5vw 2vh 5vw',
					fontSize: '20px',
					fontFamily: 'RuneScape UF',
				}}
			>
				<div className="p-md-2 p-col-12">
					<a
						href="https://twitter.com/matthughes2112"
						className="footer-link"
						style={{ color: 'cyan' }}
					>
						dm me suggestions & bugs
					</a>
				</div>
				<div className="p-md-2 p-col-12">
					<a
						href="https://github.com/zeepk/woodcut"
						className="footer-link"
						style={{ color: 'white' }}
					>
						here's the code
					</a>
				</div>
				<div className="p-col"></div>
			</div>
		</div>
	);
};

export default Footer;

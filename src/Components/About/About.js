import React, { useContext } from 'react';
import ThemeContext from '../../themeContext';
import poweredDark from '../../Images/poweredDark.png';
import poweredLight from '../../Images/poweredLight.png';
import react from '../../Images/credits1.png';
import apexchart from '../../Images/credits2.png';
import fontawesome from '../../Images/credits3.png';

const constants = require('../../Constants');

const About = () => {
	const theme = useContext(ThemeContext);

	const textColor = theme === constants.LIGHTTHEME ? '#000000' : '#ffffff';

	return (
		<div
			style={{
				width: '600px',
				padding: '30px',
				marginBottom: '30px',
				textAlign: 'center',
				backgroundColor: theme === constants.LIGHTTHEME ? '#ffffff' : '#343a40',
			}}>
			<span style={{ fontSize: '20px', fontWeight: 'bold', color: textColor }}>Covid19 INDIA</span>
			<p style={{ fontSize: '12px', fontStyle: 'italic', color: textColor }}>Version {constants.VERSION}</p>
			<div style={{ marginTop: '50px' }} className='row'>
				<div style={{ width: '33%' }}>
					<p style={{ color: textColor, textDecoration: 'underline' }}>Developed By</p>
					<p style={{ fontWeight: 'bold', color: textColor }}>{constants.COMPANYNAME}</p>
				</div>
				<div style={{ width: '34%' }}>
					<p style={{ color: textColor, textDecoration: 'underline' }}>Author</p>
					<p style={{ fontWeight: 'bold', color: textColor }}>{constants.AUTHOR}</p>
				</div>
				<div style={{ width: '33%' }}>
					<p style={{ color: textColor, textDecoration: 'underline' }}>Powered By</p>
					<a href='https://www.covid19india.org/' target='_blank' rel='noopener noreferrer'>
						<img
							style={{ width: '120px', marginLeft: '10px', borderRadius: '5px' }}
							src={theme === constants.LIGHTTHEME ? poweredLight : poweredDark}
							alt='poweredLogo'
						/>
					</a>
				</div>
			</div>
			<div style={{ marginTop: '50px' }}>
				<p style={{ fontSize: '18px', fontWeight: 'bold', color: textColor }}>Credits</p>
				<p style={{ color: textColor }}>Covid19 India Extension is Using these awesome Libraries</p>
				<div style={{ marginTop: '30px' }} className='row'>
					<a style={{ width: '30%' }} href='https://reactjs.org/' target='_blank' rel='noopener noreferrer'>
						<img style={{ height: '35px', marginLeft: '10px', borderRadius: '5px' }} src={react} alt='react' />
					</a>
					<a style={{ width: '40%' }} href='https://apexcharts.com/' target='_blank' rel='noopener noreferrer'>
						<img style={{ height: '35px', marginLeft: '10px', borderRadius: '5px' }} src={apexchart} alt='apexchart' />
					</a>
					<a style={{ width: '30%' }} href='https://fontawesome.com/' target='_blank' rel='noopener noreferrer'>
						<img style={{ height: '35px', marginLeft: '10px', borderRadius: '5px' }} src={fontawesome} alt='fontawesome' />
					</a>
				</div>
			</div>
		</div>
	);
};

export default About;

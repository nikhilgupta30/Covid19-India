import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faInfoCircle, faHome, faCog, faChartLine } from '@fortawesome/free-solid-svg-icons';
import ThemeContext from '../../themeContext';

const constants = require('../../Constants');

const Footer = ({ changeColorTheme, onMenuClick }) => {
	const theme = useContext(ThemeContext);

	return (
		<div
			style={{
				width: '100%',
				height: '35px',
				position: 'fixed',
				left: '0',
				bottom: '0',
				paddingLeft: '10px',
				paddingRight: '10px',
				paddingTop: '4px',
				backgroundColor: constants.FOOTERDARK,
			}}>
			<div style={{ float: 'left' }}>
				<FontAwesomeIcon
					onClick={() => {
						onMenuClick(constants.MENUHOME);
					}}
					title={constants.MENUHOME}
					style={{ cursor: 'pointer', fontSize: '20px', color: '#FFFFFF' }}
					icon={faHome}
				/>
				<FontAwesomeIcon
					onClick={() => {
						onMenuClick(constants.MENUTRENDS);
					}}
					title={constants.MENUTRENDS}
					style={{ cursor: 'pointer', fontSize: '20px', color: '#FFFFFF', marginLeft: '10px' }}
					icon={faChartLine}
				/>
				{/* <FontAwesomeIcon
					onClick={() => {
						onMenuClick(constants.MENUSETTINGS);
					}}
					title={constants.MENUSETTINGS}
					style={{ cursor: 'pointer', fontSize: '20px', color: '#FFFFFF', marginLeft: '10px' }}
					icon={faCog}
				/> */}
				<FontAwesomeIcon
					onClick={() => {
						onMenuClick(constants.MENUABOUT);
					}}
					title={constants.MENUABOUT}
					style={{ cursor: 'pointer', fontSize: '20px', color: '#FFFFFF', marginLeft: '10px' }}
					icon={faInfoCircle}
				/>
				<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#FFFFFF', paddingLeft: '150px' }}>
					Covid19 <span style={{ color: 'orange' }}>IN</span>D<span style={{ color: 'green' }}>IA</span>
				</span>
			</div>
			<span style={{ float: 'right', paddingTop: '2px' }}>
				<FontAwesomeIcon
					onClick={() => {
						changeColorTheme();
					}}
					style={{ cursor: 'pointer', fontSize: '20px', color: theme === constants.LIGHTTHEME ? '#1b8dcc' : 'orange' }}
					title={theme === constants.LIGHTTHEME ? 'Dark Theme' : 'Light Theme'}
					icon={theme === constants.LIGHTTHEME ? faMoon : faSun}
				/>
			</span>
		</div>
	);
};

export default Footer;

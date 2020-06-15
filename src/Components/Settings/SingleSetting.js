import React, { useContext } from 'react';
import RadioButton from './RadioButton';
import ThemeContext from '../../themeContext';

const constants = require('../../Constants');

const SingleSetting = ({ divTitle, labels, radioButtonWidth, handleChange, selectedRadio }) => {
	const theme = useContext(ThemeContext);
	const RadioRow = labels.map((label) => {
		return (
			<RadioButton
				label={label}
				name={divTitle.replace(/ /g, '')}
				divWidth={radioButtonWidth}
				handleChange={handleChange}
				radioChecked={selectedRadio === label ? true : false}
			/>
		);
	});

	return (
		<div style={{ textAlign: 'left' }}>
			<span style={{ color: theme === constants.LIGHTTHEME ? '#000000' : '#ffffff' }}>{divTitle}</span>
			<div style={{ height: '1px', backgroundColor: '#d6d6d6' }}></div>
			<div style={{ padding: '10px', textAlign: 'center' }} className='row'>
				{RadioRow}
			</div>
		</div>
	);
};

export default SingleSetting;

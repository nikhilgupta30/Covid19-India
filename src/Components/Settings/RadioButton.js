import React, { useContext } from 'react';
import GlobalContext from '../../GlobalContext';

const constants = require('../../Constants');

const RadioButton = ({ label, name, divWidth, handleChange, radioChecked }) => {
	const theme = useContext(GlobalContext).theme;

	const Input = radioChecked ? (
		<input onChange={handleChange || ''} type='radio' name={name || ''} value={label || ''} checked />
	) : (
		<input onChange={handleChange || ''} type='radio' name={name || ''} value={label || ''} />
	);

	return (
		<div style={{ width: divWidth }} className='radio'>
			<label>
				{Input}
				<span style={{ paddingLeft: '5px', color: theme === constants.LIGHTTHEME ? '#000000' : '#ffffff' }}>{label}</span>
			</label>
		</div>
	);
};

export default RadioButton;

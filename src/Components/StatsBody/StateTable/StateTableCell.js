import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const StateTableCell = ({ value, diffValue, colColor }) => {
	let diff = null;
	if (diffValue > 0) {
		diff = (
			<div style={{ color: colColor }}>
				<FontAwesomeIcon icon={faArrowUp} />
				<span style={{ marginLeft: '5px' }}>{diffValue}</span>
			</div>
		);
	} else {
		diff = (
			<div>
				<br />
			</div>
		);
	}

	return (
		<td>
			<div>
				{diff}
				<div>{value}</div>
			</div>
		</td>
	);
};

export default StateTableCell;

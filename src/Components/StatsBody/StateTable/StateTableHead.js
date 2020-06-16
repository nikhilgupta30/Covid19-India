import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountDown, faSortAmountDownAlt } from '@fortawesome/free-solid-svg-icons';
const constants = require('../../../Constants');

const StateTableHead = ({ titleHeader, sortColumn, sortType, headerClick }) => {
	let icon = null;
	if (sortColumn) {
		if (titleHeader.toLowerCase() === sortColumn.toLowerCase()) {
			if (sortType === constants.ASC) {
				icon = <FontAwesomeIcon icon={faSortAmountDownAlt} />;
			} else {
				icon = <FontAwesomeIcon icon={faSortAmountDown} />;
			}
		}
	}

	return (
		<th
			style={{ cursor: 'pointer' }}
			onClick={() => {
				headerClick(titleHeader);
			}}>
			<div className='btn-group' role='group'>
				<span style={{ marginRight: '10px' }}>{titleHeader}</span>
				<div>
					<div className='btn-group-vertical'>{icon}</div>
				</div>
			</div>
		</th>
	);
};

export default StateTableHead;

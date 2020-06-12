import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const TotalStatsCard = ({ title, value, diffValue, color }) => {
	let diff = null;
	if (diffValue > 0) {
		diff = (
			<div style={{ color: color, paddingTop: '10px' }}>
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
		<div style={{ width: '25%', color: color, padding: '10px' }}>
			<span style={{ fontWeight: 'bold', fontSize: '15px' }}>{title}</span>
			{diff}
			<span style={{ fontSize: '20px' }}>{value}</span>
		</div>
	);
};

export default TotalStatsCard;

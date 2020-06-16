import React, { useContext } from 'react';
import TotalStatsCard from './TotalStatsCard';
import GlobalContext from '../../../GlobalContext';

const constants = require('../../../Constants');

const TotalStats = ({ totalData }) => {
	const theme = useContext(GlobalContext).theme;

	return (
		<div style={{ textAlign: 'center', margin: 'auto', backgroundColor: theme === constants.LIGHTTHEME ? '#FFFFFF' : '#343a40' }} className='row'>
			<TotalStatsCard title='Confirmed' value={totalData.confirmed} diffValue={totalData.diffConfirmed} color={constants.CONFIRMEDCOLOR} />
			<TotalStatsCard title='Active' value={totalData.active} diffValue={totalData.diffActive} color={constants.ACTIVECOLOR} />
			<TotalStatsCard title='Recovered' value={totalData.recovered} diffValue={totalData.diffRecovered} color={constants.RECOVEREDCOLOR} />
			<TotalStatsCard title='Deaths' value={totalData.deaths} diffValue={totalData.diffDeaths} color={constants.DEATHSCOLOR} />
		</div>
	);
};

export default TotalStats;

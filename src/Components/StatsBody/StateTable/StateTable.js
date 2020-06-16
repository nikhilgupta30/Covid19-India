import React, { useContext } from 'react';
import StateTableHead from './StateTableHead';
import StateTableCell from './StateTableCell';
import GlobalContext from '../../../GlobalContext';

const constants = require('../../../Constants');

const StateTable = ({ data, headTitles, sortColumn, sortType, headerClick }) => {
	let TableBody;
	if (data.length > 0) {
		TableBody = data.map((currState) => {
			if (currState.statecode !== 'TT') {
				return (
					<tr>
						<td style={{ verticalAlign: 'middle' }}>
							<div>{currState.state}</div>
						</td>
						<StateTableCell value={currState.confirmed} diffValue={currState.diffConfirmed} colColor={constants.CONFIRMEDCOLOR} />
						<StateTableCell value={currState.active} diffValue={currState.diffActive} colColor={constants.ACTIVECOLOR} />
						<StateTableCell value={currState.recovered} diffValue={currState.diffRecovered} colColor={constants.RECOVEREDCOLOR} />
						<StateTableCell value={currState.deaths} diffValue={currState.diffDeaths} colColor={constants.DEATHSCOLOR} />
					</tr>
				);
			}
		});
	} else {
		TableBody = null;
	}

	const TableHeader = headTitles.map((title) => {
		return <StateTableHead titleHeader={title} sortColumn={sortColumn} sortType={sortType} headerClick={headerClick} />;
	});

	const theme = useContext(GlobalContext).theme;

	return (
		<div
			style={{
				paddingLeft: '30px',
				paddingRight: '30px',
				paddingBottom: '20px',
				backgroundColor: theme === constants.LIGHTTHEME ? '#FFFFFF' : '#343a40',
			}}>
			<table className={theme === constants.LIGHTTHEME ? 'table table-striped' : 'table table-striped table-dark'}>
				<thead>
					<tr>{TableHeader}</tr>
				</thead>
				<tbody>{TableBody}</tbody>
			</table>
		</div>
	);
};

export default StateTable;

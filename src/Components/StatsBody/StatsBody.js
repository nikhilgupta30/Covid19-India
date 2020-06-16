import React, { Component } from 'react';
import StateTable from './StateTable/StateTable';
import TotalStats from './TotalStats/TotalStats';
import GlobalContext from '../../GlobalContext';

const constants = require('../../Constants');

class StatsBody extends Component {
	static contextType = GlobalContext;

	constructor(props) {
		super(props);
		this.state = {
			data: '',
			totalData: '',
			sortColumn: constants.CONFIRMED,
			sortType: constants.DESC,
			headTitles: ['State', 'Confirmed', 'Active', 'Recovered', 'Deaths'],
		};
		this.headerClick = this.headerClick.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const settings = this.context.settings;

		let data = nextProps.data;
		if (data) {
			data.forEach((state) => {
				let prevConfirmed = 0;
				let prevRecovered = 0;
				let prevDeaths = 0;
				for (let i = 0; i < nextProps.dailyData.length; i = i + 3) {
					prevConfirmed += parseInt(nextProps.dailyData[i][state.statecode.toLowerCase()]);
					prevRecovered += parseInt(nextProps.dailyData[i + 1][state.statecode.toLowerCase()]);
					prevDeaths += parseInt(nextProps.dailyData[i + 2][state.statecode.toLowerCase()]);
				}
				let prevActive = prevConfirmed - prevRecovered - prevDeaths;
				state['diffConfirmed'] = Math.max(0, parseInt(state['confirmed']) - prevConfirmed);
				state['diffActive'] = Math.max(0, parseInt(state['active']) - prevActive);
				state['diffRecovered'] = Math.max(0, parseInt(state['recovered']) - prevRecovered);
				state['diffDeaths'] = Math.max(0, parseInt(state['deaths']) - prevDeaths);
				if (state.statecode.toLowerCase() === constants.TOTALCODE) {
					this.setState({ totalData: state });
				}
			});
		}

		if (data) {
			const colToSort = settings.DefaultColumnToSort.toLowerCase();
			for (let i = 0; i < data.length - 1; i++) {
				for (let j = i + 1; j < data.length; j++) {
					if (colToSort === constants.STATE) {
						if (data[i][colToSort].localeCompare(data[j][colToSort]) === -1) {
							const temp = data[i];
							data[i] = data[j];
							data[j] = temp;
						}
					} else if (parseInt(data[i][colToSort]) < parseInt(data[j][colToSort])) {
						const temp = data[i];
						data[i] = data[j];
						data[j] = temp;
					}
				}
			}
			if (settings.DefaultSortType === constants.ASC) {
				data.reverse();
			}

			this.setState({ data: data, sortColumn: settings.DefaultColumnToSort, sortType: settings.DefaultSortType });
		}
	}

	componentDidMount() {
		const settings = this.context.settings;

		let data = this.props.data;
		let dailyData = this.props.dailyData;
		if (data) {
			data.forEach((state) => {
				let prevConfirmed = 0;
				let prevRecovered = 0;
				let prevDeaths = 0;
				for (let i = 0; i < dailyData.length; i = i + 3) {
					prevConfirmed += parseInt(dailyData[i][state.statecode.toLowerCase()]);
					prevRecovered += parseInt(dailyData[i + 1][state.statecode.toLowerCase()]);
					prevDeaths += parseInt(dailyData[i + 2][state.statecode.toLowerCase()]);
				}
				let prevActive = prevConfirmed - prevRecovered - prevDeaths;
				state['diffConfirmed'] = Math.max(0, parseInt(state['confirmed']) - prevConfirmed);
				state['diffActive'] = Math.max(0, parseInt(state['active']) - prevActive);
				state['diffRecovered'] = Math.max(0, parseInt(state['recovered']) - prevRecovered);
				state['diffDeaths'] = Math.max(0, parseInt(state['deaths']) - prevDeaths);
				if (state.statecode.toLowerCase() === constants.TOTALCODE) {
					this.setState({ totalData: state });
				}
			});
		}

		if (data) {
			const colToSort = settings.DefaultColumnToSort.toLowerCase();
			for (let i = 0; i < data.length - 1; i++) {
				for (let j = i + 1; j < data.length; j++) {
					if (colToSort === constants.STATE) {
						if (data[i][colToSort].localeCompare(data[j][colToSort]) === -1) {
							const temp = data[i];
							data[i] = data[j];
							data[j] = temp;
						}
					} else if (parseInt(data[i][colToSort]) < parseInt(data[j][colToSort])) {
						const temp = data[i];
						data[i] = data[j];
						data[j] = temp;
					}
				}
			}
			if (settings.DefaultSortType === constants.ASC) {
				data.reverse();
			}

			this.setState({ data: data, sortColumn: settings.DefaultColumnToSort, sortType: settings.DefaultSortType });
		}
	}

	headerClick(headerName) {
		if (headerName.toLowerCase() === this.state.sortColumn.toLowerCase()) {
			let table = this.state.data;
			table.reverse();
			if (this.state.sortType === constants.ASC) {
				this.setState({ sortType: constants.DESC, data: table });
			} else {
				this.setState({ sortType: constants.ASC, data: table });
			}
		} else {
			const colToSort = headerName.toLowerCase();
			let table = this.state.data;
			for (let i = 0; i < table.length - 1; i++) {
				for (let j = i + 1; j < table.length; j++) {
					if (colToSort === constants.STATE) {
						if (table[i][colToSort].localeCompare(table[j][colToSort]) === -1) {
							const temp = table[i];
							table[i] = table[j];
							table[j] = temp;
						}
					} else if (parseInt(table[i][colToSort]) < parseInt(table[j][colToSort])) {
						const temp = table[i];
						table[i] = table[j];
						table[j] = temp;
					}
				}
			}
			this.setState({ sortColumn: headerName, sortType: constants.DESC, data: table });
		}
	}

	render() {
		return (
			<div style={{ paddingBottom: '10px' }}>
				<TotalStats totalData={this.state.totalData} />
				<StateTable
					data={this.state.data}
					headTitles={this.state.headTitles}
					sortColumn={this.state.sortColumn}
					sortType={this.state.sortType}
					headerClick={this.headerClick}
				/>
			</div>
		);
	}
}

export default StatsBody;

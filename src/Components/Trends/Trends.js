import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import GlobalContext from '../../GlobalContext';
import StateList from '../../stateList.json';

const constants = require('../../Constants');

class Trends extends Component {
	static contextType = GlobalContext;

	constructor(props) {
		super(props);
		this.state = {
			data: '',
			dailyData: '',
			stateCode: 'TT',
			noOfDays: 14,
			selectStateTitle: 'All States',
		};
		this.getLineData = this.getLineData.bind(this);
		this.getDonutData = this.getDonutData.bind(this);
		this.parseTime = this.parseTime.bind(this);
		this.decodeMonth = this.decodeMonth.bind(this);
	}

	componentDidMount() {
		const settings = this.context.settings;
		const defaultState = settings.DefaultState;
		const defaultGraphDuration = settings.DefaultGraphDuration;

		let noOfDays = 14;
		if (defaultGraphDuration === constants.SETTINGS.GRAPHSETTING.graphDuration[0]) {
			noOfDays = 14;
		} else if (defaultGraphDuration === constants.SETTINGS.GRAPHSETTING.graphDuration[1]) {
			noOfDays = 30;
		} else {
			noOfDays = Number.MAX_VALUE;
		}

		const selectStateTitle = defaultState;
		let stateCode = 'TT';
		StateList.stateList.forEach((State) => {
			if (State.state === selectStateTitle) {
				stateCode = State.stateCode;
			}
		});

		this.setState({
			data: this.props.data,
			dailyData: this.props.dailyData,
			noOfDays: noOfDays,
			selectStateTitle: selectStateTitle,
			stateCode: stateCode,
		});
	}

	componentWillReceiveProps(nextProps) {
		const settings = this.context.settings;
		const defaultState = settings.DefaultState;
		const defaultGraphDuration = settings.DefaultGraphDuration;

		let noOfDays = 14;
		if (defaultGraphDuration === constants.SETTINGS.GRAPHSETTING.graphDuration[0]) {
			noOfDays = 14;
		} else if (defaultGraphDuration === constants.SETTINGS.GRAPHSETTING.graphDuration[1]) {
			noOfDays = 30;
		} else {
			noOfDays = Number.MAX_VALUE;
		}

		const selectStateTitle = defaultState;
		let stateCode = 'TT';
		StateList.stateList.forEach((State) => {
			if (State.state === selectStateTitle) {
				stateCode = State.stateCode;
			}
		});

		this.setState({
			data: nextProps.data,
			dailyData: nextProps.dailyData,
			noOfDays: noOfDays,
			selectStateTitle: selectStateTitle,
			stateCode: stateCode,
		});
	}

	getLineData() {
		const stateCodeLocal = this.state.stateCode.toLowerCase();

		let lineData = {
			xAxisLabels: [],
			confirmedLine: [],
			recoveredLine: [],
			deathsLine: [],
		};

		if (this.state.dailyData) {
			let daysCount = 0;
			let day = this.state.dailyData.length - 3;
			if (this.state.noOfDays === Number.MAX_VALUE) {
				while (day >= 0) {
					lineData.xAxisLabels[daysCount] = this.parseTime(this.state.dailyData[day].date);
					lineData.confirmedLine[daysCount] = parseInt(this.state.dailyData[day][stateCodeLocal]);
					lineData.recoveredLine[daysCount] = parseInt(this.state.dailyData[day + 1][stateCodeLocal]);
					lineData.deathsLine[daysCount] = parseInt(this.state.dailyData[day + 2][stateCodeLocal]);

					daysCount++;
					day -= 3;
				}
			} else {
				while (daysCount < this.state.noOfDays && day >= 0) {
					lineData.xAxisLabels[daysCount] = this.parseTime(this.state.dailyData[day].date);
					lineData.confirmedLine[daysCount] = parseInt(this.state.dailyData[day][stateCodeLocal]);
					lineData.recoveredLine[daysCount] = parseInt(this.state.dailyData[day + 1][stateCodeLocal]);
					lineData.deathsLine[daysCount] = parseInt(this.state.dailyData[day + 2][stateCodeLocal]);

					daysCount++;
					day -= 3;
				}
			}

			lineData.xAxisLabels.reverse();
			lineData.confirmedLine.reverse();
			lineData.recoveredLine.reverse();
			lineData.deathsLine.reverse();
		}

		return lineData;
	}

	getDonutData() {
		let donutData = [];

		// let temp = '';

		if (this.state.data) {
			this.state.data.forEach((State) => {
				// temp = temp + '{\n  "state": "' + State.state + '",\n  "stateCode": "' + State.statecode + '"\n},\n';
				if (State.statecode === this.state.stateCode) {
					donutData[0] = parseInt(State.active);
					donutData[1] = parseInt(State.recovered);
					donutData[2] = parseInt(State.deaths);
				}
			});
		}

		// console.log(temp);

		return donutData;
	}

	parseTime(date) {
		if (date) {
			return new Date(2000 + parseInt(date.substr(7, 2)), parseInt(this.decodeMonth(date.substr(3, 3))), parseInt(date.substr(0, 2))).getTime();
		}
	}

	decodeMonth(month) {
		switch (month) {
			case 'Jan':
				return 0;
			case 'Feb':
				return 1;
			case 'Mar':
				return 2;
			case 'Apr':
				return 3;
			case 'May':
				return 4;
			case 'Jun':
				return 5;
			case 'Jul':
				return 6;
			case 'Aug':
				return 7;
			case 'Sep':
				return 8;
			case 'Oct':
				return 9;
			case 'Nov':
				return 10;
			case 'Dec':
				return 11;
			default:
				return -1;
		}
	}

	render() {
		// const theme = useContext(ThemeContext);

		const lineData = this.getLineData();
		const donutData = this.getDonutData();

		// line chart options and values
		const lineChart = {
			options: {
				chart: {
					id: 'basic-line',
					toolbar: {
						show: false,
					},
					zoom: {
						enabled: false,
					},
				},
				stroke: {
					width: 2,
				},
				xaxis: {
					type: 'datetime',
					categories: lineData.xAxisLabels,
					labels: {
						show: true,
						rotate: 0,
						style: {
							colors: this.context.theme === constants.LIGHTTHEME ? '#000000' : '#FFFFFF',
						},
					},
					datetimeFormatter: {
						year: 'yyyy',
						month: "MMM 'yy",
						day: 'dd MMM',
						hour: 'HH:mm',
					},
					tickAmount: 7,
				},
				yaxis: {
					show: false,
				},
				grid: {
					show: false,
				},
				colors: ['#FF4560', '#00e396', '#feb019'],
				markers: {
					size: 4,
					strokeColors: this.context.theme === constants.LIGHTTHEME ? '#FFFFFF' : '#2C3E50',
				},
				title: {
					text: this.state.selectStateTitle,
					align: 'left',
					margin: 10,
					offsetX: 0,
					offsetY: 0,
					floating: false,
					style: {
						fontSize: '18px',
						fontWeight: 'bold',
						fontFamily: undefined,
						color: this.context.theme === constants.LIGHTTHEME ? '#000000' : '#FFFFFF',
					},
				},
				legend: {
					show: true,
					position: 'top',
					labels: {
						colors: this.context.theme === constants.LIGHTTHEME ? '#000000' : '#FFFFFF',
					},
				},
				tooltip: {
					enabled: true,
					shared: true,
					followCursor: false,
					theme: this.context.theme === constants.LIGHTTHEME ? 'light' : 'dark',
				},
			},
			series: [
				{
					name: 'Confirmed',
					data: lineData.confirmedLine,
				},
				{
					name: 'Rcovered',
					data: lineData.recoveredLine,
				},
				{
					name: 'Deaths',
					data: lineData.deathsLine,
				},
			],
		};

		// donut chart options and values
		const donutChart = {
			options: {
				labels: ['Active', 'Recovered', 'Deaths'],
				legend: {
					show: true,
					position: 'left',
					labels: {
						colors: this.context.theme === constants.LIGHTTHEME ? '#000000' : '#FFFFFF',
						useSeriesColors: false,
					},
				},
				plotOptions: {
					pie: {
						expandOnClick: false,
						donut: {
							size: '60%',
							background: 'transparent',
							labels: {
								show: true,
								name: {
									show: true,
									fontSize: '22px',
									fontWeight: 'bold',
									fontFamily: 'Helvetica, Arial, sans-serif',
									color: this.context.theme === constants.LIGHTTHEME ? '#000000' : '#FFFFFF',
									offsetY: -10,
								},
								value: {
									show: true,
									fontSize: '16px',
									fontWeight: 'bold',
									fontFamily: 'Helvetica, Arial, sans-serif',
									color: this.context.theme === constants.LIGHTTHEME ? '#000000' : '#FFFFFF',
									offsetY: 5,
									formatter: function (val) {
										return val;
									},
								},
								total: {
									show: true,
									showAlways: false,
									label: 'Confirmed',
									fontWeight: 'bold',
									color: '#ff4560',
									formatter: function (w) {
										return w.globals.seriesTotals.reduce((a, b) => {
											return a + b;
										}, 0);
									},
								},
							},
						},
					},
				},
			},
			series: donutData,
		};

		const stateListDropDown = StateList.stateList.map((State) => {
			return (
				<button
					onClick={() => {
						this.setState({ stateCode: State.stateCode, selectStateTitle: State.state });
					}}
					className='dropdown-item'
					href='#'>
					{State.state}
				</button>
			);
		});

		const selectStateDropDown = (
			<div className='dropdown'>
				<button
					style={{ width: '100%' }}
					className='btn btn-secondary dropdown-toggle'
					type='button'
					id='dropdownMenuButton'
					data-toggle='dropdown'
					aria-haspopup='true'
					aria-expanded='false'>
					{this.state.selectStateTitle}
				</button>
				<div
					style={{ width: '100%', textAlign: 'center', maxHeight: '150px', overflow: 'auto' }}
					className='dropdown-menu'
					aria-labelledby='dropdownMenuButton'>
					{stateListDropDown}
				</div>
			</div>
		);

		return (
			<div style={{ paddingBottom: '30px' }}>
				<div style={{ padding: '30px', width: '600px', backgroundColor: this.context.theme === constants.LIGHTTHEME ? '#ffffff' : '#343a40' }}>
					<div style={{ paddingBottom: '20px', paddingLeft: '30px', paddingRight: '30px' }}>{selectStateDropDown}</div>
					<div style={{ marginLeft: '20px' }}>
						<Chart options={lineChart.options} series={lineChart.series} type='line' width='500px' />
						<div style={{ float: 'right' }} className='btn-group btn-group-sm' role='group' aria-label='Basic example'>
							<button
								onClick={() => {
									this.setState({ noOfDays: Number.MAX_VALUE });
								}}
								type='button'
								className={this.state.noOfDays === Number.MAX_VALUE ? 'btn btn-info' : 'btn btn-secondary'}>
								Beginning
							</button>
							<button
								onClick={() => {
									this.setState({ noOfDays: 30 });
								}}
								type='button'
								className={this.state.noOfDays === 30 ? 'btn btn-info' : 'btn btn-secondary'}>
								1 Month
							</button>
							<button
								onClick={() => {
									this.setState({ noOfDays: 14 });
								}}
								type='button'
								className={this.state.noOfDays === 14 ? 'btn btn-info' : 'btn btn-secondary'}>
								2 Weeks
							</button>
						</div>
					</div>
					<div style={{ marginLeft: '40px', marginTop: '50px' }}>
						<Chart options={donutChart.options} series={donutChart.series} type='donut' width='400px' />
					</div>
					<div style={{ width: '600px' }}></div>
				</div>
			</div>
		);
	}
}

export default Trends;

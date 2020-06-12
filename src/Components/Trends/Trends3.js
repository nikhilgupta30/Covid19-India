import React, { useContext } from 'react';
import Chart from 'react-apexcharts';
import ThemeContext from '../../themeContext';
import StateList from '../../stateList.json';

const constants = require('../../Constants');

let stateCode;
let noOfDays;
let lineData;
let donutData;
let selectStateTitle;

const Trends = ({ data, dailyData }) => {
	const theme = useContext(ThemeContext);

	selectStateTitle = 'Select States';
	stateCode = 'TT';
	noOfDays = 14;
	setLineData(dailyData);
	setDonutData(data);

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
						colors: theme === constants.LIGHTTHEME ? '#000000' : '#FFFFFF',
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
				strokeColors: theme === constants.LIGHTTHEME ? '#FFFFFF' : '#2C3E50',
			},
			title: {
				text: 'All States',
				align: 'left',
				margin: 10,
				offsetX: 0,
				offsetY: 0,
				floating: false,
				style: {
					fontSize: '18px',
					fontWeight: 'bold',
					fontFamily: undefined,
					color: theme === constants.LIGHTTHEME ? '#000000' : '#FFFFFF',
				},
			},
			legend: {
				show: true,
				position: 'top',
				labels: {
					colors: theme === constants.LIGHTTHEME ? '#000000' : '#FFFFFF',
				},
			},
			tooltip: {
				enabled: true,
				shared: true,
				followCursor: false,
				theme: theme === constants.LIGHTTHEME ? 'light' : 'dark',
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
					colors: theme === constants.LIGHTTHEME ? '#000000' : '#FFFFFF',
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
								color: theme === constants.LIGHTTHEME ? '#000000' : '#FFFFFF',
								offsetY: -10,
							},
							value: {
								show: true,
								fontSize: '16px',
								fontWeight: 'bold',
								fontFamily: 'Helvetica, Arial, sans-serif',
								color: theme === constants.LIGHTTHEME ? '#000000' : '#FFFFFF',
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
					selectStateTitle = State.state;
					stateCode = State.stateCode;
					setLineData(data);
					setDonutData(dailyData);
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
				{selectStateTitle}
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
			<div style={{ padding: '30px', width: '600px', backgroundColor: theme === constants.LIGHTTHEME ? '#ffffff' : '#343a40' }}>
				<div style={{ paddingBottom: '20px', paddingLeft: '30px', paddingRight: '30px' }}>{selectStateDropDown}</div>
				<div style={{ marginLeft: '20px' }}>
					<Chart options={lineChart.options} series={lineChart.series} type='line' width='500px' />
				</div>
				<div style={{ marginLeft: '40px', marginTop: '50px' }}>
					<Chart options={donutChart.options} series={donutChart.series} type='donut' width='400px' />
				</div>
				<div style={{ width: '600px' }}></div>
			</div>
		</div>
	);
};

const setLineData = (dailyData) => {
	const stateCodeLocal = stateCode.toLowerCase();

	let lineDataLocal = {
		xAxisLabels: [],
		confirmedLine: [],
		recoveredLine: [],
		deathsLine: [],
	};

	if (dailyData) {
		let daysCount = 0;
		let day = dailyData.length - 3;
		while (daysCount < noOfDays && day >= 0) {
			lineDataLocal.xAxisLabels[daysCount] = parseTime(dailyData[day].date);
			lineDataLocal.confirmedLine[daysCount] = parseInt(dailyData[day][stateCodeLocal]);
			lineDataLocal.recoveredLine[daysCount] = parseInt(dailyData[day + 1][stateCodeLocal]);
			lineDataLocal.deathsLine[daysCount] = parseInt(dailyData[day + 2][stateCodeLocal]);

			daysCount++;
			day -= 3;
		}

		lineDataLocal.xAxisLabels.reverse();
		lineDataLocal.confirmedLine.reverse();
		lineDataLocal.recoveredLine.reverse();
		lineDataLocal.deathsLine.reverse();
	}

	lineData = lineDataLocal;
};

const setDonutData = (data) => {
	let donutDataLocal = [];

	// let temp = '';

	if (data) {
		data.forEach((State) => {
			// temp = temp + '{\n  "state": "' + State.state + '",\n  "stateCode": "' + State.statecode + '"\n},\n';
			if (State.statecode === stateCode) {
				donutDataLocal[0] = parseInt(State.active);
				donutDataLocal[1] = parseInt(State.recovered);
				donutDataLocal[2] = parseInt(State.deaths);
			}
		});
	}

	// console.log(temp);

	donutData = donutDataLocal;
};

const parseTime = (date) => {
	if (date) {
		return new Date(2000 + parseInt(date.substr(7, 2)), parseInt(decodeMonth(date.substr(3, 3))), parseInt(date.substr(0, 2))).getTime();
	}
};

const decodeMonth = (month) => {
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
};

export default Trends;

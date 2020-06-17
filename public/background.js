/*global chrome*/

const fetchData = () => {
	fetch('https://api.covid19india.org/data.json')
		.then((response) => response.json())
		.then((data) => {
			const stateData = data.statewise;
			chrome.storage.local.set({ StateData: stateData }, () => {
				console.log('State Data Saved in Local Storage');
			});

			fetch('https://api.covid19india.org/states_daily.json')
				.then((response) => response.json())
				.then((data) => {
					const dailyData = data.states_daily;
					chrome.storage.local.set({ DailyData: dailyData }, () => {
						console.log('Daily Data Saved in Local Storage');
					});

					setBadge(stateData, dailyData);
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
};

const setBadge = (stateData, dailyData) => {
	let confirmed = stateData[0].confirmed;
	let recovered = stateData[0].recovered;
	let deaths = stateData[0].deaths;

	const today = new Date();

	const hoverText =
		'Covid19 India' +
		' - ' +
		getDayString(today.getDay()) +
		', ' +
		today.getDate() +
		' ' +
		getMonthStr(today.getMonth()) +
		'\n- - - - - - - - - - - - - - - - - - -\n' +
		'Confirmed: ' +
		confirmed +
		'\nRecovered: ' +
		recovered +
		'\nDeaths: ' +
		deaths;

	chrome.browserAction.setTitle({
		title: hoverText,
	});

	chrome.storage.local.get(['Settings'], function (response) {
		if (response.Settings !== void 0) {
			const defaultState = response.Settings.DefaultState;
			const dataTypeOnBadge = response.Settings.DataTypeOnBadge;
			const valueToShow = response.Settings.ValueToShow;

			let selectedState = stateData[0];
			stateData.forEach((State) => {
				if (defaultState === State.state) {
					selectedState = State;
				}
			});

			let stateCode = 'TT';
			StateList.stateList.forEach((State) => {
				if (State.state === defaultState) stateCode = State.stateCode;
			});

			let badgeTextValue = 0;
			let totalValue = 0;
			totalValue = parseInt(selectedState[dataTypeOnBadge.toLowerCase()]);

			let badgeColor = BadgeColors[dataTypeOnBadge];

			if (valueToShow === 'Total Value') {
				badgeTextValue = totalValue;
			} else {
				let index = 0;
				if (dataTypeOnBadge === 'Confirmed') index = 0;
				else if (dataTypeOnBadge === 'Recovered') index = 1;
				else index = 2;

				let prevValue = 0;
				for (let i = 0; i < dailyData.length; i = i + 3) {
					prevValue = prevValue + parseInt(dailyData[i + index][stateCode.toLowerCase()]);
				}

				badgeTextValue = totalValue - prevValue;
			}

			chrome.browserAction.setBadgeBackgroundColor({ color: badgeColor });
			chrome.browserAction.setBadgeText({ text: kFormat(badgeTextValue) });
		} else {
			chrome.browserAction.setBadgeText({ text: kFormat(confirmed) });
		}
	});
};

const storeDefaultTheme = () => {
	chrome.storage.local.get(['Theme'], function (response) {
		if (response.Theme === void 0) {
			chrome.storage.local.set({ Theme: 'light' }, () => {
				console.log('Default theme stored in Local Storage');
			});
		}
	});
};

const storeDefaultSettings = () => {
	chrome.storage.local.get(['Settings'], function (response) {
		if (response.Settings === void 0) {
			const defaultSettings = {
				DefaultState: 'All States',
				DataTypeOnBadge: 'Confirmed',
				ValueToShow: 'Total Value',
				DefaultColumnToSort: 'Confirmed',
				DefaultSortType: 'Descending',
				DefaultGraphDuration: 'Two Weeks',
			};
			chrome.storage.local.set({ Settings: defaultSettings }, () => {
				console.log('Default Settings stored in Local Storage');
			});
		}
	});
};

// Main Start

// Creating Alarm
chrome.alarms.create('FetchData', {
	delayInMinutes: 5,
	periodInMinutes: 5,
});

// Setting default color of text over icon
chrome.browserAction.setBadgeBackgroundColor({ color: '#e40021' });

storeDefaultTheme();
storeDefaultSettings();
fetchData();
// Fetch Data Every 5 Min on alarm
chrome.alarms.onAlarm.addListener(function (alarm) {
	if (alarm.name === 'FetchData') {
		fetchData();
	}
});

// Change Badge When Badge Settings Change same time
chrome.storage.onChanged.addListener((changes, namespace) => {
	for (let key in changes) {
		if (key === 'Settings') {
			const storageChange = changes[key];
			const oldValue = storageChange.oldValue;
			const newValue = storageChange.newValue;
			if (oldValue) {
				if (
					oldValue.DefaultState !== newValue.DefaultState ||
					oldValue.DataTypeOnBadge !== newValue.DataTypeOnBadge ||
					oldValue.ValueToShow !== newValue.ValueToShow
				) {
					chrome.storage.local.get(['StateData', 'DailyData'], function (response) {
						const stateData = response.StateData;
						const dailyData = response.DailyData;
						setBadge(stateData, dailyData);
					});
				}
			}
		}
	}
});

// Main End

// Util Functions
const kFormat = (value) => {
	let valStr = '0';

	if (parseInt(value) >= 0) {
		valStr =
			parseInt(value) > 9999
				? (parseInt(value) / 1000 - Math.floor(parseInt(value) / 1000) < 0.5
						? Math.floor(parseInt(value) / 1000)
						: Math.ceil(parseInt(value) / 1000)) + 'k'
				: value.toString();
	}

	return valStr;
};

const getDayString = (day) => {
	switch (day) {
		case 0:
			return 'Sunday';
		case 1:
			return 'Monday';
		case 2:
			return 'Tuesday';
		case 3:
			return 'Wednesday';
		case 4:
			return 'Thursday';
		case 5:
			return 'Friday';
		case 6:
			return 'Saturday';
		default:
			return 'DayStr';
	}
};

const getMonthStr = (month) => {
	switch (month) {
		case 0:
			return 'January';
		case 1:
			return 'February';
		case 2:
			return 'March';
		case 3:
			return 'April';
		case 4:
			return 'May';
		case 5:
			return 'June';
		case 6:
			return 'July';
		case 7:
			return 'August';
		case 8:
			return 'September';
		case 9:
			return 'October';
		case 10:
			return 'November';
		case 11:
			return 'December';
		default:
			return 'MonthStr';
	}
};

// Constants
const BadgeColors = {
	Confirmed: '#e40021',
	Recovered: '#0eb97f',
	Deaths: '#ffa800',
};

const StateList = {
	stateList: [
		{
			state: 'All States',
			stateCode: 'TT',
		},
		{
			state: 'Andaman and Nicobar Islands',
			stateCode: 'AN',
		},
		{
			state: 'Andhra Pradesh',
			stateCode: 'AP',
		},
		{
			state: 'Arunachal Pradesh',
			stateCode: 'AR',
		},
		{
			state: 'Assam',
			stateCode: 'AS',
		},
		{
			state: 'Bihar',
			stateCode: 'BR',
		},
		{
			state: 'Chandigarh',
			stateCode: 'CH',
		},
		{
			state: 'Chhattisgarh',
			stateCode: 'CT',
		},
		{
			state: 'Dadra and Nagar Haveli and Daman and Diu',
			stateCode: 'DN',
		},
		{
			state: 'Delhi',
			stateCode: 'DL',
		},
		{
			state: 'Goa',
			stateCode: 'GA',
		},
		{
			state: 'Gujarat',
			stateCode: 'GJ',
		},
		{
			state: 'Haryana',
			stateCode: 'HR',
		},
		{
			state: 'Himachal Pradesh',
			stateCode: 'HP',
		},
		{
			state: 'Jammu and Kashmir',
			stateCode: 'JK',
		},
		{
			state: 'Jharkhand',
			stateCode: 'JH',
		},
		{
			state: 'Karnataka',
			stateCode: 'KA',
		},
		{
			state: 'Kerala',
			stateCode: 'KL',
		},
		{
			state: 'Ladakh',
			stateCode: 'LA',
		},
		{
			state: 'Lakshadweep',
			stateCode: 'LD',
		},
		{
			state: 'Madhya Pradesh',
			stateCode: 'MP',
		},
		{
			state: 'Maharashtra',
			stateCode: 'MH',
		},
		{
			state: 'Manipur',
			stateCode: 'MN',
		},
		{
			state: 'Meghalaya',
			stateCode: 'ML',
		},
		{
			state: 'Mizoram',
			stateCode: 'MZ',
		},
		{
			state: 'Nagaland',
			stateCode: 'NL',
		},
		{
			state: 'Odisha',
			stateCode: 'OR',
		},
		{
			state: 'Puducherry',
			stateCode: 'PY',
		},
		{
			state: 'Punjab',
			stateCode: 'PB',
		},
		{
			state: 'Rajasthan',
			stateCode: 'RJ',
		},
		{
			state: 'Sikkim',
			stateCode: 'SK',
		},
		{
			state: 'State Unassigned',
			stateCode: 'UN',
		},
		{
			state: 'Tamil Nadu',
			stateCode: 'TN',
		},
		{
			state: 'Telangana',
			stateCode: 'TG',
		},
		{
			state: 'Tripura',
			stateCode: 'TR',
		},
		{
			state: 'Uttar Pradesh',
			stateCode: 'UP',
		},
		{
			state: 'Uttarakhand',
			stateCode: 'UT',
		},
		{
			state: 'West Bengal',
			stateCode: 'WB',
		},
	],
};

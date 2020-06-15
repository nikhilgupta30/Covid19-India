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

					setBadge(stateData[0]);
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
};

const setBadge = (data) => {
	let confirmed = data.confirmed;
	let recovered = data.recovered;
	let deaths = data.deaths;

	const today = new Date();

	const hoverText =
		'Covid19 India' +
		' - ' +
		getDayString(today.getDay()) +
		' ' +
		today.getDate() +
		', ' +
		getMonthStr(today.getMonth()) +
		'\n- - - - - - - - - - - - - - - - - - -\n' +
		'Confirmed: ' +
		confirmed +
		'\nRecovered: ' +
		recovered +
		'\nDeaths: ' +
		deaths;

	chrome.browserAction.setBadgeText({ text: kFormat(confirmed) });
	chrome.browserAction.setTitle({
		title: hoverText,
	});
};

const kFormat = (value) => {
	let valStr = '0';

	if (parseInt(value) >= 0) {
		valStr =
			parseInt(value) > 999
				? (parseInt(value) / 1000 - Math.floor(parseInt(value) / 1000) < 0.5
						? Math.floor(parseInt(value) / 1000)
						: Math.ceil(parseInt(value) / 1000)) + 'k'
				: value;
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

const storeDefaultTheme = () => {
	chrome.storage.local.get(['Theme'], function (response) {
		console.log(response.Theme);
		if (response.Theme === void 0) {
			chrome.storage.local.set({ Theme: 'light' }, () => {
				console.log('Default theme stored in Local Storage');
			});
		}
	});
};

const storeDefaultSettings = () => {
	chrome.storage.local.get(['Settings'], function (response) {
		console.log(response.Settings);
		if (response.Settings === void 0) {
			const defaultSettings = {
				DataTypeOnBadge: 'Confirmed',
				ValueToShow: 'Total Value',
				DefaultColumnToSort: 'Confirmed',
				DefaultSortType: 'Descending',
				DefaultGraphDuration: 'Two Weeks',
			};
			chrome.storage.local.set({ Theme: defaultSettings }, () => {
				console.log('Default Settings stored in Local Storage');
			});
		}
	});
};

// Creating Alarm
chrome.alarms.create('FetchData', {
	delayInMinutes: 5,
	periodInMinutes: 5,
});

// Setting color of text over icon
chrome.browserAction.setBadgeBackgroundColor({ color: '#e40021' });

fetchData();
storeDefaultTheme();
storeDefaultSettings();
chrome.alarms.onAlarm.addListener(function (alarm) {
	if (alarm.name === 'FetchData') {
		fetchData();
	}
});

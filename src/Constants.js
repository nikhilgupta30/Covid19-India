module.exports = Object.freeze({
	COMPANYNAME: 'softwareLite',
	VERSION: '0.1.0',
	AUTHOR: 'Nikhil Gupta',

	STATE: 'State',
	CONFIRMED: 'Confirmed',
	ACTIVE: 'Active',
	RECOVERED: 'Recovered',
	DEATHS: 'Deaths',

	ASC: 'Ascending',
	DESC: 'Descending',

	CONFIRMEDCOLOR: '#f20738',
	ACTIVECOLOR: '#1987ff',
	RECOVEREDCOLOR: '#28a745',
	DEATHSCOLOR: '#949da6',

	DARKTHEME: 'dark',
	LIGHTTHEME: 'light',

	FOOTERDARK: '#2C3E50',
	FOOTERLIGHT: '#FFFFFF',

	MENUHOME: 'Home',
	MENUTRENDS: 'Trends',
	MENUSETTINGS: 'Settings',
	MENUABOUT: 'About',

	TOTALCODE: 'tt',

	SETTINGS: {
		BADGESETTING: {
			badgeDataType: ['Confirmed', 'Active', 'Recovered', 'Deaths'],
			badgeValueType: ['Total Value', 'Increased Value'],
		},
		TABLESETTING: {
			tableColumns: ['Confirmed', 'Active', 'Recovered', 'Deaths'],
			tableSortType: ['Ascending', 'Descending'],
		},
		GRAPHSETTING: {
			graphDuration: ['Two Weeks', 'One Month', 'Beginning'],
		},
	},
});

/*global chrome*/

import React, { Component } from 'react';
import './App.css';
import StatsBody from './Components/StatsBody/StatsBody';
import Trends from './Components/Trends/Trends';
import Settings from './Components/Settings/Settings';
import About from './Components/About/About';
import Footer from './Components/Footer/Footer';
import { ThemeProvider } from './themeContext';

const constants = require('./Constants');

class App extends Component {
	constructor() {
		super();
		this.state = {
			data: '',
			dailyData: '',
			mainBarType: constants.MENUSETTINGS,
			settings: {},
			theme: '',
		};
		// this.fetchData = this.fetchData.bind(this);
		this.changeColorTheme = this.changeColorTheme.bind(this);
		this.onMenuClick = this.onMenuClick.bind(this);
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		// from storage
		// const self = this;
		// chrome.storage.local.get(['StateData', 'DailyData', 'Settings','Theme'], function (response) {
		// 	// console.log(response.Theme);
		// 	// console.log(response.StateData);
		// 	// console.log(response.DailyData);
		// 	const data = response.StateData;
		// 	const dailyData = response.DailyData;
		// 	const theme = response.Theme;
		// const settings = response.Settings;

		// self.setState({ data: data, dailyData: dailyData, settings: settings, theme: theme });
		// });

		// direct hit api
		fetch('https://api.covid19india.org/data.json')
			.then((response) => response.json())
			.then((data) => {
				const stateData = data.statewise;
				this.setState({ data: stateData });
			})
			.catch((err) => {
				console.log(err);
			});

		fetch('https://api.covid19india.org/states_daily.json')
			.then((response) => response.json())
			.then((data) => {
				const dailyData = data.states_daily;
				this.setState({ dailyData: dailyData });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	saveSettings(newSettings) {
		console.log(newSettings);
		console.log('settings saved');
		// this.setState({ settings: newSettings });
		// chrome.storage.local.set({ Settings: newSettings }, () => {
		// 	console.log('Settings Updated');
		// });
	}

	changeColorTheme() {
		if (this.state.theme === constants.LIGHTTHEME) {
			this.setState({ theme: constants.DARKTHEME });
			// chrome.storage.local.set({ Theme: constants.DARKTHEME }, () => {
			// 	// console.log('Dark Theme stored in Local Storage');
			// });
		} else {
			this.setState({ theme: constants.LIGHTTHEME });
			// chrome.storage.local.set({ Theme: constants.LIGHTTHEME }, () => {
			// 	// console.log('Light Theme stored in Local Storage');
			// });
		}
	}

	onMenuClick(mainBarOption) {
		this.setState({ mainBarType: mainBarOption });
	}

	render() {
		let Mainbar;
		switch (this.state.mainBarType) {
			case constants.MENUTRENDS:
				Mainbar = <Trends data={this.state.data} dailyData={this.state.dailyData} />;
				break;
			case constants.MENUSETTINGS:
				Mainbar = <Settings currSettings={this.state.settings} saveSettings={this.saveSettings} />;
				break;
			case constants.MENUABOUT:
				Mainbar = <About />;
				break;
			default:
				Mainbar = <StatsBody data={this.state.data} dailyData={this.state.dailyData} />;
		}

		return (
			<div>
				<ThemeProvider value={this.state.theme}>
					{Mainbar}
					<Footer changeColorTheme={this.changeColorTheme} onMenuClick={this.onMenuClick} />
				</ThemeProvider>
			</div>
		);
	}
}

export default App;

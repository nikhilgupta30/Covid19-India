/*global chrome*/
import React, { Component } from 'react';
import StateList from '../../stateList.json';
import SingleSetting from './SingleSetting';
import ThemeContext from '../../themeContext';

const constants = require('../../Constants');

class Settings extends Component {
	static contextType = ThemeContext;

	constructor(props) {
		super(props);

		this.state = {
			settings: {
				DataTypeOnBadge: 'Confirmed',
				ValueToShow: 'Total Value',
				DefaultColumnToSort: 'Confirmed',
				DefaultSortType: 'Descending',
				DefaultGraphDuration: 'Two Weeks',
			},
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		// this.setState({ settings: nextProps.currSettings });
	}

	componentDidMount() {
		// this.setState({ settings: this.props.currSettings });
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.saveSettings(this.state.settings);
	}

	handleChange(event) {
		let settings = { ...this.state.settings };
		settings[event.target.name] = event.target.value;
		this.setState({ settings: settings });
	}

	render() {
		console.log(this.state.settings);
		const textColor = this.context === constants.LIGHTTHEME ? '#000000' : '#ffffff';

		const BadgeSettings = (
			<div>
				<p style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center', color: textColor }}>Badge Settings</p>
				<SingleSetting
					divTitle='Data Type On Badge'
					labels={constants.SETTINGS.BADGESETTING.badgeDataType}
					radioButtonWidth='25%'
					handleChange={this.handleChange}
					selectedRadio={this.state.settings.DataTypeOnBadge}
				/>
				<SingleSetting
					divTitle='Value To Show'
					labels={constants.SETTINGS.BADGESETTING.badgeValueType}
					radioButtonWidth='50%'
					handleChange={this.handleChange}
					selectedRadio={this.state.settings.ValueToShow}
				/>
			</div>
		);

		const TableSettings = (
			<div>
				<p style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center', color: textColor }}>Table Settings</p>
				<SingleSetting
					divTitle='Default Column To Sort'
					labels={constants.SETTINGS.TABLESETTING.tableColumns}
					radioButtonWidth='25%'
					handleChange={this.handleChange}
					selectedRadio={this.state.settings.DefaultColumnToSort}
				/>
				<SingleSetting
					divTitle='Default Sort Type'
					labels={constants.SETTINGS.TABLESETTING.tableSortType}
					radioButtonWidth='50%'
					handleChange={this.handleChange}
					selectedRadio={this.state.settings.DefaultSortType}
				/>
			</div>
		);

		const GraphSettings = (
			<div>
				<p style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center', color: textColor }}>Graph Settings</p>
				<SingleSetting
					divTitle='Default Graph Duration'
					labels={constants.SETTINGS.GRAPHSETTING.graphDuration}
					radioButtonWidth='33%'
					handleChange={this.handleChange}
					selectedRadio={this.state.settings.DefaultGraphDuration}
				/>
			</div>
		);

		const stateListDropDown = StateList.stateList.map((State) => {
			return (
				<button
					key={State.state}
					onClick={() => {
						// this.setState({ stateCode: State.stateCode, selectStateTitle: State.state });
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
					style={{ width: '75%', borderRadius: '0px' }}
					className='btn btn-secondary dropdown-toggle'
					type='button'
					id='dropdownMenuButton'
					data-toggle='dropdown'
					aria-haspopup='true'
					aria-expanded='false'>
					{/* {this.state.selectStateTitle} */}
					Select State
				</button>
				<div
					style={{ width: '75%', textAlign: 'center', maxHeight: '150px', overflow: 'auto' }}
					className='dropdown-menu'
					aria-labelledby='dropdownMenuButton'>
					{stateListDropDown}
				</div>
			</div>
		);

		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div
						style={{
							width: '600px',
							padding: '30px',
							textAlign: 'center',
							backgroundColor: this.context === constants.LIGHTTHEME ? '#ffffff' : '#343a40',
						}}>
						<p style={{ fontSize: '24px', fontWeight: 'bold', color: textColor }}>Settings</p>
						<div style={{ paddingBottom: '20px' }}>{selectStateDropDown}</div>
						{BadgeSettings}
						{TableSettings}
						{GraphSettings}
						<button style={{ width: '300px', borderRadius: '10px', margin: '15px' }} type='button' className='btn btn-success'>
							Save Changes
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default Settings;

/*global chrome*/

import React from 'react';
import StateList from '../../stateList.json';

const Settings = ({ currSettings, saveSettings }) => {
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
				style={{ width: '75%', borderRadius: '5px', border: '1px solid black' }}
				className='btn dropdown-toggle'
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
		<div style={{ width: '600px', textAlign: 'center', padding: '30px' }}>
			{/* Badge Settings */}
			<div>
				<div>
					State : On badge and default state for Trends
					{/* State */}
					{selectStateDropDown}
				</div>

				<div style={{ backgroundColor: 'cyan' }}>
					Badge Settings
					<div>
						{/* Badge Category */}
						Data Type on Badge
						<div className='row'>
							<div style={{ width: '25%' }} className='radio disabled'>
								<label>
									<input type='radio' name='optradio' />
									Confirmed
								</label>
							</div>
							<div style={{ width: '25%' }} className='radio'>
								<label>
									<input type='radio' name='optradio' />
									Active
								</label>
							</div>
							<div style={{ width: '25%' }} className='radio disabled'>
								<label>
									<input type='radio' name='optradio' />
									Recovered
								</label>
							</div>
							<div style={{ width: '25%' }} className='radio disabled'>
								<label>
									<input type='radio' name='optradio' />
									Deaths
								</label>
							</div>
						</div>
						{/* Badge Type */}
						<div>
							Value to Show
							<div className='row'>
								<div style={{ width: '50%' }} className='radio'>
									<label>
										<input type='radio' name='optradio' />
										Total Value
									</label>
								</div>
								<div style={{ width: '50%' }} className='radio'>
									<label>
										<input type='radio' name='optradio' />
										Increased Value
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div style={{ backgroundColor: 'green' }}>
				State Table Settings
				<div>
					{/* Badge Category */}
					Default Column to Sort
					<div className='row'>
						<div style={{ width: '25%' }} className='radio disabled'>
							<label>
								<input type='radio' name='optradio' />
								Confirmed
							</label>
						</div>
						<div style={{ width: '25%' }} className='radio'>
							<label>
								<input type='radio' name='optradio' />
								Active
							</label>
						</div>
						<div style={{ width: '25%' }} className='radio disabled'>
							<label>
								<input type='radio' name='optradio' />
								Recovered
							</label>
						</div>
						<div style={{ width: '25%' }} className='radio disabled'>
							<label>
								<input type='radio' name='optradio' />
								Deaths
							</label>
						</div>
					</div>
					{/* Badge Type */}
					<div>
						Default Sort Type
						<div className='row'>
							<div style={{ width: '50%' }} className='radio'>
								<label>
									<input type='radio' name='optradio' />
									Ascending
								</label>
							</div>
							<div style={{ width: '50%' }} className='radio'>
								<label>
									<input type='radio' name='optradio' />
									Descending
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div style={{ backgroundColor: 'yellow' }}>
				Graph Settings
				<div>
					{/* Badge Category */}
					Default Duration
					<div className='row'>
						<div style={{ width: '33%' }} className='radio disabled'>
							<label>
								<input type='radio' name='optradio' />2 weeks
							</label>
						</div>
						<div style={{ width: '34%' }} className='radio'>
							<label>
								<input type='radio' name='optradio' />1 month
							</label>
						</div>
						<div style={{ width: '33%' }} className='radio disabled'>
							<label>
								<input type='radio' name='optradio' />
								Beginning
							</label>
						</div>
					</div>
				</div>
			</div>

			{/* Submit Button */}
			<button
				onClick={() => {
					saveSettings({});
				}}
				style={{ width: '300px', borderRadius: '10px' }}
				type='button'
				className='btn btn-success'>
				Save Changes
			</button>
		</div>
	);
};

export default Settings;

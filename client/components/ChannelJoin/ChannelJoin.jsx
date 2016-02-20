import React from 'react';
import { Link } from 'react-router';

class ChannelJoin extends React.Component {

	handleSubmit(e) {
		e.preventDefault();
		const key = this.refs.key.value.trim()

        if ( key ) {
            console.log("ChannelJoin handleSubmit -->", key);
            Meteor.call('joinChannel', key);
        }
	}

	render() {

		return(
			<div>
				<p>Join a channel by adding an invite key here</p>
				<p></p>
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<label htmlFor="key">Key: </label>
					<input type="text" id="key" placeholder="Ex: TYKQqCqryPhXMmHAz" ref="key" />
					<input type="submit" value="Join" />
				</form>
			</div>
		);
	}

}

export default ChannelJoin
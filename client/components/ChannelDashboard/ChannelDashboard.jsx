import React from 'react';
import ChannelCreate from './../ChannelCreate/ChannelCreate.jsx'
import ChannelJoin from './../ChannelJoin/ChannelJoin.jsx'

class ChannelDashboard extends React.Component {
    render() {
        return (
            <div>
                <h1>Channel Dashboard</h1>
                <h3>Create a new channel</h3>
                <ChannelCreate />
                <p>TODO: Should be able to send invites</p>
                <h3>Send a request to join a channel</h3>
                <ChannelJoin />
            </div>
        );
    }
}

export default ChannelDashboard;
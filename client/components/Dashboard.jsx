import React from 'react';
import { Link } from 'react-router';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import reactMixin from 'react-mixin';

import ChatSidebarLeft from './ChatSidebarLeft.jsx';
import AccountLogout from './AccountLogout.jsx';

import { Channels } from './../../common/Channels/ChannelsCollection.js';

export default class Dashboard extends React.Component {

    //Create a state for hiding and showing CreateChannel
    //State for which list to show

    getMeteorData() {
        const channelsHandle = Meteor.subscribe('channels');
        if (channelsHandle.ready) {
            return {
                //Get joined channels
                joinedChannels: Channels.find({users: Meteor.userId()}).fetch()
            }
        }
    }

    render() {
        const { content } = this.props;

        const joinedChannels = this.data.joinedChannels.map( (channel, i) => {
            return <li key={i}><Link to={"/channel/" + channel._id}>{channel.name}</Link></li>;
        });

        return (
            <div className="Dashboard">
                <AccountLogout/>
                <ChatSidebarLeft channels={ this.data.joinedChannels }/>
                { content }
            </div>
        );
    }
}

reactMixin(Dashboard.prototype, ReactMeteorData);
/*
<div className="Dashboard">
 <div className="row">
 <div className="more panel">
 <h1>Welcome to TypeTo</h1>
 <p>This is a chat application for when you need to share stuff quickly without creating an entirely new Slack team or can't add someone to your teams Slack (for example clients or other third parties).</p>
 <Link to="/create">Create a new Channel</Link><br />
 <Link to="/all">Join a Channel</Link>
 </div>

 <div className="channelList panel">
 <h1>Your Channels</h1>
 <ul>
 { joinedChannels }
 </ul>
 </div>
 </div>
 </div>
* */
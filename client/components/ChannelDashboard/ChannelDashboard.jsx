import React from 'react';
import { Link } from 'react-router';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import reactMixin from 'react-mixin';
import { Channels } from './../../../common/Channels/ChannelsCollection.js';
import ChannelCreate from './../ChannelCreate/ChannelCreate.jsx'
import ChannelJoin from './../ChannelJoin/ChannelJoin.jsx';
import ChannelList from './../ChannelList/ChannelList.jsx';

export default class ChannelDashboard extends React.Component {
    getMeteorData() {
        const handler = Meteor.subscribe('channels');
        if( handler.ready ) {
            return {
                adminChannels: Channels.find({ admin: Meteor.userId() }).fetch(),
                allChannels: Channels.find({}).fetch()
            };
        }
    }

    render() {

        const adminChannels = this.data.adminChannels.map( (channel, i) => {
            return(
                <li key={i}>
                    <Link to={"/channel/" + channel._id + "/admin"}>
                        {channel.name}
                    </Link>
                </li>
            );
        });

        return (
            <div>
                <h1>Channel Dashboard</h1>
                <h3>Create a new channel</h3>
                <ChannelCreate />
                <p>TODO: Should be able to send invites</p>
                <h3>Send a request to join a channel</h3>
                <ChannelJoin />
                <ChannelList channels={this.data.allChannels} />
                <h3>Admin</h3>
                <p>Delete, change name, kick members, add admins</p>
                {adminChannels ? adminChannels : <p>You have not created any channels yet</p>}
            </div>
        );
    }
}

reactMixin(ChannelDashboard.prototype, ReactMeteorData);
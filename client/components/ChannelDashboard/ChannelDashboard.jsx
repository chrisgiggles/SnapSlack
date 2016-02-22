import React from 'react';
import { Link } from 'react-router';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import reactMixin from 'react-mixin';
import { Channels } from './../../../common/Channels/ChannelsCollection.js';
import ChannelCreate from './../ChannelCreate/ChannelCreate.jsx'
import ChannelJoin from './../ChannelJoin/ChannelJoin.jsx';

export default class ChannelDashboard extends React.Component {
    getMeteorData() {
        const handler = Meteor.subscribe('channels');
        if( handler.ready ) {
            return {
                channels: Channels.find({ admin: Meteor.userId() }).fetch()
            };
        }
    }

    render() {

        const adminChannels = this.data.channels.map( (channel, i) => {
            console.log(channel)
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
                <h3>Admin</h3>
                <p>Delete, change name, kick members, add admins</p>
                {adminChannels ? adminChannels : <p>You have not created any channels yet</p>}
            </div>
        );
    }
}

reactMixin(ChannelDashboard.prototype, ReactMeteorData);
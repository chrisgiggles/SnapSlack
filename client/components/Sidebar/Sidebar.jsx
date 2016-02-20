import React from 'react';
import { Link } from 'react-router';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import reactMixin from 'react-mixin';
import Avatar from './../Avatar/Avatar.jsx';
import AccountsUIWrapper from './../AccountsUIWrapper/AccountsUIWrapper.jsx';
import { Channels } from './../../../common/Channels/ChannelsCollection.js';

export default class Sidebar extends React.Component {

    getMeteorData() {
        const channelsHandle = Meteor.subscribe('channels', Meteor.userId());
        const usersHandle = Meteor.subscribe('users');
        if (channelsHandle.ready && usersHandle.ready) {
            return {
                channels: Channels.find({}).fetch(),
                user: Meteor.users.find({_id: Meteor.userId()}).fetch()
            };
        }
    }

    render() {
        const channels = this.data.channels.map( (channel) => {
            return <li key={channel._id}><Link to={"/channel/" + channel._id}>{channel.name}</Link></li>;
        });

        const channelsReady = this.data.channels ? channels : "Loading channels";

        return (
            <div className="Sidebar">
                <Avatar userId={Meteor.userId()}/>
                <AccountsUIWrapper/>
                <ul>
                    <li><h3>Menu</h3></li>
                    <li><Link to='/'>Dashboard</Link></li>
                </ul>
                <ul>
                    <li><h3>Channels</h3></li>
                    { channelsReady }
                </ul>
            </div>
        );
    }
}

reactMixin(Sidebar.prototype, ReactMeteorData);

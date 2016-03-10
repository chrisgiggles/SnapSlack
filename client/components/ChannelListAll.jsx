import React from 'react';
import { Link } from 'react-router';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import reactMixin from 'react-mixin';

import { Channels } from './../../common/Channels/ChannelsCollection.js';

export default class ChannelJoin extends React.Component {

    joinChannel(e, id) {
        e.preventDefault();
        Meteor.call('joinChannel', id);
    }

    leaveChannel(e, id) {
        e.preventDefault();
        Meteor.call('leaveChannel', id);
    }

    isMember(channel, userId) {
        //Check if the current logged in user is a member of this channel
        const inArray = channel.users.filter( user => {
            return user === userId;
        });

        return inArray.length > 0;
    }

    isAdmin(channel, userId) {
        return channel.admin === userId
    }

    getMeteorData() {
        const channelsHandle = Meteor.subscribe('channels');
        const usersHandle = Meteor.subscribe('users');
        if (channelsHandle.ready) {
            return {
                channels: Channels.find({}).fetch()
            }
        }
    }

    render() {
        const channels = this.data.channels.map( (channel, i) => {

            const isUserMember = this.isMember(channel, Meteor.userId());
            const isUserAdmin = this.isAdmin(channel, Meteor.userId());

            if (isUserAdmin == false) {
                return (
                    <li key={i}>
                        <Link to={"/channel/" + channel._id}>{channel.name}</Link>
                        { isUserAdmin
                            ? 'You are the admin for this channel' : isUserMember
                            ? <button onClick={ (e) => {this.leaveChannel(e, channel._id)} }>Leave</button>
                            : <button onClick={ (e) => {this.joinChannel(e, channel._id)} }>Join</button>
                        }
                    </li>
                );
            }
        });

        const adminChannels = this.data.channels.map( (channel, i) => {
            const isUserAdmin = this.isAdmin(channel, Meteor.userId());
            if ( isUserAdmin == true) {
                return (
                    <li key={i}>
                        <Link to={"/channel/" + channel._id}>{channel.name}</Link>
                    </li>
                );
            }
        });

        return (
            <div className="ChannelJoin">
                <div className="row">
                    <div className="centered">
                        <h2>Created Channels</h2>
                        <ul>{adminChannels}</ul>
                        <h2>All channels</h2>
                        <ul>{channels}</ul>
                    </div>
                </div>
            </div>
        );
    }
}

reactMixin(ChannelJoin.prototype, ReactMeteorData);
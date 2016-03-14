import React from 'react';
import { Link } from 'react-router';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import reactMixin from 'react-mixin';
import Scrollbars from 'react-custom-scrollbars';

import ChatAdminSettings from './ChatAdminSettings.jsx';

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
                        { isUserMember
                            ? <button className="leave" onClick={ (e) => {this.leaveChannel(e, channel._id)} }>Leave</button>
                            : <button className="join" onClick={ (e) => {this.joinChannel(e, channel._id)} }>Join</button>
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
                        <ChatAdminSettings id={channel._id}/>
                    </li>
                );
            }
        });

        return (
            <div className="ChannelListAll">
                <Scrollbars>
                    <div className="inner">
                        <h2>Created Channels</h2>
                        <ul>{adminChannels}</ul>
                        <h2>All channels</h2>
                        <ul>{channels}</ul>
                    </div>
                </Scrollbars>
            </div>
        );
    }
}

reactMixin(ChannelJoin.prototype, ReactMeteorData);
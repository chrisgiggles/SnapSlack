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

    getMeteorData() {
        const channelsHandle = Meteor.subscribe('channels');

        if (channelsHandle.ready) {
            return {
                channels: Channels.find({}).fetch()
            }
        }
    }

    render() {
        const channels = this.data.channels.map( (channel, i) => {
            return (
                <li key={i}>
                    <Link to={"/channel/" + channel._id}>{channel.name}</Link>
                    <button onClick={ (e) => {this.joinChannel(e, channel._id)} }>Join</button>
                </li>
            );
        });

        return (
            <div className="ChannelJoin">
                <div className="row">
                    <div className="centered">
                        <h2>All channels</h2>
                        <ul>{channels}</ul>
                    </div>
                </div>
            </div>
        );
    }
}

reactMixin(ChannelJoin.prototype, ReactMeteorData);
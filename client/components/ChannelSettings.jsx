import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import reactMixin from 'react-mixin';
import { Channels } from './../../common/Channels/ChannelsCollection.js';

export default class ChannelSettings extends React.Component {

    getMeteorData() {
        const handler = Meteor.subscribe('channels');
        if ( handler.ready ) {
            return {
                channels: Channels.find({ admin: Meteor.userId() }).fetch()
            };
        }
    }

    handleDelete(channelId) {
        Meteor.call('deleteChannel' , channelId);
        this.context.router.push('/');
    }

    handleSubmit(e, channelId, channel) {
        e.preventDefault();

        const channelMeta = {
            name: this.refs.name.value,
            desc: this.refs.desc.value
        };

        if ( !channelMeta.name.trim() ) {
            channelMeta.name = channel.name;
        }

        if ( !channelMeta.desc.trim() ) {
            channelMeta.desc = channel.description;
        }

        Meteor.call('changeChannel', channelId, channelMeta);
        this.props.closeModal();
    }

    render() {

        const channel = this.data.channels.filter( channel => {
            return channel._id === this.props.id;
        })[0];

        if (channel === undefined) {
            return <p>Loading</p>
        }

        return (
            <div className="ChannelSettings">
                <form onSubmit={ (e) => { this.handleSubmit(e, this.props.id, channel) } }>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" ref="name" defaultValue={ channel.name } /><br/>
                    <label htmlFor="desc">Description</label>
                    <input type="text" id="desc" ref="desc" defaultValue={ channel.description } />
                    <input type="submit" />
                </form>

                <a href="#"
                   className="delete"
                   onClick={() => { this.handleDelete(this.props.id) }}>
                    Delete This Channel
                </a>
            </div>
        );
    }
}

ChannelSettings.propTypes = {
    id: React.PropTypes.string.isRequired,
    closeModal: React.PropTypes.func
};

ChannelSettings.contextTypes = {
    router: React.PropTypes.object
};

reactMixin(ChannelSettings.prototype, ReactMeteorData);
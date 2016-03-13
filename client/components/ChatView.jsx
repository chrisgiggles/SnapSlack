import React from 'react';
import ReactDOM from 'react-dom';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import reactMixin from 'react-mixin';

import { Channels } from './../../common/Channels/ChannelsCollection.js';
import { Messages } from './../../common/Messages/MessagesCollection.js';

import ChatSidebarLeft from './ChatSidebarLeft.jsx';
import ChatSidebarRight from './ChatSidebarRight.jsx';
import ChatMessageView from './ChatMessageView.jsx';
import ChatMessageForm from './ChatMessageForm.jsx';

export default class ChatView extends React.Component {

    getMeteorData() {
        const channelsHandle = Meteor.subscribe('channels');
        const messagesHandle = Meteor.subscribe('messages');

        if (channelsHandle.ready && messagesHandle.ready) {
            return {
                //Get joined channels
                allChannels: Channels.find({users: Meteor.userId()}).fetch(),
                currentChannel: Channels.find({_id: this.props.params.channelId}).fetch(),
                currentChannelMessages: Messages.find({ channelId: this.props.params.channelId }).fetch()
            }
        }
    }

    isMember(channel, userId) {
        //Check if the current logged in user is a member of this channel
        const inArray = channel.users.filter( user => {
            return user === userId;
        });

        return inArray.length > 0;
    }

    render() {
        if ( !this.data.currentChannel[0] ) {
            return <p>Loading</p>
        }

        const currentChannel = this.data.currentChannel[0];
        const currentChannelMembers = currentChannel.users.map( user => user );

        const isMember = this.isMember(currentChannel, Meteor.userId());
        
        return (
            <div className="ChatView">
                <ChatSidebarLeft channels={this.data.allChannels} />
                <ChatSidebarRight channelMembers={currentChannelMembers} />
                <ChatMessageView messages={this.data.currentChannelMessages} channel={currentChannel} />
                <ChatMessageForm isMember={isMember} channelId={this.props.params.channelId} />
            </div>
        );
    }
}

reactMixin(ChatView.prototype, ReactMeteorData);
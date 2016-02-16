import { Channels } from './../common/Channels/ChannelsCollection.js';

Meteor.publish('channels', function(userId) {
    return Channels.find({ users: {$eq: userId} });
});

Meteor.publish('channel', function(channelId) {
    return Channels.find({ _id: channelId});
});
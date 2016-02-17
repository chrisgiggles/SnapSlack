import { Channels } from './../common/Channels/ChannelsCollection.js';
import { Messages } from './../common/Messages/MessagesCollection.js';

Meteor.publish('channels', function(userId) {
    return Channels.find({ users: {$eq: userId} });
});

Meteor.publish('messages', function() {
    return Messages.find({});
});

Meteor.publish('users', function() {
    return Meteor.users.find({}, {fields: {'emails': 1, 'username': 1}});
});
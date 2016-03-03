import { Channels } from './../common/Channels/ChannelsCollection.js';
import { Messages } from './../common/Messages/MessagesCollection.js';

Meteor.publish('channels', function() {
    return Channels.find({});
});

Meteor.publish('messages', function() {
    return Messages.find({});
});

Meteor.publish('users', function() {
    return Meteor.users.find({}, {fields: {'emails': 1, 'username': 1, 'profileColor': 1, 'profilePicture': 1, 'service': 1}});
});
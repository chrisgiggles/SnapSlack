import { Channels } from './ChannelsCollection.js';

Meteor.methods({
    newChannel: function(channel) {
        if( !Meteor.userId() ) {
            throw new Meteor.Error("not-authorized", "You are not logged in");
        }

        Channels.insert({
            name: channel.name,
            description: channel.description,
            admin: Meteor.userId(),
            users: [Meteor.userId()],
        });
    },

    joinChannel: function(channelId) {
        if( !Meteor.userId() ) {
            throw new Meteor.Error("not-authorized", "You are not logged in");
        }

        if (Channels.find({_id: channelId}).count() > 0) {
            Channels.update(channelId, { $addToSet: {users: Meteor.userId()} });
        } else {
            throw new Meteor.Error('no-document-exists', 'This channel does not exist.');
        }
    },

    deleteChannel: function(channelId) {
        // not logged in - reject
        if( !Meteor.userId() ) {
            throw new Meteor.Error("not-authorized", "You are not logged in");
        }

        if (Channels.find({_id: channelId}, { admin: { $elemMatch: {$eq: Meteor.userId()} } }).count() > 0) {
            Channels.remove({_id: channelId});
            Meteor.call('deleteMessages', channelId);
        } else {
            // userid is not present in admin field - reject
            throw new Meteor.Error('no-admin', 'You are not an admin of this channel');
        }

        // channel does not exist - reject ?
    },

    changeChannel: function(channelId, channelMeta) {
        if( !Meteor.userId() ) {
            throw new Meteor.Error("not-authorized", "You are not logged in");
        }

        if (Channels.find({_id: channelId}, { admin: { $elemMatch: {$eq: Meteor.userId()} } }).count() > 0) {
            Channels.update(channelId, {$set: {name: channelMeta.name, description: channelMeta.desc}});
        } else {
            // userid is not present in admin field - reject
            throw new Meteor.Error('no-admin', 'You are not an admin of this channel');
        }
    }
});

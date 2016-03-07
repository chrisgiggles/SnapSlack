import { Messages } from './MessagesCollection.js';
import { Channels } from './../Channels/ChannelsCollection.js';

Meteor.methods({
    newMessage: function(channelId, text) {
        if( !Meteor.userId() ) {
            throw new Meteor.Error("not-authorized", "You are not logged in");
        }

        function userIsMember(userId, channelId) {
            //Filters through the users array in a Channel collection
            const channel = Channels.find({_id: channelId}).fetch();
            const filtered = channel[0].users.filter( user => user === userId);
            return filtered.length > 0;
        }
        const isMember = userIsMember(Meteor.userId(), channelId);

        if (text && isMember && typeof text === 'string') {
            Messages.insert({
                time: new Date(),
                userId: Meteor.userId(),
                userName: Meteor.user().username,
                text: text,
                channelId: channelId
            });
        }
        if (!isMember) {
            throw new Meteor.Error("not-authorized", "You are not a member of this channel");
        }
    },

    deleteMessages: function(channelId) {
        if( !Meteor.userId() ) {
            throw new Meteor.Error("not-authorized", "You are not logged in");
        }

        Messages.remove({channelId: channelId});
    }

});
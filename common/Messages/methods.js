import { Messages } from './MessagesCollection.js';

Meteor.methods({
    newMessage: function(channelId, text) {
        if( !Meteor.userId() ) {
            throw new Meteor.Error("not-authorized", "You are not logged in");
        }

        if (text && typeof text === 'string') {
            Messages.insert({
                time: new Date(),
                userId: Meteor.userId(),
                userName: Meteor.user().username,
                text: text,
                channelId: channelId
            });
        }
    }

});
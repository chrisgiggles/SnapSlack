import { Channels } from './ChannelsCollection.js';

Meteor.methods({
    newChannel: function(obj) {
        if( !Meteor.userId() ) {
            throw new Meteor.Error("not-authorized", "You are not logged in");
        }

        Channels.insert({
            name: obj.name,
            description: obj.description,
            admin: Meteor.userId(),
            users: [Meteor.userId()],
            messages: []
        });
    },

    joinChannel: function(channelId) {
        if( !Meteor.userId() ) {
            throw new Meteor.Error("not-authorized", "You are not logged in");
        }

        const exists = Channels.find({channelId});
        console.log(exists)

        //Channels.update(channelId, { $addToSet: {users: Meteor.userId()} });
    }
})

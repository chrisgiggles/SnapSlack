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
    }
})

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import reactMixin from 'react-mixin';
import { Scrollbars } from 'react-custom-scrollbars';
import Avatar from './Avatar.jsx';

export default class ChatSidebarRight extends React.Component {

    getMeteorData() {
        const usersHandle = Meteor.subscribe('users');
        if (usersHandle.ready) {
            return {
                channelMembers: Meteor.users.find({_id: {$in: this.props.channelMembers} }).fetch()
            }
        }
    }

    render() {
        const channelMembers = this.data.channelMembers.map( (member, i) => {
            //console.log("ChatSidebarRight  member -->", member);
            const username = member.username;
            const id = member._id;
            const status = member.status.online ? 'online' : 'offline';

            return (
                <li key={i}><Avatar userId={id} />{username} - {status}</li>
            );
        });
        
        return (
            <div className="ChatSidebarRight">
                <Scrollbars>
                    <div className="inner">
                        <ul>
                            <li><h3>Members</h3></li>
                            {channelMembers}
                        </ul>
                    </div>
                </Scrollbars>
            </div>
        );
    }
}

ChatSidebarRight.propTypes = {
    channelMembers: React.PropTypes.array.isRequired
};

reactMixin(ChatSidebarRight.prototype, ReactMeteorData);
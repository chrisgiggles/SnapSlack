import React from 'react';
import { Link } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars';

import AdminBadge from './AdminBadge.jsx';

export default class ChatSidebarLeft extends React.Component {

    render() {
        const channels = this.props.channels.map( (channel, i) => {
            const isAdmin = Meteor.userId() === channel.admin;
            return (
                <li key={i}>
                    <Link to={"/channel/" + channel._id}>{channel.name}</Link>
                    <AdminBadge isAdmin={isAdmin} />
                </li>
            );

        });

        const channelsReady = this.props.channels ? channels : "Loading channels";


        return (
            <div className="ChatSidebarLeft">
                <Scrollbars universal>
                    <div className="inner">
                        <h3>Channels</h3>
                        <ul>
                            { channelsReady }
                        </ul>
                    </div>
                </Scrollbars>
            </div>
        );
    }
}

ChatSidebarLeft.propTypes = {
    channels: React.PropTypes.array.isRequired
};
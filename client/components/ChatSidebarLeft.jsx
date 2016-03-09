import React from 'react';
import { Link } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars';

export default class ChatSidebarLeft extends React.Component {

    render() {
        const channels = this.props.channels.map( (channel, i) => {
            return <li key={i}><Link to={"/channel/" + channel._id}>{channel.name}</Link></li>;
        });

        const channelsReady = this.props.channels ? channels : "Loading channels";

        return (
            <div className="ChatSidebarLeft">
                <Scrollbars>
                    <div className="inner">
                        <ul>
                            <li><h3>Channels</h3></li>
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
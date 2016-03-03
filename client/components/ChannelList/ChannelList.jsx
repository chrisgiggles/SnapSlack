import React from 'react';

class ChannelList extends React.Component {
    joinChannel(e, id) {
        e.preventDefault();
        Meteor.call('joinChannel', id);
    }

    render() {
        const list = this.props.channels.map( (channel, i) => {
            return (
                <li key={i}>
                    { channel.name }
                    <button onClick={ (e) => {this.joinChannel(e, channel._id)} }>Join</button>
                </li>
            );
        });

        return (<ul><li>List of all channels</li> {list} </ul>);
    }
}

export default ChannelList;
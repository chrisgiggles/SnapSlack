import React from 'react';
import ChatAdminSettings from './ChatAdminSettings.jsx';

export default class ChatMessageViewHeader extends React.Component {

    render() {
        const isAdmin = Meteor.userId() === this.props.admin;
        return (
            <div className="ChatMessageViewHeader">
                <div className="inner">
                    <h3>{this.props.channelName}</h3>

                    <div className="meta">
                        <span>
                            {this.props.usersCount === 1
                                ? this.props.usersCount + ' member'
                                : this.props.usersCount + ' members' }
                        </span>

                    </div>
                    { isAdmin === true
                        ? <ChatAdminSettings id={this.props.id}/>
                        : null }
                </div>
            </div>
        );
    }
}

ChatMessageViewHeader.propTypes = {
    channelName: React.PropTypes.string.isRequired,
    admin: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    usersCount: React.PropTypes.number.isRequired
};
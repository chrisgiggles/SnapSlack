import React from 'react';
import { Link } from 'react-router';

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
                        ? <Link to={"/channel/" + this.props.id + "/settings"}>Settings</Link>
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
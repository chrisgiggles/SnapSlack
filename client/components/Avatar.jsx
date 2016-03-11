import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import reactMixin from 'react-mixin';


export default class Avatar extends React.Component {

    getMeteorData () {
        return { user: Meteor.users.find({_id: this.props.userId}).fetch() };
    }

    render() {
        const user = this.data.user[0];

        let avatar;
        let color;
        let letter;
        let style;
        const className = this.props.size === 'small' ? 'Avatar small' : 'Avatar';

        if (user !== undefined && user.service === 'google') {
            avatar = function() {
                return <img src={user.profilePicture}/>;
            }();
        }
        else if (user !== undefined && user.service === 'password') {
            color = user.profileColor;
            letter = user.username[0].toUpperCase();
            style = {
                backgroundColor: color
            };

            avatar = function() {
                return <span>{letter}</span>;
            }();
        }

        return <div style={style} className={className}>{ avatar }</div>;
    }
}

Avatar.propTypes = {
    userId: React.PropTypes.string,
    size: React.PropTypes.string
};

reactMixin(Avatar.prototype, ReactMeteorData);
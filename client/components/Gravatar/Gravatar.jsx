import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import reactMixin from 'react-mixin';
import md5 from 'md5';

export default class Gravatar extends React.Component {

    getMeteorData () {
        return { user: Meteor.users.find({_id: this.props.userId}).fetch() };
    }

    render() {
        const email = this.data.user[0].emails[0].address;
        const hash = md5(email);
        const url = `http://www.gravatar.com/avatar/${hash}?d=identicon`;
        return <img src={url} alt="" className="Gravatar"/>;
    }
}

reactMixin(Gravatar.prototype, ReactMeteorData);
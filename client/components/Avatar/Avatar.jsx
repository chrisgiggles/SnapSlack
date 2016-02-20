import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import reactMixin from 'react-mixin';

export default class Gravatar extends React.Component {

    getMeteorData () {
        return { user: Meteor.users.find({_id: this.props.userId}).fetch() };
    }

    render() {
        let color = '';
        let letter = '';
        if (this.data.user[0] !== undefined) {
            color = this.data.user[0].profileColor;
            letter = this.data.user[0].username[0].toUpperCase();
        } else {
            color = "#000";
            letter = 'X';
        }

        const style = {
            backgroundColor: color
        };

        return <div style={style} className="Avatar">{letter}</div>;
    }
}

reactMixin(Gravatar.prototype, ReactMeteorData);
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import reactMixin from 'react-mixin';
import { Messages } from './../../../common/MessagesCollection.js';


export default class ChatView extends React.Component {
    getMeteorData () {
        return {
            messages: Messages.find().fetch()
        }
    }
    render() {
        const messages = this.data.messages.map((msg, i) => {
            return (
                <li key={i}>
                    <div className="avatar"><img src="default_avatar.png" alt={msg.userName + "'s avatar"}/></div>
                    <div className="message">
                        <span className="meta">{msg.userName} - { msg.time.getHours() }:{ msg.time.getMinutes() }</span>
                        <p className="text">{msg.text}</p>
                    </div>
                </li>
            );
        });

        return (
            <ul className="ChatView">{messages}</ul>
        );
    }
}

reactMixin(ChatView.prototype, ReactMeteorData);
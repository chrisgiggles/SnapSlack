import React from 'react';
import ReactDOM from 'react-dom';
import PS from 'perfect-scrollbar';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import reactMixin from 'react-mixin';
import { Messages } from './../../../common/MessagesCollection.js';

export default class ChatView extends React.Component {

    componentDidMount() {
        const el = ReactDOM.findDOMNode(this);
        PS.initialize(el);
        el.scrollTop = el.scrollHeight;
    }

    componentWillUpdate() {
        const el = ReactDOM.findDOMNode(this);
        this.shouldScroll = el.scrollTop + el.offsetHeight === el.scrollHeight;
        //Can't use setstate here... using this.shouldScroll for the moment
    }

    componentDidUpdate() {
        if (this.shouldScroll) {
            const el = ReactDOM.findDOMNode(this);
            el.scrollTop = el.scrollHeight;
        }
        else {
            console.log("Scroll down to read new messages");
        }
    }

    componentWillUnmount() {
        const el = ReactDOM.findDOMNode(this);
        PS.destroy(el);
    }

    getMeteorData() {
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
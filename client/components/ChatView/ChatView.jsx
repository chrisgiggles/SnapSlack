import React from 'react';
import ReactDOM from 'react-dom';
import PS from 'perfect-scrollbar';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import reactMixin from 'react-mixin';
import { Channels } from './../../../common/Channels/ChannelsCollection.js';
import { Messages } from './../../../common/Messages/MessagesCollection.js';
import MessageForm from './../MessageForm/MessageForm.jsx';
import Gravatar from './../Gravatar/Gravatar.jsx';

export default class ChatView extends React.Component {

    componentDidMount() {
        const el = ReactDOM.findDOMNode(this);
        PS.initialize(el);
        el.scrollTop = el.scrollHeight;
    }

    componentWillUpdate() {
        const el = ReactDOM.findDOMNode(this);
        this.shouldScroll = el.scrollTop + el.offsetHeight === el.scrollHeight;
        //Can't use setState here. Using an outside state variable in the meantime
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
        let data = {};
        const id = this.props.params.channelId;
        const messageHandler = Meteor.subscribe('messages');
        //const handler = Meteor.subscribe('channel', id); //This doesn't matter... why?

        if (messageHandler.ready) {
            data = {
                channel: Channels.find({_id: id}).fetch(),
                messages: Messages.find({channelId: id}).fetch()
            };

            if (this.data.channel) {
                data.users = data.channel[0].users;
            }
        }

        return data;
    }


    render() {
        if (this.data.channel[0] === undefined) {
            return(<p>Loading</p>);
        }

        const messages = this.data.messages.map((msg, i) => {
            const userId = this.data.users.filter( user => {
                return msg.userId === user;
            })[0];

            return (
                <li key={i}>
                    <Gravatar userId={userId}/>
                    <div className="message">
                        <span className="meta">{msg.userName}</span>
                        {/*- { msg.time.getHours() }:{ msg.time.getMinutes() }</span>*/}
                        <p className="text">{msg.text}</p>
                    </div>
                </li>
            );
        });

        return (
            <div className="ChatView">
                <ul>{messages}</ul>
                <MessageForm channelId={this.props.params.channelId}/>
            </div>
        );
    }
}

reactMixin(ChatView.prototype, ReactMeteorData);
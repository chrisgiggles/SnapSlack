import React from 'react';
import ReactDOM from 'react-dom';
import PS from 'perfect-scrollbar';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import reactMixin from 'react-mixin';
import { Channels } from './../../../common/Channels/ChannelsCollection.js';

export default class ChatView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            name: '',
            description: '',
        }
    }

    componentDidMount() {
        const el = ReactDOM.findDOMNode(this);
        PS.initialize(el);
        el.scrollTop = el.scrollHeight;
    }

    componentWillUpdate() {
        const el = ReactDOM.findDOMNode(this);
        this.shouldScroll = el.scrollTop + el.offsetHeight === el.scrollHeight;
        //Can't use setstate in componentWillUpdate
        //using this.shouldScroll for the moment until I figure something else out
    }

    componentDidUpdate() {
        const el = ReactDOM.findDOMNode(this);

        if (this.shouldScroll) {
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
        const id = this.props.params.channelId;
        const handler = Meteor.subscribe('channels', Meteor.userId()); //This doesn't matter... why?
        if (handler.ready) {
            return {
                channel: Channels.find({_id: id}).fetch()
            }
        }
    }

    render() {
        console.log("ChatView render this.data -->", this.data.channel[0]);

        if (this.data.channel[0] === undefined) {
            console.log("ChatView render 'is undefined' -->", 'is undefined');
            return(<p>Hello</p>);
        }


        const messages = this.data.channel[0].messages.map((msg, i) => {
            console.log("ChatView  msg -->", msg);
            return (
                <li key={i}>
                    <div className="avatar"><img src="/default_avatar.png" alt={ msg.userName + "'s avatar" }/></div>
                    <div className="message">
                        <span className="meta">{msg.userName}</span> {/*- { msg.time.getHours() }:{ msg.time.getMinutes() }</span>*/}
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
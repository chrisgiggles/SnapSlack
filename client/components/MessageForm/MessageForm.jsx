import React from 'react';
import { Messages } from './../../../common/Messages/MessagesCollection.js';


class MessageForm extends React.Component {

    handleSubmit(e) {
        e.preventDefault();

        const text = e.target[0].value;
        const channelId = this.props.channelId;

        if(text) {
            Meteor.call('newMessage', channelId, text);
            e.target[0].value = '';
        }
    }

    render() {
        console.log("MessageForm render this.props.channelId -->", this.props.channelId);
        return (
            <form action="#" onSubmit={ (e) => {this.handleSubmit(e)} }>
                <input type="text"/><input type="submit"/>
            </form>
        );
    }
}

export default MessageForm;
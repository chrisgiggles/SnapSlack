import React from 'react';
import { Messages } from './../../../common/MessagesCollection.js';


class MessageForm extends React.Component {

    handleSubmit(e) {
        e.preventDefault();

        const text = e.target[0].value;

        if(text) {
            Meteor.call('newMessage', text);
            e.target[0].value = '';
        }
    }

    render() {
        return (
            <form action="#" onSubmit={ (e) => {this.handleSubmit(e)} }>
                <input type="text"/><input type="submit"/>
            </form>
        );
    }
}

export default MessageForm;
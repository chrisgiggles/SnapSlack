import React from 'react';

export default class ChatMessageForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const text = e.target[0].value;
        const channelId = this.props.channelId;

        if( text.trim() ) {
            Meteor.call('newMessage', channelId, text);
            e.target[0].value = '';
        }
    }

    render() {
        return (
            <div className="ChatMessageForm">
                <form action="#" onSubmit={ (e) => {this.handleSubmit(e)} }>
                    <textarea name="textfield"/><input type="submit" value="Send"/>
                </form>
            </div>
        );
    }
}

ChatMessageForm.propTypes = {
    channelId: React.PropTypes.string.isRequired
};
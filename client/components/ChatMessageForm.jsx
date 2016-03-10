import React from 'react';

export default class ChatMessageForm extends React.Component {

    handleKeydown(e) {
        //Enter
        if (e.keyCode === 13) {
            this.handleSubmit(e);
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const text = this.refs.textfield.value;
        const channelId = this.props.channelId;

        if( text.trim() ) {
            Meteor.call('newMessage', channelId, text);
            this.refs.textfield.value = '';
        }
    }

    render() {
        return (
            <div className="ChatMessageForm">
                <form action="#" onSubmit={ (e) => {this.handleSubmit(e)} }>
                    <textarea name="textfield" ref="textfield" onKeyDown={ (e) => { this.handleKeydown(e) } }/>
                    <input type="submit" value="Send"/>
                </form>
            </div>
        );
    }
}

ChatMessageForm.propTypes = {
    channelId: React.PropTypes.string.isRequired
};
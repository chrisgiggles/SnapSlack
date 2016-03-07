import React from 'react';

export default class ChatMessageForm extends React.Component {

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
        return (
            <div className="ChatMessageForm">
                <form action="#" onSubmit={ (e) => {this.handleSubmit(e)} }>
                    <input type="text"/><input type="submit"/>
                </form>
            </div>
        );
    }
}

ChatMessageForm.propTypes = {
    channelId: React.PropTypes.string.isRequired
};

/*
regex for URLS
 http://blog.mattheworiordan.com/post/13174566389/url-regular-expression-for-links-with-or-without
/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

Youtube
 ^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$

 */

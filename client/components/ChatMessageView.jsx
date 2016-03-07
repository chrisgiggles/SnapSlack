import React from 'react';
import Avatar from './Avatar.jsx';
import testPatterns from './../../common/utils/testPatterns.js';

export default class ChatMessageView extends React.Component {
    render() {

        function escapeHtml(unsafeString) {
            return unsafeString
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }

        console.log("ChatMessageView render this.props.messages -->", this.props.messages);
        const messages = this.props.messages.map( (msg, i) => {

            const userId = msg.userId;
            let text = escapeHtml(msg.text);
            const username = msg.userName;
            const timestamp = msg.time.toString();

            const msgType = testPatterns(text);

            //Refactor into the testpatterns util function and rename
            const linkText = function(text) {
                const matchUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
                const str = text.replace(matchUrl, '<a href="$1" target="_blank" rel="nofollow">$1</a>');
                return {__html: str};
            };

            const image = function(text) {
                //grab link
                const matchImg = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/ig;
                const matched = text.match(matchImg)[0];
                return {__html: '<a href="'+ matched +'" target="_blank" rel="nofollow"><img src="' + matched + '" /></a>'};
            };

            const youtube = function(text) {
                const matchYoutube = /^(https?\:\/\/)?(www.)?(youtube\.com|youtu\.?be)\/.+$/gm;
                const matched = text.match(matchYoutube)[0];
                return {__html: '<iframe width="560" height="349" src="' + matched + '&output=embed' + '" frameborder="0" allowfullscreen></iframe>'}
            };

            return (
                <li key={i}>
                    <Avatar userId={userId}/>
                    <span>{username} - {timestamp}</span>
                    {msgType.link
                        ? <p dangerouslySetInnerHTML={ linkText(text) } />
                        : <p>{text}</p>}
                    {msgType.image
                        ? <div className="chatImage" dangerouslySetInnerHTML={ image(text) }></div>
                        : ''}
                    {msgType.youtube
                        ? <div className="chatVideoWrapper" dangerouslySetInnerHTML={ youtube(text) }></div>
                        : ''}
                </li>
            );
        });

        return (
            <div className="ChatMessageView">
                <ul>{ messages }</ul>
            </div>
        );
    }
}

ChatMessageView.propTypes = {
    messages: React.PropTypes.array.isRequired
};

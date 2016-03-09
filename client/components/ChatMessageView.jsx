import React from 'react';
import ReactDOM from 'react-dom';
import Avatar from './Avatar.jsx';
import testPatterns from './../../common/utils/testPatterns.js';
import { Scrollbars } from 'react-custom-scrollbars';
import TimeAgo from 'react-timeago';

export default class ChatMessageView extends React.Component {

    //constructor(props) {
    //    super(props);
    //}
    //
    //componentDidMount() {
    //    this.refs.container.style = 'height: ' + this.refs.list.offsetHeight + 'px';
    //
    //}
    //
    //componentDidUpdate() {
    //    console.log(this.refs.container.offsetHeight, this.refs.list.offsetHeight)
    //    this.refs.container.style = 'height: ' + this.refs.list.offsetHeight + 'px';
    //    this.refs.container.scrollTop = 200;
    //
    //}

    render() {

        function escapeHtml(unsafeString) {
            return unsafeString
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }

        //console.log("ChatMessageView render this.props.messages -->", this.props.messages);
        const messages = this.props.messages.map( (msg, i) => {

            const userId = msg.userId;
            let text = escapeHtml(msg.text);
            const username = msg.userName;

            const msgType = testPatterns(text);

            //Refactor into the testpatterns util function and rename it
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
                    <div class="message-area">
                        <span>{username} - <TimeAgo date={ msg.time } minPeriod={ 60 } /></span>
                        {msgType.link
                            ? <p dangerouslySetInnerHTML={ linkText(text) } />
                            : <p>{msg.text}</p>}
                        {msgType.image
                            ? <div className="chatImage" dangerouslySetInnerHTML={ image(text) }></div>
                            : ''}
                        {msgType.youtube
                            ? <div className="chatVideoWrapper" dangerouslySetInnerHTML={ youtube(text) }></div>
                            : ''}
                    </div>
                </li>
            );
        });

        return (
            <div className="ChatMessageView">
                <Scrollbars>
                    <div className="inner">
                        <ul>{ messages }</ul>
                    </div>
                </Scrollbars>

            </div>
        );
    }
}

ChatMessageView.propTypes = {
    messages: React.PropTypes.array.isRequired
};


//const AutoScrolled = AutoScroll({
//    property: 'messages'
//})(React.createClass({
//    displayName: 'scrollable',
//    propTypes: {
//        messages: React.PropTypes.array.isRequired
//    },
//    render: function render() {
//        return (
//            <div className="inner">
//                <ul ref="list">{ this.props.messages }</ul>
//            </div>
//        );
//    }
//}));
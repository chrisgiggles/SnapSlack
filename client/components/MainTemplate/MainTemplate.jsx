import React from 'react';
import { Messages } from './../../../common/MessagesCollection.js';
import MessageForm from './../MessageForm/MessageForm.jsx';
import ChatView from './../ChatView/ChatView.jsx';
import AccountsUIWrapper from './../AccountsUIWrapper/AccountsUIWrapper.jsx';

class MainTemplate extends React.Component {

    render() {
        return (
            <div className="MainTemplate">
                <header className="header">
                    <div className="header-inner">
                        <h1 className="head">ChatUp</h1>
                        <AccountsUIWrapper />
                    </div>
                </header>
                <section>
                    <ChatView />
                </section>
                <MessageForm/>
            </div>
        );
    }
}

export default MainTemplate;
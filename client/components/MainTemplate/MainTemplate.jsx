import React from 'react';
import { Messages } from './../../../common/MessagesCollection.js';
import MessageForm from './../MessageForm/MessageForm.jsx';
import ChatView from './../ChatView/ChatView.jsx';
import Header from './../Header/Header.jsx';
import Sidebar from './../Sidebar/Sidebar.jsx';

class MainTemplate extends React.Component {

    render() {
        return (
            <div className="MainTemplate">
                <Header/>
                <section className="wrapper">
                    <Sidebar/>
                    <section className="main">
                        <ChatView/>
                    </section>
                </section>
                <section>
                    <MessageForm/>
                </section>
            </div>
        );
    }
}

export default MainTemplate;
import React from 'react';
import ReactDOM from 'react-dom';
import PS from 'perfect-scrollbar';
import { Messages } from './../../../common/MessagesCollection.js';
import MessageForm from './../MessageForm/MessageForm.jsx';
import ChatView from './../ChatView/ChatView.jsx';
import Header from './../Header/Header.jsx';
import Sidebar from './../Sidebar/Sidebar.jsx';

class MainTemplate extends React.Component {
    componentDidMount() {
        const mainWindow = ReactDOM.findDOMNode(this.refs.mainWindow);
        PS.initialize(mainWindow);
    }

    componentWillUnmount() {
        const mainWindow = ReactDOM.findDOMNode(this.refs.mainWindow);
        PS.destroy(mainWindow);
    }

    render() {
        return (
            <div className="MainTemplate">
                <Sidebar className="sidebar"/>
                <section className="wrapper">
                    <section className="main" ref="mainWindow">
                        <ChatView/>
                    </section>
                    <MessageForm/>
                </section>

            </div>
        );
    }
}

export default MainTemplate;

//<Header/>
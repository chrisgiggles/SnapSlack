import React from 'react';
import ReactDOM from 'react-dom';
import PS from 'perfect-scrollbar';
import { Messages } from './../../../common/Messages/MessagesCollection.js';
import Header from './../Header/Header.jsx';
import Sidebar from './../Sidebar/Sidebar.jsx';

class MainTemplate extends React.Component {
    render() {
        return (
            <div className="MainTemplate">
                <Sidebar className="sidebar"/>
                <section className="wrapper">
                    <section className="main" ref="mainWindow">
                        {this.props.children}
                    </section>
                </section>
            </div>
        );
    }
}

export default MainTemplate;

//<Header/>

//<ChatView/>
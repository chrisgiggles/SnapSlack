import React from 'react';
import ReactDOM from 'react-dom';
import Header from './../Header/Header.jsx';
import Sidebar from './../Sidebar/Sidebar.jsx';

class MainTemplate extends React.Component {
    render() {
        return (
            <div className="MainTemplate">
                <Header />
                <div className="main-wrapper">
                    <Sidebar />
                    <section className="main" ref="mainWindow">
                        {this.props.children}
                    </section>
                </div>
            </div>
        );
    }
}

export default MainTemplate;
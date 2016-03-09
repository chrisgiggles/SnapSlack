import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';

export default class App extends React.Component {
    render() {
        const usersHandle = Meteor.subscribe('users');
        return (
            <div className="AppTemplate">
                <Header />
                {this.props.children}
            </div>
        );
    }
}
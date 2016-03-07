import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';

export default class App extends React.Component {
    render() {
        return (
            <div className="AppTemplate">
                <Header />
                {this.props.children}
            </div>
        );
    }
}
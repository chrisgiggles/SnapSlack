import React from 'react';
import { browserHistory } from 'react-router';

class AccountLogin extends React.Component {

    handleClick(e) {
        e.preventDefault();
        Meteor.logout( (err) => {
            if (err) {
                throw err.reason
            } else {
                browserHistory.push('/');
            }
        });
    }

    render() {
        return (
            <div className="AccountLogout">
                <a href="#" onClick={(e) => {this.handleClick(e) }}>Log Out</a>
            </div>
        );
    }
}

export default AccountLogin;
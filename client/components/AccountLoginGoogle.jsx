import React from 'react';
import { browserHistory } from 'react-router';

class AccountLoginGoogle extends React.Component {

    handleClick(e) {
        e.preventDefault();

        const options = {
            requestPermissions: [ 'email' ]
        };

        Meteor.loginWithGoogle(options, (err) => {
            if (err) {
                throw err.reason;
            } else {
                browserHistory.push('/dashboard');
            }
        });
    }

    render() {
        return (
            <a href="#" className="AccountLoginGoogle" onClick={ (e) => { this.handleClick(e) }}>
                <img src="/btn_google@2x.png" alt="Sign in with Google"/>
            </a>
        );
    }
}

export default AccountLoginGoogle;
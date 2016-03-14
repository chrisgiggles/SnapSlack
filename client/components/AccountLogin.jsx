import React from 'react';
import { browserHistory } from 'react-router';
import AccountLoginGoogle from './AccountLoginGoogle.jsx';

class AccountLogin extends React.Component {

    componentWillMount() {
        if(Meteor.userId() && this.context.router.isActive('/', true)) {
            browserHistory.push('/dashboard');
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.refs;

        Meteor.loginWithPassword(email.value, password.value, (err) => {
            if (err) {
                throw err.reason;
            } else {
                browserHistory.push('/dashboard');
            }
        });
    }

    render() {
        return (
            <div className="AccountLogin">
                <AccountLoginGoogle />
                <form action="#" onSubmit={ (e) => { this.handleSubmit(e) }}>
                    <label htmlFor="email">E-mail: </label>
                    <input type="text" ref="email" name="email" id="email" placeholder="E-mail"/>
                    <label htmlFor="password">Password: </label>
                    <input type="password" ref="password" id="password" placeholder="Password"/>
                    <input type="submit" value="Log In"/>
                </form>
            </div>
        );
    }
}

AccountLogin.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default AccountLogin;
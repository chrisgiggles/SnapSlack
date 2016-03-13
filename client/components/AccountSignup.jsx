import React from 'react';
import { browserHistory } from 'react-router';

class AccountSignup extends React.Component {

    handleSubmit(e) {
        e.preventDefault();
        const { username, email, password, repeat } = this.refs;
        const options = {
            username: username.value,
            email: email.value,
            password: password.value
        };

        if (repeat.value === password.value) {
            Accounts.createUser(options, (err) => {
                if (err) {
                    throw err;
                }
                else {
                    browserHistory.push('/dashboard');
                }
            });
        } else {
            throw new Meteor.Error('password-mismatch', 'The password fields are mismatched, try typing it again')
        }
    }

    render() {
        return (
            <div className="AccountLogin">
                <form action="#" onSubmit={ (e) => { this.handleSubmit(e) }}>
                    <label htmlFor="username">Username: </label>
                    <input type="text" ref="username" id="username"/>

                    <label htmlFor="email">E-mail: </label>
                    <input type="text" ref="email" id="email"/>

                    <label htmlFor="password">Password: </label>
                    <input type="password" ref="password" id="password"/>

                    <label htmlFor="repeat">Repeat Password: </label>
                    <input type="password" ref="repeat" id="repeat"/>

                    <input type="submit" value="Sign Up!"/>
                </form>
            </div>
        );
    }
}

export default AccountSignup;
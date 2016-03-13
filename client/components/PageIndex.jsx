import React from 'react';
import { Link } from 'react-router';
import AccountSignup from './AccountSignup.jsx';

export default class PageIndex extends React.Component {

    render() {
        //const { content } = this.props;

        return (
            <div className="PageIndex PageTemplate">
                <div className="row">
                    <h1 className="text-center">Ad hoc team messaging with TypeTo</h1>
                    <div className="account">
                        <div className="panel">
                            <p>Already have an account?</p>
                            <Link to="/">Sign in instead</Link>
                            <h2>Sign up</h2>
                            <AccountSignup />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
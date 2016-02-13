import React from 'react';
import AccountsUIWrapper from './../AccountsUIWrapper/AccountsUIWrapper.jsx';

class Header extends React.Component {
    render() {
        return (
            <header className="Header">
                <div className="header-inner">
                    <h1 className="head">ChatUp</h1>
                    <AccountsUIWrapper />
                </div>
            </header>
        );
    }
}

export default Header;
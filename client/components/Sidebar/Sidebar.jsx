import React from 'react';
import AccountsUIWrapper from './../AccountsUIWrapper/AccountsUIWrapper.jsx';

class Sidebar extends React.Component {
    render() {
        return (
            <div className="Sidebar">
                <AccountsUIWrapper/>
                <ul>
                    <li>Fredagsöl</li>
                    <li>Xboners</li>
                    <li>Jobbsnack</li>
                    <li>Snick snack</li>
                </ul>
            </div>
        );
    }
}

export default Sidebar;
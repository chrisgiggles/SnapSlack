import React from 'react';
import { Link } from 'react-router';
import Menu from './../Menu/Menu.jsx';

class Header extends React.Component {
    render() {
        return (
            <header className="Header">
                <div className="logo">
                    <Link to="/"><img src="/Logo@2x.png" alt="Start" /></Link>
                </div>
                <Menu />
            </header>
        );
    }
}

export default Header;
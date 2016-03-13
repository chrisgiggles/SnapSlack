import React from 'react';
import ReactDOM from 'react-dom';

import AccountLogout from './AccountLogout.jsx';

export default class AccountUI extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }

        //Binding in constructor because you can't remove eventlistener when the
        //function is anonymous () => {} and we need to bind this context to the component itself
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    componentDidMount() {
        document.body.addEventListener('click', this.handleOutsideClick, false);
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.handleOutsideClick);
    }

    handleOutsideClick(e) {
        if (this.state.open) {
            const component = ReactDOM.findDOMNode(this.refs.component);

            if ( !component.contains(e.target) ) {
                this.setState({ open: false });
            }

        }
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({ open: !this.state.open });
    }

    render () {
        const { username } = this.props.user;

        return (
            <div className="AccountUI" ref="component">
                <a href="#" onClick={ (e) => {this.handleClick(e) }}>{ username } ▾</a>
                { this.state.open
                    ? <div className="dropdown"><AccountLogout /></div>
                    : ''}
            </div>
        );
    }
}

AccountUI.propTypes = {
    user: React.PropTypes.object.isRequired
};
import React from 'react';
import ReactDOM from 'react-dom';
//This should be entirely replaced with pure react components,
//It depends on Blaze (and probably jQuery) for the moment
class AccountsUIWrapper extends React.Component {
    componentDidMount () {
        this.view = Blaze.render(Template.loginButtons, ReactDOM.findDOMNode(this.refs.container))
    }

    componentWillUnmount () {
        Blaze.remove(this.view);
    }

    render () {
        return (
            <div className="AccountsUIWrapper" ref="container"></div>
        );
    }
}

export default AccountsUIWrapper;
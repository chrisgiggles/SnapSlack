import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

import App from './components/MainTemplate/MainTemplate.jsx';
import ChatView from './components/ChatView/ChatView.jsx';
import ChannelDashboard from './components/ChannelDashboard/ChannelDashboard.jsx';



Meteor.startup( () => {
    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_AND_EMAIL'
    });

    ReactDOM.render(
        <Router history={browserHistory}>
            <Route path="/" component={ App }>
                <IndexRoute component={ ChannelDashboard } />
                <Route path="chat" component={ ChatView } />
            </Route>
        </Router>, document.getElementById('app'));
});
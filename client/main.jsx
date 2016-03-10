import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

import App from './components/App.jsx';
import ChatView from './components/ChatView.jsx';
import Dashboard from './components/Dashboard.jsx';
import ChannelCreate from './components/ChannelCreate.jsx';
import ChannelJoin from './components/ChannelListAll.jsx';

import ChannelDashboard from './components/ChannelDashboard/ChannelDashboard.jsx';
import ChannelAdmin from './components/ChannelAdmin/ChannelAdmin.jsx';
import Test from './components/Test/test.jsx';

Meteor.startup( () => {
    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_AND_EMAIL'
    });

    ReactDOM.render(
        <Router history={browserHistory}>
            <Route path="/" component={ App }>
                <IndexRoute component={ Dashboard } />
                <Route path="channel/:channelId" component={ ChatView } />
                <Route path="channel/:channelId/settings" component={ ChatView } />
                <Route path="create" component={ ChannelCreate } />
                <Route path="all" component={ ChannelJoin } />
            </Route>
        </Router>, document.getElementById('app'));
});

/*
*                 <IndexRoute component={ ChannelDashboard } />
 <Route path="channel/:channelId" component={ ChatView } />
 <Route path="channel/:channelId/admin" component={ ChannelAdmin } />
*
* */
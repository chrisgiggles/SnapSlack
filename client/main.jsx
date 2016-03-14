import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import App from './components/App.jsx';
import PageIndex from './components/PageIndex.jsx';
import AccountLogin from './components/AccountLogin.jsx';
import AccountSignup from './components/AccountSignup.jsx';
import ChatView from './components/ChatView.jsx';
import Dashboard from './components/Dashboard.jsx';
import ChannelCreate from './components/ChannelCreate.jsx';
import ChannelListAll from './components/ChannelListAll.jsx';

Meteor.startup( () => {
    function requireAuth(nextState, replace) {
        if ( !Meteor.userId() ) {
            replace({
                pathname: '/',
                state: { nextPathname: nextState.location.pathname }
            });
        }
    }

    ReactDOM.render(
        <Router history={browserHistory}>
            <Route path="/" component={ App }>
                <IndexRoute component={ PageIndex } />
                <Route path="signup" component={ AccountSignup } />

                <Route path="dashboard" component={ Dashboard } onEnter={requireAuth}>
                    <IndexRoute components={ {content: ChannelListAll} } />
                    <Route path="create" components={ {content: ChannelCreate} } />
                </Route>

                <Route path="channel/:channelId" component={ ChatView } onEnter={requireAuth}/>
            </Route>
        </Router>, document.getElementById('app'));
});
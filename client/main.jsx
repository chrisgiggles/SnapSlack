import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';

import App from './components/MainTemplate/MainTemplate.jsx';

Meteor.startup( () => {

    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_AND_EMAIL'
    });

    ReactDOM.render(<App/>, document.getElementById('app'));
});
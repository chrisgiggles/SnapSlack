import randomColor from './../common/utils/randomColor.js';

Accounts.onCreateUser(function(options, user) {
    user.profileColor = randomColor( Math.floor(Math.random() * 360) );

    if (options.profile)
        user.profile = options.profile;
    return user;
});
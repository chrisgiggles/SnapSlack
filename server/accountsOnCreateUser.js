import randomColor from './../common/utils/randomColor.js';

Accounts.onCreateUser(function(options, user) {
    console.log("accountsOnCreateUser  options -->", options);
    console.log("accountsOnCreateUser  user -->", user);
    //GOOGLE
    if (user.services.google) {
        user.service = 'google';
        user.profilePicture = user.services.google.picture;
    }
    //PASSWORD
    else {
        user.service = 'password';
        user.profileColor = randomColor( Math.floor(Math.random() * 360) );
    }

    //Copy everything in options.profile
    if (options.profile)
        user.profile = options.profile;
    return user;
});
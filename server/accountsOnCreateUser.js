Accounts.onCreateUser(function(options, user) {
    user.profileColor = "585BD6";

    if (options.profile)
        user.profile = options.profile;
    return user;
});
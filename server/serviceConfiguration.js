const google = Meteor.settings.private.oAuth.google;

ServiceConfiguration.configurations.upsert(
    { service: "google" },
    {
        $set: {
            clientId: google.clientID,
            loginStyle: "popup",
            secret: google.secret
        }
    }
);
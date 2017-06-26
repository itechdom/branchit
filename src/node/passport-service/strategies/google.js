var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

export default function google({
    passport,
    User,
    clientId,
    clientSecret,
    callbackURL
}) {
    passport.use(new GoogleStrategy({
            clientID: clientId,
            clientSecret: clientSecret,
            callbackURL: callbackURL
        },
        function(accessToken, refreshToken, profile, cb) {
            // User.findOrCreate({
            //     googleId: profile.id
            // }, function(err, user) {
            //     return cb(err, user);
            // });
            console.log(accessToken,"============",refreshToken);
            return cb(undefined,"bye");
        }
    ));
}

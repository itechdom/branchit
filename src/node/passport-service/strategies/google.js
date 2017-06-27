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
    User.findOrCreate(
      {
        id: profile.id
      },
      {
        id: profile.id,
        accessToken:accessToken,
        refreshToken:refreshToken
      }
      ,(err, user)=>{
        console.log(user);
        return cb(err, user);
      }
    );
  }
));
}

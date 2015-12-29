import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';

exports.setup = function(User, config) {
  passport.use(new FacebookStrategy({
    clientID:  '1645967642343052',
    clientSecret: 'cd6772874412c2182bbdb27a02f07d81',
    callbackURL: "http://www.example.com/auth/facebook/callback",
    profileFields: [
      'displayName',
      'emails',
      'photos'
    ]
  },
  function(accessToken, refreshToken, profile, done) {
    User.find({
      'facebook.id': profile.id
    })
      .then(function(user) {
        if (!user) {
          user = User.build({
            name: profile.displayName,
            email: profile.emails[0].value,
            picture: profile.photos ? profile.photos[0].value : '/img/faces/unknown-user-pic.jpg',
            role: 'user',
            provider: 'facebook',
            facebook: profile._json
          });
          user.save()
            .then(function(user) {
              return done(null, user);
            })
            .catch(function(err) {
              return done(err);
            });
        } else {
          return done(null, user);
        }
      })
      .catch(function(err) {
        return done(err);
      });
  }));
};

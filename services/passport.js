const passport = require('passport');
const GoogleStragety = require('passport-google-oauth20');
const mongoose = require('mongoose');
const config = require('../config');

const User = mongoose.model('User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// tell passport to use google-stragety
passport.use(new GoogleStragety(
  {
    clientID: config.googleClientId,
    clientSecret: config.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }).then((user) => {
      if (user) {
        // already have user
        console.log('There is already an existing user');
        done(null, user);
      } else {
        User.create({ googleId: profile.id }, (err, user) => {
          console.log(user);
          done(null, user);
        });
      }
    });
  }
));
